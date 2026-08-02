import { AppSupportPage } from "@/components/AppSupportPage";
import { useLocale } from "@/i18n/locale";
import { tzotzilContent } from "@/content/apps/tzotzil";

export default function TzotzilBibleSupport() {
  const { locale } = useLocale();
  return <AppSupportPage path="/tzotzil-bible/support" doc={tzotzilContent.support[locale]} />;
}
