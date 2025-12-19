"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ThemeMode = "light" | "dark";
export type LanguageCode = "en" | "vi";

type ThemeLanguageContextValue = {
  theme: ThemeMode;
  language: LanguageCode;
  mounted: boolean;
  toggleTheme: () => void;
  toggleLanguage: () => void;
};

const ThemeLanguageContext = createContext<ThemeLanguageContextValue | undefined>(
  undefined
);

const THEME_STORAGE_KEY = "portfolio-theme";
const LANGUAGE_STORAGE_KEY = "portfolio-language";

function getPreferredTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
  if (stored === "light" || stored === "dark") return stored;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

function getPreferredLanguage(): LanguageCode {
  if (typeof window === "undefined") return "en";

  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as
    | LanguageCode
    | null;
  if (stored === "en" || stored === "vi") return stored;

  const browserLang = window.navigator.language.toLowerCase();
  return browserLang.startsWith("vi") ? "vi" : "en";
}

function applyThemeClass(theme: ThemeMode) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.classList.remove("theme-light", "theme-dark");
  root.classList.add(theme === "light" ? "theme-light" : "theme-dark");
}

export function ThemeLanguageProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [language, setLanguage] = useState<LanguageCode>("en");

  useEffect(() => {
    setMounted(true);
    setTheme(getPreferredTheme());
    setLanguage(getPreferredLanguage());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyThemeClass(theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window === "undefined") return;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    applyThemeClass(theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "vi" : "en"));
  };

  const value: ThemeLanguageContextValue = {
    theme,
    language,
    mounted,
    toggleTheme,
    toggleLanguage,
  };

  return (
    <ThemeLanguageContext.Provider value={value}>
      {children}
    </ThemeLanguageContext.Provider>
  );
}

export function useThemeLanguage() {
  const ctx = useContext(ThemeLanguageContext);
  if (!ctx) {
    throw new Error("useThemeLanguage must be used within ThemeLanguageProvider");
  }
  return ctx;
}

