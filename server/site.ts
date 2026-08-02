import express, { type Express, type Request, type Response } from "express";
import fs from "fs";
import path from "path";
import { SITE_ORIGIN } from "../shared/site/company";
import { allUrls, parsePath, routeByPath } from "../shared/site/routes";

/**
 * Servido del sitio en producción.
 *
 * Cambios frente a lo anterior:
 *  - Se entrega el HTML prerenderizado de cada ruta, no un shell vacío.
 *  - Una ruta inexistente responde HTTP 404, no 200. Antes cualquier dirección
 *    devolvía el shell con código 200, así que los buscadores indexaban páginas
 *    que no existen.
 *  - robots.txt, sitemap.xml y favicon.ico son archivos reales. Antes las tres
 *    devolvían el HTML del SPA con content-type text/html.
 */

const IMMUTABLE = "public, max-age=31536000, immutable";
const HTML_CACHE = "public, max-age=0, must-revalidate";

/** Crawlers de IA que se permiten de forma explícita. */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "meta-externalagent",
];

export function buildRobotsTxt(origin = SITE_ORIGIN): string {
  const lines: string[] = [
    "# chyrris.com — Chyrris Technologies LLC",
    "",
    "User-agent: *",
    "Allow: /",
    "",
    "# Los buscadores con IA se permiten de forma explícita: este sitio existe",
    "# para que se pueda confirmar que la compañía es real y qué opera.",
  ];
  for (const bot of AI_CRAWLERS) {
    lines.push("", `User-agent: ${bot}`, "Allow: /");
  }
  lines.push(
    "",
    "# Páginas transaccionales: no aportan nada a un índice.",
    "User-agent: *",
    "Disallow: /caymus-tanks/subscribe",
    "Disallow: /es/caymus-tanks/subscribe",
    "Disallow: /api/",
    "",
    `Sitemap: ${origin}/sitemap.xml`,
    "",
  );
  return lines.join("\n");
}

export function buildSitemapXml(origin = SITE_ORIGIN, lastmod = new Date()): string {
  const stamp = lastmod.toISOString().slice(0, 10);
  const entries = allUrls().filter(({ route }) => !route.noSitemap);

  const urls = entries
    .map(({ url, path: logicalPath, route }) => {
      // Cada URL declara sus alternativas de idioma, que es lo que hace que
      // hreflang funcione como par y no como dos páginas sueltas.
      const alternates = allUrls()
        .filter((u) => u.path === logicalPath && !u.route.noSitemap)
        .map(
          (u) =>
            `    <xhtml:link rel="alternate" hreflang="${u.locale}" href="${origin}${u.url}"/>`,
        )
        .join("\n");
      const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}${logicalPath}"/>`;
      return [
        "  <url>",
        `    <loc>${origin}${url}</loc>`,
        `    <lastmod>${stamp}</lastmod>`,
        `    <priority>${(route.priority ?? 0.5).toFixed(1)}</priority>`,
        alternates,
        xDefault,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

/** Rutas que sirve el servidor con contenido generado, no desde disco. */
export function registerSeoRoutes(app: Express): void {
  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain; charset=utf-8").set("Cache-Control", "public, max-age=3600").send(buildRobotsTxt());
  });

  app.get("/sitemap.xml", (_req, res) => {
    res
      .type("application/xml; charset=utf-8")
      .set("Cache-Control", "public, max-age=3600")
      .send(buildSitemapXml());
  });
}

export function serveStatic(app: Express): void {
  // vite.config.ts deja el build del cliente en dist/public.
  // En ejecución import.meta.dirname = /app/dist, así que dist/public es
  // import.meta.dirname/public.
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  const notFoundHtml = (locale: string) => {
    const file = path.join(distPath, locale === "es" ? "es/404.html" : "404.html");
    return fs.existsSync(file) ? fs.readFileSync(file, "utf-8") : null;
  };

  // Assets con hash en el nombre: caché indefinida.
  app.use(
    "/assets",
    express.static(path.join(distPath, "assets"), {
      immutable: true,
      maxAge: "1y",
      setHeaders: (res) => res.setHeader("Cache-Control", IMMUTABLE),
    }),
  );

  // Resto de archivos estáticos (favicon, og, brand, manifest).
  //   index: false    — que no conteste el index.html de un directorio antes de
  //                     que decidamos nosotros el código HTTP.
  //   redirect: false — el prerender crea un directorio por ruta
  //                     (dist/public/company/index.html), y por defecto
  //                     express.static responde 301 a "/company/" a cualquier
  //                     petición de "/company". Eso mandaba TODA ruta interna a
  //                     un redirect en vez de servir la página.
  app.use(express.static(distPath, { index: false, redirect: false, maxAge: "1h" }));

  app.get("*", (req: Request, res: Response) => {
    const rawPath = req.path;

    // Normalizar la barra final a una sola forma canónica, para no tener dos
    // URLs indexables con el mismo contenido.
    if (rawPath.length > 1 && rawPath.endsWith("/")) {
      const target = rawPath.slice(0, -1) + (req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "");
      return res.redirect(301, target);
    }

    const { locale, path: logicalPath } = parsePath(rawPath);
    const known = routeByPath.has(logicalPath);

    if (known) {
      const rel = rawPath === "/" ? "index.html" : path.join(rawPath.slice(1), "index.html");
      const file = path.join(distPath, rel);
      if (fs.existsSync(file)) {
        return res.status(200).set("Cache-Control", HTML_CACHE).type("html").send(fs.readFileSync(file, "utf-8"));
      }
    }

    // Ruta desconocida (o prerender ausente): 404 de verdad.
    const body = notFoundHtml(locale);
    res.status(404).set("Cache-Control", "no-store").type("html");
    if (body) return res.send(body);
    return res.send("<!doctype html><title>404</title><h1>404 — Not found</h1>");
  });
}
