import { useLocale } from "@/i18n/locale";

/**
 * Dos enlaces reales a la misma página en cada idioma.
 *
 * Es deliberadamente una navegación de documento completa (<a>, no el Link de
 * wouter): así el servidor entrega el HTML con el `lang` correcto, el `<title>`
 * y las etiquetas del idioma elegido, y no queda ningún estado de idioma
 * escondido en localStorage que pueda desincronizarse de la URL.
 */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, alternate, t } = useLocale();

  const options: Array<{ code: "en" | "es"; label: string; href: string }> = [
    { code: "en", label: "EN", href: locale === "en" ? "" : alternate.href },
    { code: "es", label: "ES", href: locale === "es" ? "" : alternate.href },
  ];

  return (
    <div
      className={`flex items-center gap-0.5 rounded border border-line p-0.5 ${className}`}
      role="group"
      aria-label={t.common.language}
      data-testid="language-switcher"
      data-current-locale={locale}
    >
      {options.map((opt) => {
        const current = opt.code === locale;
        if (current) {
          return (
            <span
              key={opt.code}
              aria-current="true"
              className="rounded bg-accent px-2 py-1 text-xs font-semibold text-white"
              data-testid={`lang-${opt.code}`}
            >
              {opt.label}
            </span>
          );
        }
        return (
          <a
            key={opt.code}
            href={opt.href}
            hrefLang={opt.code}
            className="rounded px-2 py-1 text-xs font-medium text-text-muted transition-colors hover:bg-surface-raised hover:text-text"
            data-testid={`lang-${opt.code}`}
          >
            {opt.label}
          </a>
        );
      })}
    </div>
  );
}
