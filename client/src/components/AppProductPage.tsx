import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { AppImage, productImages } from "@/components/AppImage";
import { useLocale } from "@/i18n/locale";
import { platformLabels, products } from "@shared/site/portfolio";
import type { AppOverview } from "@/content/appDocs";

/**
 * Ficha de producto. Una sola presentación para las tres apps: antes Tzotzil
 * iba en dorado con emoji por iconos, Caymus en otro azul, y Pócima con dos
 * pies de página apilados.
 */
export function AppProductPage({
  path,
  productKey,
  overview,
  subpages = [],
}: {
  path: string;
  productKey: string;
  overview: AppOverview;
  subpages?: Array<{ href: string; label: string }>;
}) {
  const { locale } = useLocale();
  const product = products.find((p) => p.key === productKey);
  if (!product) throw new Error(`Producto desconocido: ${productKey}`);

  const links = product.links.filter((l) => l.href.trim() !== "" && l.kind !== "page");

  return (
    <Layout path={path}>
      <section className="border-b border-line bg-surface">
        <div className="container-site py-14 md:py-20">
          <div className="flex flex-col gap-7 md:flex-row md:items-start md:gap-10">
            {productImages[productKey] && (
              <div className="shrink-0">
                <AppImage
                  productKey={productKey}
                  alt=""
                  displaySize={112}
                  priority
                  className="h-28 w-28 rounded-xl border border-line object-cover"
                />
              </div>
            )}

            <div>
              <p className="eyebrow">{product.category[locale]}</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text md:text-4xl">
                {product.name}
              </h1>
              <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-text-muted">
                {overview.tagline}
              </p>

              {product.platforms.length > 0 && (
                <p className="mt-4 text-xs text-text-faint">
                  {locale === "es" ? "Publicado en" : "Published on"}{" "}
                  <span className="text-text-muted">
                    {product.platforms.map((p) => platformLabels[p][locale]).join(" · ")}
                  </span>
                </p>
              )}

              {links.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className="rounded bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                      data-testid={`app-link-${l.kind}`}
                    >
                      {l.label[locale]}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container-site py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="prose-site">
              {overview.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="card p-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-text-faint">
                {overview.highlightsHeading}
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-text-muted">
                {overview.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="mt-0.5 shrink-0 text-accent"
                      aria-hidden="true"
                    >
                      <path d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z" />
                    </svg>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {subpages.length > 0 && (
              <nav className="mt-5 flex flex-wrap gap-2">
                {subpages.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="rounded border border-line-strong px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:border-accent hover:text-text"
                  >
                    {s.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
