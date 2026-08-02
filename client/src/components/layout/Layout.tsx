import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageHead } from "@/components/PageHead";

/**
 * Un solo esqueleto para todas las páginas.
 *
 * Antes cada familia de páginas traía el suyo: la portada con su navegación,
 * Tzotzil con otra, y Caymus/support sin encabezado ni pie — de ahí también los
 * dos pies apilados de /pocima-salvaje. Aquí sólo hay uno, y se renderiza una
 * vez.
 */
export function Layout({
  path,
  children,
  width = "site",
}: {
  path: string;
  children: ReactNode;
  width?: "site" | "prose";
}) {
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <PageHead path={path} />
      <SiteHeader />
      <main id="main" className={`flex-1 ${width === "prose" ? "" : ""}`}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

/** Encabezado estándar de una página interior. */
export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="border-b border-line bg-surface">
      <div className="container-site py-14 md:py-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text md:text-4xl">
          {title}
        </h1>
        {lede && (
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-text-muted">{lede}</p>
        )}
      </div>
    </div>
  );
}
