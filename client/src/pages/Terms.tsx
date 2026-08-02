import { LegalDocument } from "@/components/LegalDocument";
import { useLocale } from "@/i18n/locale";
import { termsOfService } from "@/content/legal";

export default function Terms() {
  const { locale } = useLocale();
  return <LegalDocument path="/terms" doc={termsOfService[locale]} />;
}
