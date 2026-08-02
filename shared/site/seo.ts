/**
 * Construcción de <head> y JSON-LD. Corre igual en Node (prerender) y en el
 * navegador (navegación cliente), por eso no depende de React ni del DOM.
 */

import { SITE_ORIGIN, company, activeSocial, locationLabel, registrationLabel } from "./company";
import { products, type Product } from "./portfolio";
import {
  DEFAULT_LOCALE,
  LOCALES,
  localizedPath,
  routeByPath,
  type Locale,
  type RouteDef,
} from "./routes";

export const OG_IMAGE = "/og/chyrris-og.png";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const LOGO_URL = `${SITE_ORIGIN}/brand/chyrris-logo-512.png`;

export interface HeadTag {
  tag: "meta" | "link";
  attrs: Record<string, string>;
}

export interface PageHead {
  title: string;
  description: string;
  canonical: string;
  lang: Locale;
  tags: HeadTag[];
  jsonLd: unknown[];
}

const absolute = (p: string) => (p.startsWith("http") ? p : `${SITE_ORIGIN}${p}`);

/** Etiqueta hreflang completa: en-US / es-US, más x-default apuntando a inglés. */
const hreflangCode: Record<Locale, string> = { en: "en", es: "es" };

export function buildHead(path: string, locale: Locale): PageHead {
  const route: RouteDef | undefined = routeByPath.get(path);
  const title = route
    ? route.title[locale]
    : locale === "es"
      ? "Página no encontrada — Chyrris Technologies"
      : "Page not found — Chyrris Technologies";
  const description = route
    ? route.description[locale]
    : locale === "es"
      ? "La página que buscas no existe en chyrris.com."
      : "The page you are looking for does not exist on chyrris.com.";

  const canonical = absolute(localizedPath(path, locale));
  const image = absolute(route?.image || OG_IMAGE);

  const tags: HeadTag[] = [
    { tag: "meta", attrs: { name: "description", content: description } },
    { tag: "link", attrs: { rel: "canonical", href: canonical } },

    // Open Graph
    { tag: "meta", attrs: { property: "og:type", content: path === "/" ? "website" : "article" } },
    { tag: "meta", attrs: { property: "og:site_name", content: company.legalName } },
    { tag: "meta", attrs: { property: "og:title", content: title } },
    { tag: "meta", attrs: { property: "og:description", content: description } },
    { tag: "meta", attrs: { property: "og:url", content: canonical } },
    { tag: "meta", attrs: { property: "og:image", content: image } },
    { tag: "meta", attrs: { property: "og:image:width", content: String(OG_IMAGE_WIDTH) } },
    { tag: "meta", attrs: { property: "og:image:height", content: String(OG_IMAGE_HEIGHT) } },
    { tag: "meta", attrs: { property: "og:image:alt", content: `${company.legalName} — ${locationLabel}` } },
    { tag: "meta", attrs: { property: "og:locale", content: locale === "es" ? "es_US" : "en_US" } },

    // Twitter Card
    { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
    { tag: "meta", attrs: { name: "twitter:title", content: title } },
    { tag: "meta", attrs: { name: "twitter:description", content: description } },
    { tag: "meta", attrs: { name: "twitter:image", content: image } },
  ];

  // hreflang para las dos versiones de idioma, sólo si la ruta existe.
  if (route) {
    for (const l of LOCALES) {
      tags.push({
        tag: "link",
        attrs: { rel: "alternate", hreflang: hreflangCode[l], href: absolute(localizedPath(path, l)) },
      });
    }
    tags.push({
      tag: "link",
      attrs: { rel: "alternate", hreflang: "x-default", href: absolute(localizedPath(path, DEFAULT_LOCALE)) },
    });
  } else {
    tags.push({ tag: "meta", attrs: { name: "robots", content: "noindex" } });
  }

  return { title, description, canonical, lang: locale, tags, jsonLd: buildJsonLd(path, locale) };
}

// ── JSON-LD ────────────────────────────────────────────────────────────────

/**
 * Organization. Publica ciudad y estado, nunca la dirección completa: el objeto
 * PostalAddress deliberadamente no lleva streetAddress.
 */
export function organizationLd(locale: Locale) {
  const org: Record<string, unknown> = {
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: company.shortName,
    legalName: company.legalName,
    url: SITE_ORIGIN,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    email: company.email.general,
    address: {
      "@type": "PostalAddress",
      addressLocality: company.location.city,
      addressRegion: company.location.stateCode,
      addressCountry: company.location.countryCode,
    },
    identifier: {
      "@type": "PropertyValue",
      name: `${company.registration.jurisdiction} ${company.registration.entityType} registration number`,
      value: company.registration.number,
    },
    description:
      locale === "es"
        ? "Chyrris Technologies LLC construye y opera software con inteligencia artificial. Su producto principal es LeadPrime, una plataforma de negocio para contratistas."
        : "Chyrris Technologies LLC builds and operates AI software. Its principal product is LeadPrime, a business platform for contractors.",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: locale === "es" ? "atención general" : "customer service",
        email: company.email.general,
        availableLanguage: ["en", "es"],
      },
      {
        "@type": "ContactPoint",
        contactType: locale === "es" ? "soporte técnico" : "technical support",
        email: company.email.support,
        availableLanguage: ["en", "es"],
      },
    ],
  };
  const sameAs = [
    ...activeSocial.map((s) => s.url),
    "https://leadprimecrm.chyrris.com",
    "https://bible.chyrris.com",
  ];
  if (sameAs.length) org.sameAs = sameAs;
  return org;
}

