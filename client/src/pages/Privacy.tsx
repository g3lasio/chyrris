import { LegalDocument } from "@/components/LegalDocument";
import { useLocale } from "@/i18n/locale";
import { privacyPolicy } from "@/content/legal";

export default function Privacy() {
  const { locale } = useLocale();
  return <LegalDocument path="/privacy" doc={privacyPolicy[locale]} />;
}
