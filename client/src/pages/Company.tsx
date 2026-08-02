import { Link } from "wouter";
import { Layout, PageHeader } from "@/components/layout/Layout";
import { useLocale } from "@/i18n/locale";
import { company, locationLabel, registrationLabel } from "@shared/site/company";

/**
 * La página que un socio haciendo due diligence abre primero. Todo lo que
 * necesita —razón social, número de registro, jurisdicción, ciudad y estado, y
 * a quién escribir— está aquí, en texto, servido desde el origen.
 */
export default function Company() {
  const { t, locale } = useLocale();
  const c = t.companyPage;

  const facts: Array<[string, string]> = [
    [t.companySection.facts.legalNameLabel, company.legalName],
    [t.companySection.facts.registrationLabel, registrationLabel],
    [
      t.companySection.facts.foundedLabel,
      locale === "es" ? "Estado de California, EE. UU." : "State of California, USA",
    ],
    [t.companySection.facts.locationLabel, locationLabel],
    [t.companySection.facts.contactLabel, company.email.general],
  ];

  return (
    <Layout path="/company">
      <PageHeader eyebrow={t.companySection.eyebrow} title={c.heading} lede={c.lede} />

      <div className="container-site py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <section>
              <h2 className="text-xl font-semibold text-text">{c.whatWeDoHeading}</h2>
              <div className="prose-site mt-4">
                {c.whatWeDo.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-xl font-semibold text-text">{c.structureHeading}</h2>
              <div className="prose-site mt-4">
                {c.structure.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-xl font-semibold text-text">{c.verifyHeading}</h2>
              <div className="prose-site mt-4">
                <p>{c.verifyBody}</p>
              </div>
            </section>
          </div>

          {/* Ficha de registro */}
          <aside className="md:col-span-5">
            <div className="card sticky top-24 p-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-text-faint">
                {locale === "es" ? "Datos de registro" : "Registration details"}
              </h2>
              <dl className="mt-5" data-testid="company-facts">
                {facts.map(([k, v]) => (
                  <div key={k} className="border-b border-line py-3 last:border-0 last:pb-0">
                    <dt className="text-xs text-text-faint">{k}</dt>
                    <dd className="mt-1 text-sm text-text">{v}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/contact"
                className="mt-6 block rounded bg-accent px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                {t.nav.contact}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