export function websiteLd(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    url: SITE_ORIGIN,
    name: company.legalName,
    inLanguage: locale,
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
  };
}

const OS_BY_PLATFORM: Record<string, string> = { ios: "iOS", android: "Android", web: "Web" };

export function softwareApplicationLd(product: Product, locale: Locale) {
  const store = product.links.filter((l) => l.kind === "ios" || l.kind === "android");
  const web = product.links.find((l) => l.kind === "web");
  const ld: Record<string, unknown> = {
    "@type": "SoftwareApplication",
    "@id": `${SITE_ORIGIN}/#app-${product.key}`,
    name: product.name,
    description: product.summary[locale],
    applicationCategory: "BusinessApplication",
    operatingSystem: product.platforms.map((p) => OS_BY_PLATFORM[p]).join(", ") || "Web",
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    inLanguage: locale,
  };
  // El enlace de tienda es el downloadUrl; si no hay tienda, el sitio del producto.
  if (store.length) ld.downloadUrl = store.map((l) => l.href);
  if (web) ld.url = web.href;
  return ld;
}

export function buildJsonLd(path: string, locale: Locale): unknown[] {
  const graph: unknown[] = [organizationLd(locale)];

  if (path === "/") {
    graph.push(websiteLd(locale));
    // SoftwareApplication para cada producto que tenga un destino real: la
    // tienda cuando se conoce, y si no el sitio del producto. Un producto sin
    // ningún enlace no se declara como software.
    for (const p of products) {
      if (p.links.some((l) => l.href.trim() !== "" && l.kind !== "page")) {
        graph.push(softwareApplicationLd(p, locale));
      }
    }
  }

  if (path === "/portfolio" || path === "/company") {
    for (const p of products) graph.push(softwareApplicationLd(p, locale));
  }

  // Ficha de un producto concreto.
  const product = products.find((p) => p.page && p.page === path);
  if (product) graph.push(softwareApplicationLd(product, locale));

  return [{ "@context": "https://schema.org", "@graph": graph }];
}

// ── Serialización a HTML (usada por el prerender) ──────────────────────────

const ESCAPE: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ESCAPE[c]);

export function headToHtml(head: PageHead): string {
  const lines: string[] = [`<title>${escapeHtml(head.title)}</title>`];
  for (const t of head.tags) {
    const attrs = Object.entries(t.attrs)
      .map(([k, v]) => `${k}="${escapeHtml(v)}"`)
      .join(" ");
    lines.push(`<${t.tag} ${attrs} />`);
  }
  for (const block of head.jsonLd) {
    // </script> dentro del JSON rompería el bloque; escapamos la barra.
    const json = JSON.stringify(block).replace(/</g, "\\u003c");
    lines.push(`<script type="application/ld+json">${json}</script>`);
  }
  return lines.join("\n    ");
}

export { registrationLabel, locationLabel };
