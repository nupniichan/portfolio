"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ThemeMode = "light" | "dark";
export type LanguageCode = "en" | "vi";

type ThemeLanguageContextValue = {
  theme: ThemeMode;
  language: LanguageCode;
  mounted: boolean;
  isLoading: boolean;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  setIsLoading: (loading: boolean) => void;
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
  if (typeof window === "undefined") return "vi";

  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as
    | LanguageCode
    | null;
  if (stored === "en" || stored === "vi") return stored;

  const browserLang = window.navigator.language.toLowerCase();
  return browserLang.startsWith("en") ? "en" : "vi";
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
  const [language, setLanguage] = useState<LanguageCode>("vi");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    setTheme(getPreferredTheme());
    setLanguage(getPreferredLanguage());
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
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
    setIsLoading(true);
    setTimeout(() => {
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Overlay stays a bit after theme change
    }, 500); // Theme change happens while overlay is fully visible
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "vi" : "en"));
  };

  const value: ThemeLanguageContextValue = {
    theme,
    language,
    mounted,
    isLoading,
    toggleTheme,
    toggleLanguage,
    setIsLoading,
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

