import { renderToString } from "react-dom/server";
import App from "./App";
import { resolveAllPages } from "./pageRoutes";
import { detectLocaleFromUrl } from "./i18n/locale";
import { buildHead, headToHtml } from "@shared/site/seo";
import { allUrls, routeByPath } from "@shared/site/routes";

// El script de prerender consume esta lista para saber qué URLs escribir.
export { allUrls };

/**
 * Render estático usado por el build.
 *
 * Resuelve todos los componentes de página antes de renderizar, de modo que
 * renderToString puede correr de forma síncrona aunque el cliente cargue esas
 * mismas páginas de forma diferida.
 */

export interface RenderResult {
  html: string;
  head: string;
  lang: string;
  /** Falso para rutas que no existen: el servidor las responde con 404. */
  known: boolean;
}

export async function render(url: string): Promise<RenderResult> {
  const { locale, path } = detectLocaleFromUrl(url);
  const { pages, notFound } = await resolveAllPages();

  const html = renderToString(
    <App locale={locale} path={path} pages={pages} notFound={notFound} ssrPath={url} />,
  );

  const head = buildHead(path, locale);

  return {
    html,
    head: headToHtml(head),
    lang: locale,
    known: routeByPath.has(path),
  };
}
