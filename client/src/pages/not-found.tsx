import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { useLocale } from "@/i18n/locale";

/**
 * El servidor responde esta página con un HTTP 404 real. Antes cualquier ruta
 * inexistente devolvía 200, así que los buscadores podían indexar direcciones
 * que no existen.
 */
export default function NotFound() {
  const { t } = useLocale();

  return (
    <Layout path="/__not-found">
      <div className="container-site flex min-h-[55vh] flex-col justify-center py-20">
        <p className="text-sm font-semibold tracking-[0.18em] text-accent">{t.notFound.code}</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text md:text-4xl">
          {t.notFound.heading}
        </h1>
        <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-text-muted">
          {t.notFound.body}
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="rounded bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            {t.notFound.cta}
          </Link>
        </div>
      </div>
    </Layout>
  );
}
