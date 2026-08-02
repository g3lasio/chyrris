import { LegalDocument } from "@/components/LegalDocument";
import { useLocale } from "@/i18n/locale";
import { tzotzilContent } from "@/content/apps/tzotzil";

export default function TzotzilBiblePrivacy() {
  const { locale } = useLocale();
  return <LegalDocument path="/tzotzil-bible/privacy" doc={tzotzilContent.privacy[locale]} />;
}
