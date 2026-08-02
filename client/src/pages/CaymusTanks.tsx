import { AppProductPage } from "@/components/AppProductPage";
import { useLocale } from "@/i18n/locale";
import { caymusContent } from "@/content/apps/caymus";

export default function CaymusTanks() {
  const { locale, t } = useLocale();
  return (
    <AppProductPage
      path="/caymus-tanks"
      productKey="caymus-tanks"
      overview={caymusContent.overview[locale]}
      subpages={[
        { href: "/caymus-tanks/support", label: locale === "es" ? "Soporte" : "Support" },
        { href: "/caymus-tanks/privacy", label: t.contact.form.consentLinkText },
        {
          href: "/caymus-tanks/subscribe",
          label: locale === "es" ? "Suscripción" : "Subscription",
        },
      ]}
    />
  );
}
