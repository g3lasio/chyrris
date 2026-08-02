import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { useLocale } from "@/i18n/locale";
import { company, locationLabel, registrationLabel } from "@shared/site/company";
import { featuredProduct, otherProducts } from "@shared/site/portfolio";

export default function Home() {
  const { t, locale } = useLocale();

  return (
    <Layout path="/">
      {/* Hero — sin indicador de scroll encima del titular y sin capacidades abstractas. */}
      <section className="border-b border-line">
        <div className="container-site py-20 md:py-28">
          <p className="eyebrow" data-testid="hero-eyebrow">
            {t.hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-text md:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">{t.hero.lede}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="https://leadprimecrm.chyrris.com"
              className="rounded bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              data-testid="hero-cta-leadprime"
            >
              {t.hero.primaryCta}
            </a>
            <Link
              href="/company"
              className="rounded border border-line-strong px-5 py-2.5 text-sm font-medium text-text-muted transition-colors hover:border-accent hover:text-text"
              data-testid="hero-cta-company"
            >
              {t.hero.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Producto principal, destacado — no una tarjeta más entre seis. */}
      <section className="section border-b border-line bg-surface" id="leadprime">
        <div className="container-site">
          <Reveal>
            <div className="grid gap-10 md:grid-cols-12 md:items-start">
              <div className="md:col-span-7">
                <p className="eyebrow">{t.featured.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text md:text-4xl">
                  {t.featured.heading}
                </h2>
                <p className="mt-5 text-[17px] leading-relaxed text-text-muted">{t.featured.body}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
                  {t.featured.agentNote}
                </p>
                <a
                  href="https://leadprimecrm.chyrris.com"
                  className="mt-7 inline-flex items-center gap-2 rounded bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                  data-testid="featured-cta"
                >
                  {t.featured.cta}
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10.3 3.3a1 1 0 011.4 0l6 6a1 1 0 010 1.4l-6 6a1 1 0 01-1.4-1.4L14.6 11H3a1 1 0 110-2h11.6l-4.3-4.3a1 1 0 010-1.4z" />
                  </svg>
                </a>
              </div>

              <dl className="card md:col-span-5 md:p-7 p-6 text-sm">
                {[
                  [locale === "es" ? "Producto" : "Product", featuredProduct.name],
                  [
                    locale === "es" ? "Para" : "For",
                    locale === "es" ? "Contratistas" : "Contractors",
                  ],
                  [locale === "es" ? "Agente de IA" : "AI agent", "KEEN"],
                  [locale === "es" ? "Dónde" : "Where", "leadprimecrm.chyrris.com"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-line py-3 first:pt-0 last:border-0 last:pb-0">
                    <dt className="text-text-faint">{k}</dt>
                    <dd className="text-right font-medium text-text">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Portafolio */}
      <section className="section border-b border-line" id="portfolio">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow">{t.portfolio.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text md:text-4xl">
              {t.portfolio.heading}
            </h2>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-text-muted">
              {t.portfolio.lede}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherProducts.map((product, i) => (
              <Reveal key={product.key} delay={i * 45}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* La compañía */}
      <section className="section bg-surface" id="company">
        <div className="container-site">
          <Reveal>
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-6">
                <p className="eyebrow">{t.companySection.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text md:text-4xl">
                  {t.companySection.heading}
                </h2>
                <p className="mt-5 text-[17px] leading-relaxed text-text-muted">
                  {t.companySection.lede}
                </p>
                <Link
                  href="/company"
                  className="mt-7 inline-block rounded border border-line-strong px-5 py-2.5 text-sm font-medium text-text-muted transition-colors hover:border-accent hover:text-text"
                  data-testid="company-cta"
                >
                  {t.companySection.cta}
                </Link>
              </div>

              <dl className="md:col-span-6">
                {[
                  [t.companySection.facts.legalNameLabel, company.legalName],
                  [t.companySection.facts.registrationLabel, registrationLabel],
                  [t.companySection.facts.locationLabel, locationLabel],
                  [t.companySection.facts.contactLabel, company.email.general],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-[minmax(7rem,auto)_1fr] gap-4 border-b border-line py-3.5 text-sm first:pt-0 last:border-0"
                  >
                    <dt className="text-text-faint">{k}</dt>
                    <dd className="text-text">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
