/**
 * El portafolio real de Chyrris Technologies LLC.
 *
 * Regla absoluta de este archivo: no existe el estado "próximamente" ni el
 * candado. Cada producto listado aquí está en operación y se describe con
 * precisión. Un producto sin enlace de tienda conocido se publica igualmente,
 * con su descripción y sus enlaces reales — nunca como si no existiera.
 *
 * Los enlaces de tienda se resuelven desde `storeLinks` para que agregarlos sea
 * editar una sola línea (o definir una variable de entorno en el build) sin
 * tocar la interfaz.
 */

export type Locale = "en" | "es";

export type ProductLinkKind = "web" | "ios" | "android" | "page";

export interface ProductLink {
  kind: ProductLinkKind;
  /** Destino. Si está vacío, el enlace simplemente no se renderiza. */
  href: string;
  label: Record<Locale, string>;
  external: boolean;
}

export interface Product {
  key: string;
  name: string;
  /** Producto principal de la compañía: se renderiza destacado, no como una tarjeta más. */
  featured?: boolean;
  category: Record<Locale, string>;
  summary: Record<Locale, string>;
  /** Descripción larga, usada en la ficha del producto. */
  detail: Record<Locale, string>;
  /** Plataformas donde el producto está efectivamente publicado y en operación. */
  platforms: ReadonlyArray<"web" | "ios" | "android">;
  links: ProductLink[];
  /** Ruta interna del sitio con la ficha del producto, si existe. */
  page?: string;
}

/**
 * Enlaces a las tiendas. Se pueden inyectar en build time con variables de
 * entorno (VITE_STORE_<KEY>_IOS / _ANDROID) para no versionar cambios de URL.
 *
 * Estado de los enlaces al construir esta versión:
 *
 *   pocima-salvaje / ios  VERIFICADO. apps.apple.com/us/app/pocima-salvaje/
 *                         id6758255586, desarrollador Gelasio Sanchez Gomez.
 *   el resto             PENDIENTE DE DATO. No estaban en el repositorio ni en
 *                         su historial, y las tiendas no eran alcanzables desde
 *                         el entorno de build para buscarlos.
 *
 * Un slot vacío hace que el botón de esa tienda NO se renderice: el producto
 * sigue publicado y descrito, pero sin un enlace inventado que llevaría a un
 * 404. Para activarlo basta con pegar la URL abajo, o definir la variable de
 * entorno correspondiente en el build.
 */
const env = (key: string): string => {
  const bag =
    (typeof import.meta !== "undefined" && (import.meta as any).env) ||
    (typeof process !== "undefined" && process.env) ||
    {};
  const value = bag[key];
  return typeof value === "string" ? value.trim() : "";
};

export const storeLinks: Record<string, { ios: string; android: string }> = {
  leadprime: { ios: env("VITE_STORE_LEADPRIME_IOS"), android: env("VITE_STORE_LEADPRIME_ANDROID") },
  "tzotzil-bible": { ios: env("VITE_STORE_TZOTZIL_IOS"), android: env("VITE_STORE_TZOTZIL_ANDROID") },
  "caymus-tanks": { ios: env("VITE_STORE_CAYMUS_IOS"), android: env("VITE_STORE_CAYMUS_ANDROID") },
  "pocima-salvaje": {
    ios: env("VITE_STORE_POCIMA_IOS") || "https://apps.apple.com/us/app/pocima-salvaje/id6758255586",
    android: env("VITE_STORE_POCIMA_ANDROID"),
  },
  "mervin-ai": { ios: env("VITE_STORE_MERVIN_IOS"), android: env("VITE_STORE_MERVIN_ANDROID") },
};

const appStoreLabel: Record<Locale, string> = { en: "App Store", es: "App Store" };
const googlePlayLabel: Record<Locale, string> = { en: "Google Play", es: "Google Play" };

function storeEntries(key: string): ProductLink[] {
  const entry = storeLinks[key];
  if (!entry) return [];
  const out: ProductLink[] = [];
  if (entry.ios) out.push({ kind: "ios", href: entry.ios, label: appStoreLabel, external: true });
  if (entry.android) out.push({ kind: "android", href: entry.android, label: googlePlayLabel, external: true });
  return out;
}

const openLabel: Record<Locale, string> = { en: "Open app", es: "Abrir aplicación" };
const visitLabel: Record<Locale, string> = { en: "Visit site", es: "Visitar sitio" };
const detailsLabel: Record<Locale, string> = { en: "Details", es: "Ficha" };

