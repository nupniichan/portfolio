import { useCallback } from "react";
import { useThemeLanguage } from "../components/ThemeLanguageProvider";
import enTranslations from "../locales/en.json";
import viTranslations from "../locales/vi.json";

const translations = {
  en: enTranslations,
  vi: viTranslations,
};

export function useTranslations() {
  const { language } = useThemeLanguage();

  const t = useCallback((key: string): any => {
    const currentLang = language;
    const keys = key.split('.');
    let value: unknown = translations[currentLang];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    return value;
  }, [language]);

  return { t };
}