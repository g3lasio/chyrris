import { Layout, PageHeader } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { useLocale } from "@/i18n/locale";
import { featuredProduct, otherProducts, platformLabels } from "@shared/site/portfolio";

export default function Portfolio() {
  const { t, locale } = useLocale();

  const featuredLinks = featuredProduct.links.filter((l) => l.href.trim() !== "");

  return (
    <Layout path="/portfolio">
      <PageHeader eyebrow={t.portfolio.eyebrow} title={t.portfolio.heading} lede={t.portfolio.lede} />

      <div className="container-site py-14 md:py-20">
        {/* Producto principal */}
        <section className="card p-7 md:p-9" data-testid="portfolio-featured">
          <p className="eyebrow">{t.featured.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-semibold text-text md:text-3xl">
            {featuredProduct.name}
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-text-muted">
            {featuredProduct.detail[locale]}
          </p>
          <p className="mt-4 text-xs text-text-faint">
            {t.portfolio.platformsLabel}{" "}
            <span className="text-text-muted">
              {featuredProduct.platforms.map((p) => platformLabels[p][locale]).join(" · ")}
            </span>
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {featuredLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                {l.label[locale]}
              </a>
            ))}
          </div>
        </section>

        {/* Resto del portafolio */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {otherProducts.map((product, i) => (
            <Reveal key={product.key} delay={i * 45}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-sm text-text-faint">{t.portfolio.operatedBy}</p>
      </div>
    </Layout>
  );
}
