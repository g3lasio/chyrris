import { Layout, PageHeader } from "@/components/layout/Layout";
import { useLocale } from "@/i18n/locale";
import type { LegalDoc } from "@/content/legal";

/**
 * Presentación única para cualquier documento legal del sitio, corporativo o de
 * una app. Antes cada política traía su propio marcado, y la de Tzotzil repetía
 * su párrafo introductorio como sección 1.
 */
export function LegalDocument({ path, doc }: { path: string; doc: LegalDoc }) {
  const { t } = useLocale();

  return (
    <Layout path={path}>
      <PageHeader title={doc.title} />

      <div className="container-prose py-12 md:py-16">
        <p className="text-sm text-text-faint" data-testid="legal-updated">
          {t.common.lastUpdated}: {doc.updated}
        </p>

        <p className="prose-site mt-6 text-[16px]">{doc.intro}</p>

        <div className="prose-site mt-4">
          {doc.sections.map((section, i) => (
            <section key={section.heading}>
              <h2>
                {i + 1}. {section.heading}
              </h2>
              {section.paragraphs?.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
}
