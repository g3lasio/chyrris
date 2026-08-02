import type { ComponentType } from "react";
import { Route, Router, Switch } from "wouter";
import { LocaleProvider, routerBase, type Locale } from "@/i18n/locale";

/**
 * El idioma se resuelve una sola vez por carga de documento y se pasa como
 * `base` a wouter, de modo que un <Link href="/company"> apunta a "/company" en
 * inglés y a "/es/company" en español sin que ninguna página tenga que saberlo.
 *
 * Cambiar de idioma es una navegación de documento completa (ver
 * LanguageSwitcher), así que `base` nunca necesita cambiar en caliente.
 */
export interface AppProps {
  locale: Locale;
  /** Ruta lógica sin prefijo de idioma. */
  path: string;
  /** Componentes por ruta: React.lazy en el cliente, ya resueltos en el prerender. */
  pages: Record<string, ComponentType<any>>;
  notFound: ComponentType<any>;
  /** URL completa para el render estático del prerender. */
  ssrPath?: string;
}

export default function App({ locale, path, pages, notFound: NotFound, ssrPath }: AppProps) {
  const base = routerBase(locale);

  return (
    <LocaleProvider locale={locale} path={path}>
      <Router base={base} ssrPath={ssrPath}>
        <Switch>
          {Object.entries(pages).map(([routePath, Component]) => (
            <Route key={routePath} path={routePath} component={Component} />
          ))}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </LocaleProvider>
  );
}
