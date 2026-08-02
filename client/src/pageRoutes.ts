/**
 * Tabla de páginas: ruta lógica -> import dinámico del componente.
 *
 * Se declara una sola vez y la consumen los dos puntos de entrada:
 *  - el cliente la envuelve en React.lazy, y así cada ruta viaja en su propio
 *    chunk (code splitting por ruta);
 *  - el prerender resuelve los imports antes de renderizar, y así puede usar
 *    renderToString de forma síncrona.
 *
 * Una sola fuente evita que las dos listas se desincronicen.
 */

import type { ComponentType } from "react";

export type PageImporter = () => Promise<{ default: ComponentType<any> }>;

export const pageImporters: Record<string, PageImporter> = {
  "/": () => import("./pages/Home"),
  "/company": () => import("./pages/Company"),
  "/portfolio": () => import("./pages/Portfolio"),
  "/contact": () => import("./pages/Contact"),
  "/privacy": () => import("./pages/Privacy"),
  "/terms": () => import("./pages/Terms"),

  "/tzotzil-bible": () => import("./pages/TzotzilBible"),
  "/tzotzil-bible/about": () => import("./pages/TzotzilBibleAbout"),
  "/tzotzil-bible/support": () => import("./pages/TzotzilBibleSupport"),
  "/tzotzil-bible/privacy": () => import("./pages/TzotzilBiblePrivacy"),

  "/pocima-salvaje": () => import("./pages/PocimaSalvaje"),
  "/pocima-salvaje/privacy": () => import("./pages/PocimaSalvajePrivacy"),
  "/pocima-salvaje/terms": () => import("./pages/PocimaSalvajeTerms"),
  "/pocima-salvaje/support": () => import("./pages/PocimaSalvajeSupport"),

  "/caymus-tanks": () => import("./pages/CaymusTanks"),
  "/caymus-tanks/privacy": () => import("./pages/CaymusTanksPrivacy"),
  "/caymus-tanks/support": () => import("./pages/CaymusTanksSupport"),
  "/caymus-tanks/subscribe": () => import("./pages/CaymusTanksSubscribe"),
};

export const notFoundImporter: PageImporter = () => import("./pages/not-found");

/** Resuelve todos los componentes. Lo usa el prerender. */
export async function resolveAllPages(): Promise<{
  pages: Record<string, ComponentType<any>>;
  notFound: ComponentType<any>;
}> {
  const entries = await Promise.all(
    Object.entries(pageImporters).map(async ([path, importer]) => {
      const mod = await importer();
      return [path, mod.default] as const;
    }),
  );
  const notFound = (await notFoundImporter()).default;
  return { pages: Object.fromEntries(entries), notFound };
}
