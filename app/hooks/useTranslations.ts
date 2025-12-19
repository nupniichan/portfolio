import { useThemeLanguage } from "../components/ThemeLanguageProvider";
import translations from "../locales/translations.json";

export function useTranslations() {
  const { language, mounted } = useThemeLanguage();

  const t = (key: string) => {
    const currentLang = mounted ? language : "en";
    const keys = key.split('.');
    let value: any = translations[currentLang];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return value;
  };

  return { t };
}