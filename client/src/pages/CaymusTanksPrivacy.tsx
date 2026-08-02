import { LegalDocument } from "@/components/LegalDocument";
import { useLocale } from "@/i18n/locale";
import { caymusContent } from "@/content/apps/caymus";

export default function CaymusTanksPrivacy() {
  const { locale } = useLocale();
  return <LegalDocument path="/caymus-tanks/privacy" doc={caymusContent.privacy[locale]} />;
}
