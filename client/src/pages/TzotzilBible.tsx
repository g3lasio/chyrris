import { AppProductPage } from "@/components/AppProductPage";
import { useLocale } from "@/i18n/locale";
import { tzotzilContent } from "@/content/apps/tzotzil";

export default function TzotzilBible() {
  const { locale, t } = useLocale();
  return (
    <AppProductPage
      path="/tzotzil-bible"
      productKey="tzotzil-bible"
      overview={tzotzilContent.overview[locale]}
      subpages={[
        { href: "/tzotzil-bible/about", label: locale === "es" ? "Acerca de" : "About" },
        { href: "/tzotzil-bible/support", label: locale === "es" ? "Soporte" : "Support" },
        { href: "/tzotzil-bible/privacy", label: t.contact.form.consentLinkText },
      ]}
    />
  );
}
