import { createContext, useContext, type ReactNode } from "react";
import { copy, type Copy } from "@/content/copy";
import {
  DEFAULT_LOCALE,
  ES_PREFIX,
  localizedPath,
  parsePath,
  type Locale,
} from "@shared/site/routes";

/**
 * El idioma vive en la URL: inglés en la raíz, español bajo /es.
 *
 * El selector anterior guardaba el idioma en localStorage y un <div> decorativo
 * con clip-path (`armor-plate`) se comía el clic, así que "ES" no hacía nada y
 * `html lang` se quedaba en "en" para siempre. Aquí el cambio de idioma es un
 * enlace de verdad a otra URL: no hay nada que interceptar, el servidor sirve el
 * `lang` correcto, y hreflang tiene dos direcciones reales que apuntar.
 */

interface LocaleContextValue {
  locale: Locale;
  /** Ruta lógica sin el prefijo de idioma: "/es/company" -> "/company". */
  path: string;
  t: Copy;
  /** Prefija una ruta interna con el idioma actual. */
  href: (path: string) => string;
  /** La misma página en el otro idioma. */
  alternate: { locale: Locale; href: string };
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function detectLocaleFromUrl(url: string): { locale: Locale; path: string } {
  return parsePath(url);
}

/** Base para el <Router> de wouter: "" en inglés, "/es" en español. */
export function routerBase(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : ES_PREFIX;
}

export function LocaleProvider({
  locale,
  path,
  children,
}: {
  locale: Locale;
  path: string;
  children: ReactNode;
}) {
  const other: Locale = locale === "en" ? "es" : "en";
  const value: LocaleContextValue = {
    locale,
    path,
    t: copy[locale],
    href: (p: string) => localizedPath(p, locale),
    alternate: { locale: other, href: localizedPath(path, other) },
  };
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider");
  return ctx;
}

/** Atajo para el texto: `const t = useCopy()`. */
export function useCopy(): Copy {
  return useLocale().t;
}

export type { Locale };
