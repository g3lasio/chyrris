/**
 * Prerender: escribe un HTML completo por ruta y por idioma.
 *
 * El origen servía únicamente `<div id="root"></div>`. Cero contenido. Los
 * crawlers que no ejecutan JavaScript —entre ellos los de los buscadores de IA—
 * veían un documento vacío, así que el sitio era invisible para ellos.
 *
 * Este paso corre después del build de cliente y de servidor, y deja en
 * dist/public un archivo por URL con el contenido ya renderizado, el <head>
 * completo y el JSON-LD. Express los sirve tal cual: no hay render en caliente,
 * así que un fallo aquí rompe el build, nunca la producción — que es
 * exactamente lo que queremos con el flujo de pago de Caymus detrás.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "dist", "public");
const serverEntry = path.join(root, "dist", "ssr", "entry-server.js");

const { render, allUrls } = await import(pathToFileURL(serverEntry).href);

const template = await fs.readFile(path.join(outDir, "index.html"), "utf-8");

if (!template.includes("<!--app-html-->") || !template.includes("<!--app-head-->")) {
  throw new Error("index.html no tiene los marcadores <!--app-html--> / <!--app-head-->");
}

async function writePage(url, html) {
  // "/" -> index.html ; "/es/company" -> es/company/index.html
  const rel = url === "/" ? "index.html" : path.join(url.replace(/^\//, ""), "index.html");
  const file = path.join(outDir, rel);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html, "utf-8");
  return rel;
}

const written = [];

for (const { url } of allUrls()) {
  const result = await render(url);
  const html = template
    .replace('<html lang="en">', `<html lang="${result.lang}">`)
    .replace("<!--app-head-->", result.head)
    .replace("<!--app-html-->", result.html);
  written.push(await writePage(url, html));
}

// Página 404 estática, en los dos idiomas. El servidor la responde con el
// código 404 real: antes cualquier ruta inexistente devolvía 200 con el shell.
for (const [url, file] of [
  ["/__not-found", "404.html"],
  ["/es/__not-found", "es/404.html"],
]) {
  const result = await render(url);
  const html = template
    .replace('<html lang="en">', `<html lang="${result.lang}">`)
    .replace("<!--app-head-->", result.head)
    .replace("<!--app-html-->", result.html);
  const target = path.join(outDir, file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, html, "utf-8");
  written.push(file);
}

console.log(`prerender: ${written.length} páginas escritas en dist/public`);
