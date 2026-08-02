/**
 * Tabla de rutas del sitio con sus metadatos por idioma.
 *
 * Es la fuente única para:
 *  - el prerender (inyecta title/meta/canonical/OG/JSON-LD en el HTML de origen)
 *  - el sitemap.xml
 *  - la actualización de <head> al navegar en el cliente
 *
 * El idioma vive en la URL: inglés en la raíz, español bajo /es. Esa es la
 * condición para que hreflang tenga sentido y para que el selector de idioma
 * sea un enlace real y no un estado escondido en localStorage.
 */

export type Locale = "en" | "es";
export const LOCALES: Locale[] = ["en", "es"];
export const DEFAULT_LOCALE: Locale = "en";
export const ES_PREFIX = "/es";

export interface RouteMeta {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  /** Prioridad en el sitemap. */
  priority?: number;
  /** Imagen de Open Graph específica; si falta se usa la de la compañía. */
  image?: string;
  /** Excluir del sitemap (páginas transaccionales). */
  noSitemap?: boolean;
}

export interface RouteDef extends RouteMeta {
  /** Ruta canónica en inglés, siempre empezando con "/". */
  path: string;
}

const titleSuffix = "Chyrris Technologies";

export const routes: RouteDef[] = [
  {
    path: "/",
    priority: 1.0,
    title: {
      en: `Chyrris Technologies LLC — AI software company behind LeadPrime`,
      es: `Chyrris Technologies LLC — compañía de software con IA detrás de LeadPrime`,
    },
    description: {
      en: "Chyrris Technologies LLC builds and operates AI software. Its principal product is LeadPrime, a business platform for contractors. Fairfield, California.",
      es: "Chyrris Technologies LLC construye y opera software con inteligencia artificial. Su producto principal es LeadPrime, una plataforma de negocio para contratistas. Fairfield, California.",
    },
  },
  {
    path: "/company",
    priority: 0.9,
    title: {
      en: `Company — ${titleSuffix}`,
      es: `Compañía — ${titleSuffix}`,
    },
    description: {
      en: "Chyrris Technologies LLC, California LLC No. B20260351587, based in Fairfield, California. Company registration, portfolio and contact details.",
      es: "Chyrris Technologies LLC, California LLC No. B20260351587, con sede en Fairfield, California. Registro, portafolio y datos de contacto de la compañía.",
    },
  },
  {
    path: "/portfolio",
    priority: 0.9,
    title: {
      en: `Portfolio — ${titleSuffix}`,
      es: `Portafolio — ${titleSuffix}`,
    },
    description: {
      en: "The applications and businesses Chyrris Technologies LLC builds and operates: LeadPrime, Tzotzil Bible, Caymus Tank Calculator, Pócima Salvaje, Mervin AI and Owl Fenc.",
      es: "Las aplicaciones y negocios que Chyrris Technologies LLC construye y opera: LeadPrime, Tzotzil Bible, Caymus Tank Calculator, Pócima Salvaje, Mervin AI y Owl Fenc.",
    },
  },
  {
    path: "/contact",
    priority: 0.8,
    title: {
      en: `Contact — ${titleSuffix}`,
      es: `Contacto — ${titleSuffix}`,
    },
    description: {
      en: "Reach Chyrris Technologies LLC about products, partnerships or press. We reply within two business days.",
      es: "Escribe a Chyrris Technologies LLC sobre productos, alianzas o prensa. Respondemos en un plazo de dos días hábiles.",
    },
  },
  {
    path: "/privacy",
    priority: 0.4,
    title: {
      en: `Privacy Policy — ${titleSuffix}`,
      es: `Política de Privacidad — ${titleSuffix}`,
    },
    description: {
      en: "How Chyrris Technologies LLC collects, uses and protects personal information across its website and applications.",
      es: "Cómo Chyrris Technologies LLC recopila, usa y protege la información personal en su sitio web y sus aplicaciones.",
    },
  },
  {
    path: "/terms",
    priority: 0.4,
    title: {
      en: `Terms of Service — ${titleSuffix}`,
      es: `Términos de Servicio — ${titleSuffix}`,
    },
    description: {
      en: "The terms that govern use of chyrris.com and the services Chyrris Technologies LLC provides through it.",
      es: "Los términos que rigen el uso de chyrris.com y los servicios que Chyrris Technologies LLC presta a través del sitio.",
    },
  },

  // ── Tzotzil Bible ────────────────────────────────────────────────────────
  {
    path: "/tzotzil-bible",
    priority: 0.7,
    title: { en: `Tzotzil Bible — ${titleSuffix}`, es: `Tzotzil Bible — ${titleSuffix}` },
    description: {
      en: "The Bible in Tzotzil, published on the web, iOS and Android by Chyrris Technologies LLC.",
      es: "La Biblia en tzotzil, publicada en web, iOS y Android por Chyrris Technologies LLC.",
    },
  },
  {
    path: "/tzotzil-bible/about",
    priority: 0.3,
    title: { en: `About Tzotzil Bible — ${titleSuffix}`, es: `Acerca de Tzotzil Bible — ${titleSuffix}` },
    description: {
      en: "What the Tzotzil Bible application is, who it serves and how it was built.",
      es: "Qué es la aplicación Tzotzil Bible, a quién sirve y cómo se construyó.",
    },
  },
  {
    path: "/tzotzil-bible/support",
    priority: 0.3,
    title: { en: `Tzotzil Bible support — ${titleSuffix}`, es: `Soporte de Tzotzil Bible — ${titleSuffix}` },
    description: {
      en: "Support for the Tzotzil Bible application. We reply within two business days.",
      es: "Soporte para la aplicación Tzotzil Bible. Respondemos en un plazo de dos días hábiles.",
    },
  },
  {
    path: "/tzotzil-bible/privacy",
    priority: 0.3,
    title: { en: `Tzotzil Bible privacy — ${titleSuffix}`, es: `Privacidad de Tzotzil Bible — ${titleSuffix}` },
    description: {
      en: "Privacy policy for the Tzotzil Bible application.",
      es: "Política de privacidad de la aplicación Tzotzil Bible.",
    },
  },

  // ── Pócima Salvaje ───────────────────────────────────────────────────────
  {
    path: "/pocima-salvaje",
    priority: 0.7,
    title: { en: `Pócima Salvaje — ${titleSuffix}`, es: `Pócima Salvaje — ${titleSuffix}` },
    description: {
      en: "Pócima Salvaje, a published iOS application on medicinal plants and traditional remedies.",
      es: "Pócima Salvaje, aplicación publicada en iOS sobre plantas medicinales y remedios tradicionales.",
    },
  },
  {
    path: "/pocima-salvaje/privacy",
    priority: 0.3,
    title: { en: `Pócima Salvaje privacy — ${titleSuffix}`, es: `Privacidad de Pócima Salvaje — ${titleSuffix}` },
    description: {
      en: "Privacy policy for the Pócima Salvaje application.",
      es: "Política de privacidad de la aplicación Pócima Salvaje.",
    },
  },
  {
    path: "/pocima-salvaje/terms",
    priority: 0.3,
    title: { en: `Pócima Salvaje terms — ${titleSuffix}`, es: `Términos de Pócima Salvaje — ${titleSuffix}` },
    description: {
      en: "Terms of use for the Pócima Salvaje application.",
      es: "Términos de uso de la aplicación Pócima Salvaje.",
    },
  },
  {
    path: "/pocima-salvaje/support",
    priority: 0.3,
    title: { en: `Pócima Salvaje support — ${titleSuffix}`, es: `Soporte de Pócima Salvaje — ${titleSuffix}` },
    description: {
      en: "Support for the Pócima Salvaje application. We reply within two business days.",
      es: "Soporte para la aplicación Pócima Salvaje. Respondemos en un plazo de dos días hábiles.",
    },
  },

  // ── Caymus Tank Calculator ───────────────────────────────────────────────
  {
    path: "/caymus-tanks",
    priority: 0.7,
    title: { en: `Caymus Tank Calculator — ${titleSuffix}`, es: `Caymus Tank Calculator — ${titleSuffix}` },
    description: {
      en: "Caymus Tank Calculator: tank volume and conversion tool for winemakers, published on iOS with an active subscription.",
      es: "Caymus Tank Calculator: herramienta de volúmenes y conversiones de tanques para enólogos, publicada en iOS con suscripción activa.",
    },
  },
  {
    path: "/caymus-tanks/privacy",
    priority: 0.3,
    title: { en: `Caymus Tank Calculator privacy — ${titleSuffix}`, es: `Privacidad de Caymus Tank Calculator — ${titleSuffix}` },
    description: {
      en: "Privacy policy for the Caymus Tank Calculator application.",
      es: "Política de privacidad de la aplicación Caymus Tank Calculator.",
    },
  },
  {
    path: "/caymus-tanks/support",
    priority: 0.3,
    title: { en: `Caymus Tank Calculator support — ${titleSuffix}`, es: `Soporte de Caymus Tank Calculator — ${titleSuffix}` },
    description: {
      en: "Support and subscription help for the Caymus Tank Calculator application.",
      es: "Soporte y ayuda con la suscripción de Caymus Tank Calculator.",
    },
  },
  {
    path: "/caymus-tanks/subscribe",
    priority: 0.3,
    noSitemap: true,
    title: { en: `Caymus Tank Calculator subscription — ${titleSuffix}`, es: `Suscripción de Caymus Tank Calculator — ${titleSuffix}` },
    description: {
      en: "Manage the Caymus Tank Calculator subscription.",
      es: "Gestiona la suscripción de Caymus Tank Calculator.",
    },
  },
];

