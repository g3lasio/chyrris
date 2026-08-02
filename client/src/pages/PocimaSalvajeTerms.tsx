import { LegalDocument } from "@/components/LegalDocument";
import { useLocale } from "@/i18n/locale";
import { pocimaContent } from "@/content/apps/pocima";

export default function PocimaSalvajeTerms() {
  const { locale } = useLocale();
  const doc = pocimaContent.terms?.[locale] ?? pocimaContent.privacy[locale];
  return <LegalDocument path="/pocima-salvaje/terms" doc={doc} />;
}
