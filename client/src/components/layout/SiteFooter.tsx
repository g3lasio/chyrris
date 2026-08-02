import { Link } from "wouter";
import { useLocale } from "@/i18n/locale";
import { company, activeSocial, locationLabel, registrationLabel } from "@shared/site/company";
import { products } from "@shared/site/portfolio";

/**
 * El pie anterior tenía logo, tres iconos muertos con href="#" y un copyright.
 * Este lleva lo que un socio busca: razón social, ciudad y estado, número de
 * registro, los enlaces legales y las propiedades hermanas.
 *
 * Los iconos sociales se generan desde `activeSocial`: un perfil sin URL
 * configurada simplemente no se renderiza. Es imposible producir un href="#".
 */

const SIBLING_PROPERTIES = [
  { label: "LeadPrime", href: "https://leadprimecrm.chyrris.com" },
  { label: "Tzotzil Bible", href: "https://bible.chyrris.com" },
  { label: "Mervin AI", href: "https://app.owlfenc.com" },
  { label: "Owl Fenc", href: "https://owlfenc.com" },
];

const SOCIAL_PATHS: Record<string, string> = {
  linkedin:
    "M4.98 3.5a2.5 2.5 0 11-.01 5.001A2.5 2.5 0 014.98 3.5zM3 9h4v12H3zM10 9h3.8v1.71h.05c.53-.95 1.83-1.96 3.77-1.96 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.2 1.46-2.2 2.97V21h-4z",
  x: "M17.53 3h3.06l-6.69 7.64L21.75 21h-5.9l-4.62-5.9L5.94 21H2.88l7.15-8.17L2.25 3h6.05l4.18 5.4zM16.4 19.2h1.7L7.7 4.7H5.88z",
  github:
    "M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48A10 10 0 0012 2z",
};

export function SiteFooter() {
  const { t, locale } = useLocale();
  const year = new Date().getFullYear();

  const legalLinks = [
    { href: "/privacy", label: locale === "es" ? "Política de Privacidad" : "Privacy Policy" },
    { href: "/terms", label: locale === "es" ? "Términos de Servicio" : "Terms of Service" },
  ];

  const companyLinks = [
    { href: "/company", label: t.nav.company },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="border-t border-line bg-surface" data-testid="site-footer">
      <div className="container-site py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Identidad */}
          <div className="md:col-span-5">
            <p className="text-[15px] font-semibold text-text">{company.legalName}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-muted">
              {t.footer.tagline}
            </p>
            <dl className="mt-5 space-y-1.5 text-sm">
              <div className="flex gap-2">
                <dt className="text-text-faint">{t.companySection.facts.locationLabel}:</dt>
                <dd className="text-text-muted" data-testid="footer-location">
                  {locationLabel}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-text-faint">{t.companySection.facts.registrationLabel}:</dt>
                <dd className="text-text-muted" data-testid="footer-registration">
                  {registrationLabel}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-text-faint">{t.companySection.facts.contactLabel}:</dt>
                <dd>
                  <a className="link-underline" href={`mailto:${company.email.general}`}>
                    {company.email.general}
                  </a>
                </dd>
              </div>
            </dl>

            {activeSocial.length > 0 && (
              <ul className="mt-6 flex items-center gap-3">
                {activeSocial.map((s) => (
                  <li key={s.key}>
                    <a
                      href={s.url}
                      aria-label={s.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded border border-line text-text-muted transition-colors hover:border-line-strong hover:text-text"
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d={SOCIAL_PATHS[s.key] ?? ""} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Productos */}
          <nav className="md:col-span-3" aria-label={t.footer.productsHeading}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-text-faint">
              {t.footer.productsHeading}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {products.map((p) => {
                const target =
                  p.page ?? p.links.find((l) => l.kind === "web")?.href ?? null;
                if (!target) {
                  return (
                    <li key={p.key} className="text-text-muted">
                      {p.name}
                    </li>
                  );
                }
                return (
                  <li key={p.key}>
                    {p.page ? (
                      <Link href={p.page} className="text-text-muted transition-colors hover:text-text">
                        {p.name}
                      </Link>
                    ) : (
                      <a href={target} className="text-text-muted transition-colors hover:text-text">
                        {p.name}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Compañía + legal */}
          <nav className="md:col-span-2" aria-label={t.footer.companyHeading}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-text-faint">
              {t.footer.companyHeading}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-text-muted transition-colors hover:text-text">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-text-faint">
              {t.footer.legalHeading}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-text-muted transition-colors hover:text-text"
                    data-testid={`footer-legal-${l.href.slice(1)}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Propiedades hermanas */}
          <nav className="md:col-span-2" aria-label={t.footer.propertiesHeading}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-text-faint">
              {t.footer.propertiesHeading}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SIBLING_PROPERTIES.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className="text-text-muted transition-colors hover:text-text">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-line pt-6 text-sm text-text-faint">
          <p>
            © {year} {company.legalName}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