export const products: Product[] = [
  {
    key: "leadprime",
    name: "LeadPrime",
    featured: true,
    category: { en: "Business platform for contractors", es: "Plataforma de negocio para contratistas" },
    summary: {
      en: "LeadPrime is the company's principal product: a business platform and CRM built for contractors, with the KEEN AI agent working the pipeline alongside the team.",
      es: "LeadPrime es el producto principal de la compañía: una plataforma de negocio y CRM para contratistas, con el agente de IA KEEN operando el pipeline junto al equipo.",
    },
    detail: {
      en: "Leads, estimates, contracts, payments and client communication in one system, with KEEN — the LeadPrime AI agent — handling follow-up, segmentation and campaign work. Sold and supported at leadprimecrm.chyrris.com.",
      es: "Prospectos, estimados, contratos, pagos y comunicación con clientes en un solo sistema, con KEEN —el agente de IA de LeadPrime— encargado de seguimiento, segmentación y campañas. Se vende y se atiende en leadprimecrm.chyrris.com.",
    },
    platforms: ["web", "ios"],
    links: [
      { kind: "web", href: "https://leadprimecrm.chyrris.com", label: openLabel, external: true },
      ...storeEntries("leadprime"),
    ],
  },
  {
    key: "tzotzil-bible",
    name: "Tzotzil Bible",
    category: { en: "Language preservation", es: "Preservación lingüística" },
    summary: {
      en: "The Bible in Tzotzil, published on the web, iOS and Android.",
      es: "La Biblia en tzotzil, publicada en web, iOS y Android.",
    },
    detail: {
      en: "A bilingual Spanish/Tzotzil Bible that puts the text in the hands of Tzotzil-speaking communities on whichever device they already have.",
      es: "Una Biblia bilingüe español/tzotzil que pone el texto al alcance de las comunidades tzotziles en el dispositivo que ya tienen.",
    },
    platforms: ["web", "ios", "android"],
    page: "/tzotzil-bible",
    links: [
      { kind: "web", href: "https://bible.chyrris.com", label: openLabel, external: true },
      ...storeEntries("tzotzil-bible"),
      { kind: "page", href: "/tzotzil-bible", label: detailsLabel, external: false },
    ],
  },
  {
    key: "caymus-tanks",
    name: "Caymus Tank Calculator",
    category: { en: "Wine industry", es: "Industria vinícola" },
    summary: {
      en: "Tank volume and conversion calculator for winemakers, running on an active subscription.",
      es: "Calculadora de volúmenes y conversiones de tanques para enólogos, con suscripción activa.",
    },
    detail: {
      en: "Built for cellar work: tank geometry, volume, and unit conversion during production, with a paid subscription and active customers.",
      es: "Hecha para el trabajo de bodega: geometría de tanques, volumen y conversión de unidades durante la producción, con suscripción de pago y clientes activos.",
    },
    platforms: ["ios"],
    page: "/caymus-tanks",
    links: [
      ...storeEntries("caymus-tanks"),
      { kind: "page", href: "/caymus-tanks", label: detailsLabel, external: false },
    ],
  },
  {
    key: "pocima-salvaje",
    name: "Pócima Salvaje",
    category: { en: "Natural medicine", es: "Medicina natural" },
    summary: {
      en: "Published iOS application on medicinal plants and traditional remedies.",
      es: "Aplicación publicada en iOS sobre plantas medicinales y remedios tradicionales.",
    },
    detail: {
      en: "A reference on medicinal plants and traditional remedies with an assistant that answers questions about preparation and properties.",
      es: "Una referencia sobre plantas medicinales y remedios tradicionales, con un asistente que responde preguntas sobre preparación y propiedades.",
    },
    platforms: ["ios"],
    page: "/pocima-salvaje",
    links: [
      ...storeEntries("pocima-salvaje"),
      { kind: "page", href: "/pocima-salvaje", label: detailsLabel, external: false },
    ],
  },
  {
    key: "mervin-ai",
    name: "Mervin AI",
    category: { en: "Construction estimating", es: "Estimación para construcción" },
    summary: {
      en: "Estimating tool for construction work, in operation at app.owlfenc.com.",
      es: "Herramienta de estimación para construcción, en operación en app.owlfenc.com.",
    },
    detail: {
      en: "Turns project scope into priced estimates and material takeoffs for contractors.",
      es: "Convierte el alcance de un proyecto en estimados con precios y listas de materiales para contratistas.",
    },
    platforms: ["web"],
    links: [{ kind: "web", href: "https://app.owlfenc.com", label: openLabel, external: true }],
  },
  {
    key: "owl-fenc",
    name: "Owl Fenc",
    category: { en: "Fencing contractor", es: "Negocio de cercas" },
    summary: {
      en: "Fencing business operating at owlfenc.com.",
      es: "Negocio de cercas en operación en owlfenc.com.",
    },
    detail: {
      en: "A working fencing contractor, and the field operation that Mervin AI and LeadPrime were built against.",
      es: "Un negocio de cercas en operación, y la operación de campo contra la que se construyeron Mervin AI y LeadPrime.",
    },
    platforms: ["web"],
    links: [{ kind: "web", href: "https://owlfenc.com", label: visitLabel, external: true }],
  },
  {
    key: "andy-ai",
    name: "Andy AI",
    category: { en: "Separate business", es: "Negocio separado" },
    summary: {
      en: "A separate business in operation.",
      es: "Un negocio separado, en operación.",
    },
    detail: {
      en: "Operated independently of the LeadPrime product line.",
      es: "Opera de forma independiente de la línea de producto de LeadPrime.",
    },
    platforms: [],
    // Sin enlace: el negocio se describe como lo que es, en operación. Nunca con
    // candado ni "próximamente". Cuando llegue la URL se agrega aquí.
    links: [],
  },
];

export const featuredProduct = products.find((p) => p.featured)!;
export const otherProducts = products.filter((p) => !p.featured);

export const platformLabels: Record<"web" | "ios" | "android", Record<Locale, string>> = {
  web: { en: "Web", es: "Web" },
  ios: { en: "iOS", es: "iOS" },
  android: { en: "Android", es: "Android" },
};
