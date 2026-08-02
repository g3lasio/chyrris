import { Link } from "wouter";
import { useLocale } from "@/i18n/locale";
import { platformLabels, type Product } from "@shared/site/portfolio";

/**
 * Ficha de un producto del portafolio.
 *
 * Invariantes, que son el defecto central que esta reconstrucción corrige:
 *  - No existe el estado "próximamente" ni el candado.
 *  - Un enlace se renderiza sólo si tiene destino; nunca href="#".
 *  - Un producto sin enlace de tienda se publica igual, descrito como lo que es:
 *    un negocio o una app en operación.
 */
export function ProductCard({ product }: { product: Product }) {
  const { t, locale } = useLocale();
  const links = product.links.filter((l) => l.href.trim() !== "");

  return (
    <article
      className="card flex h-full flex-col p-6 transition-colors hover:border-line-strong"
      data-testid={`product-${product.key}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-text">{product.name}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-text-faint">
            {product.category[locale]}
          </p>
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-text-muted">
        {product.summary[locale]}
      </p>

      {product.platforms.length > 0 && (
        <p className="mt-5 text-xs text-text-faint">
          {t.portfolio.platformsLabel}{" "}
          <span className="text-text-muted">
            {product.platforms.map((p) => platformLabels[p][locale]).join(" · ")}
          </span>
        </p>
      )}

      {links.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
          {links.map((link) =>
            link.external ? (
              <a
                key={`${link.kind}-${link.href}`}
                href={link.href}
                className="rounded border border-line-strong px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:border-accent hover:text-text"
                data-testid={`product-${product.key}-${link.kind}`}
              >
                {link.label[locale]}
              </a>
            ) : (
              <Link
                key={`${link.kind}-${link.href}`}
                href={link.href}
                className="rounded border border-line-strong px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:border-accent hover:text-text"
                data-testid={`product-${product.key}-${link.kind}`}
              >
                {link.label[locale]}
              </Link>
            ),
          )}
        </div>
      ) : (
        // Sin enlace disponible: se declara el estado real del negocio. Nunca un
        // candado, nunca "próximamente".
        <p
          className="mt-5 border-t border-line pt-5 text-xs font-medium text-text-faint"
          data-testid={`product-${product.key}-status`}
        >
          {t.portfolio.noStoreLink}
        </p>
      )}
    </article>
  );
}
