import { lazy, Suspense, type ComponentType } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { pageImporters, notFoundImporter } from "./pageRoutes";
import { detectLocaleFromUrl } from "./i18n/locale";

/**
 * Punto de entrada del cliente.
 *
 * Cada ruta se envuelve en React.lazy, así que Rollup emite un chunk por página
 * y el visitante sólo descarga la que abre. El chunk de la ruta actual se
 * precarga de inmediato para que la hidratación no espere un ida y vuelta.
 *
 * Si el HTML ya trae el contenido (lo normal: el build lo prerenderiza), se
 * hidrata en vez de montar de cero, y el texto nunca parpadea.
 */

const pages: Record<string, ComponentType<any>> = Object.fromEntries(
  Object.entries(pageImporters).map(([path, importer]) => [path, lazy(importer)]),
);
const NotFound = lazy(notFoundImporter);

const { locale, path } = detectLocaleFromUrl(window.location.pathname);

const tree = (
  // El fallback queda vacío a propósito: en la primera carga el HTML servido ya
  // tiene el contenido, y Suspense sólo entra en juego al navegar a otra ruta.
  <Suspense fallback={null}>
    <App locale={locale} path={path} pages={pages} notFound={NotFound} />
  </Suspense>
);

const container = document.getElementById("root")!;

async function start() {
  // Resolver el chunk de esta ruta antes de hidratar evita que React descarte
  // el HTML servido por no poder emparejarlo con un árbol suspendido.
  const importer = pageImporters[path] ?? notFoundImporter;
  await importer().catch(() => undefined);

  if (container.hasChildNodes()) {
    hydrateRoot(container, tree);
  } else {
    createRoot(container).render(tree);
  }
}

void start();