export const routeByPath = new Map(routes.map((r) => [r.path, r]));

/** "/company" + "es" -> "/es/company"; "/" + "es" -> "/es" */
export function localizedPath(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? ES_PREFIX : `${ES_PREFIX}${path}`;
}

/** "/es/company" -> { locale: "es", path: "/company" } */
export function parsePath(url: string): { locale: Locale; path: string } {
  const clean = (url.split("?")[0] || "/").split("#")[0] || "/";
  const noSlash = clean.length > 1 && clean.endsWith("/") ? clean.slice(0, -1) : clean;
  if (noSlash === ES_PREFIX) return { locale: "es", path: "/" };
  if (noSlash.startsWith(`${ES_PREFIX}/`)) return { locale: "es", path: noSlash.slice(ES_PREFIX.length) };
  return { locale: DEFAULT_LOCALE, path: noSlash === "" ? "/" : noSlash };
}

/** Todas las URLs del sitio, ambos idiomas. Alimenta prerender y sitemap. */
export function allUrls(): Array<{ url: string; path: string; locale: Locale; route: RouteDef }> {
  const out: Array<{ url: string; path: string; locale: Locale; route: RouteDef }> = [];
  for (const route of routes) {
    for (const locale of LOCALES) {
      out.push({ url: localizedPath(route.path, locale), path: route.path, locale, route });
    }
  }
  return out;
}
