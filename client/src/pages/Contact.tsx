import { Layout, PageHeader } from "@/components/layout/Layout";
import { ContactForm } from "@/components/ContactForm";
import { useLocale } from "@/i18n/locale";
import { company, locationLabel } from "@shared/site/company";

export default function Contact() {
  const { t } = useLocale();

  return (
    <Layout path="/contact">
      <PageHeader title={t.contact.heading} lede={t.contact.lede} />

      <div className="container-site py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="lg:col-span-5">
            <div className="card p-6 md:p-7">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-text-faint">
                {t.contact.directHeading}
              </h2>
              <dl className="mt-5 space-y-5 text-sm">
                <div>
                  <dt className="text-text-faint">{t.contact.generalLabel}</dt>
                  <dd className="mt-1">
                    <a className="link-underline" href={`mailto:${company.email.general}`}>
                      {company.email.general}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-text-faint">{t.contact.supportLabel}</dt>
                  <dd className="mt-1">
                    <a className="link-underline" href={`mailto:${company.email.support}`}>
                      {company.email.support}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-text-faint">{t.contact.locationHeading}</dt>
                  {/* Ciudad y estado. Un sitio corporativo no publica su domicilio. */}
                  <dd className="mt-1 text-text">{locationLabel}</dd>
                </div>
              </dl>

              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-text-muted">
                {t.contact.responseCommitment}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
