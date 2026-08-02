import { Layout, PageHeader } from "@/components/layout/Layout";
import { useLocale } from "@/i18n/locale";
import { company } from "@shared/site/company";
import type { SupportDoc } from "@/content/appDocs";

/**
 * Página de soporte de una app.
 *
 * Un solo compromiso de respuesta, leído de shared/site/company.ts, y un solo
 * correo de soporte. Antes convivían "24-48 hours", "48 horas" y
 * "0900-1800 PST" entre páginas, y la de Caymus sólo existía en inglés.
 */
export function AppSupportPage({ path, doc }: { path: string; doc: SupportDoc }) {
  const { t, locale } = useLocale();

  return (
    <Layout path={path}>
      <PageHeader title={doc.title} lede={doc.intro} />

      <div className="container-prose py-12 md:py-16">
        <section className="card p-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-text-faint">
            {doc.contactHeading}
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex flex-wrap gap-2">
              <dt className="text-text-faint">Email:</dt>
              <dd>
                <a className="link-underline" href={`mailto:${company.email.support}`}>
                  {company.email.support}
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap gap-2">
              <dt className="text-text-faint">
                {locale === "es" ? "Tiempo de respuesta:" : "Response time:"}
              </dt>
              <dd className="text-text-muted">{t.contact.responseCommitment}</dd>
            </div>
          </dl>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-text">{doc.faqHeading}</h2>
          <dl className="mt-5 space-y-4">
            {doc.faq.map((item) => (
              <div key={item.question} className="card p-5">
                <dt className="text-[15px] font-semibold text-text">{item.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-text-muted">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {doc.requirements && doc.requirements.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-text">{doc.requirementsHeading}</h2>
            <ul className="prose-site mt-4">
              {doc.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>
        )}

        {doc.bugChecklist && doc.bugChecklist.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-text">{doc.bugHeading}</h2>
            <div className="prose-site mt-4">
              {doc.bugIntro && <p>{doc.bugIntro}</p>}
              <ul>
                {doc.bugChecklist.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
