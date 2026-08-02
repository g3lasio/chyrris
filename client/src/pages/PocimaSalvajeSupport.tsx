import { AppSupportPage } from "@/components/AppSupportPage";
import { useLocale } from "@/i18n/locale";
import { pocimaContent } from "@/content/apps/pocima";

export default function PocimaSalvajeSupport() {
  const { locale } = useLocale();
  return <AppSupportPage path="/pocima-salvaje/support" doc={pocimaContent.support[locale]} />;
}
