import { AppProductPage } from "@/components/AppProductPage";
import { useLocale } from "@/i18n/locale";
import { tzotzilContent } from "@/content/apps/tzotzil";

export default function TzotzilBibleAbout() {
  const { locale, t } = useLocale();
  const about = tzotzilContent.about?.[locale] ?? tzotzilContent.overview[locale];
  return (
    <AppProductPage
      path="/tzotzil-bible/about"
      productKey="tzotzil-bible"
      overview={about}
      subpages={[
        { href: "/tzotzil-bible", label: locale === "es" ? "Ficha" : "Overview" },
        { href: "/tzotzil-bible/support", label: locale === "es" ? "Soporte" : "Support" },
        { href: "/tzotzil-bible/privacy", label: t.contact.form.consentLinkText },
      ]}
    />
  );
}
