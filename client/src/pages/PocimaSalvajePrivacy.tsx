import { LegalDocument } from "@/components/LegalDocument";
import { useLocale } from "@/i18n/locale";
import { pocimaContent } from "@/content/apps/pocima";

export default function PocimaSalvajePrivacy() {
  const { locale } = useLocale();
  return <LegalDocument path="/pocima-salvaje/privacy" doc={pocimaContent.privacy[locale]} />;
}
