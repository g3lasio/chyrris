import { AppSupportPage } from "@/components/AppSupportPage";
import { useLocale } from "@/i18n/locale";
import { caymusContent } from "@/content/apps/caymus";

export default function CaymusTanksSupport() {
  const { locale } = useLocale();
  return <AppSupportPage path="/caymus-tanks/support" doc={caymusContent.support[locale]} />;
}
