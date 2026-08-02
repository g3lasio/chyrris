import { AppProductPage } from "@/components/AppProductPage";
import { useLocale } from "@/i18n/locale";
import { pocimaContent } from "@/content/apps/pocima";

export default function PocimaSalvaje() {
  const { locale, t } = useLocale();
  return (
    <AppProductPage
      path="/pocima-salvaje"
      productKey="pocima-salvaje"
      overview={pocimaContent.overview[locale]}
      subpages={[
        { href: "/pocima-salvaje/support", label: locale === "es" ? "Soporte" : "Support" },
        { href: "/pocima-salvaje/privacy", label: t.contact.form.consentLinkText },
        { href: "/pocima-salvaje/terms", label: locale === "es" ? "Términos" : "Terms" },
      ]}
    />
  );
}
