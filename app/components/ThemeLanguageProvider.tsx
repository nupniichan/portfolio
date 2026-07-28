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

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function setCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value}; path=/; max-age=31536000; SameSite=Lax`;
}

function getPreferredTheme(fallback: ThemeMode = "light"): ThemeMode {
  if (typeof window === "undefined") return fallback;

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
  if (stored === "light" || stored === "dark") return stored;

  const cookieTheme = getCookie(THEME_STORAGE_KEY) as ThemeMode | null;
  if (cookieTheme === "light" || cookieTheme === "dark") return cookieTheme;

  return fallback;
}

function getPreferredLanguage(fallback: LanguageCode = "vi"): LanguageCode {
  if (typeof window === "undefined") return fallback;

  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as
    | LanguageCode
    | null;
  if (stored === "en" || stored === "vi") return stored;

  const cookieLang = getCookie(LANGUAGE_STORAGE_KEY) as LanguageCode | null;
  if (cookieLang === "en" || cookieLang === "vi") return cookieLang;

  return fallback;
}

function applyThemeClass(theme: ThemeMode) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.classList.remove("theme-light", "theme-dark");
  root.classList.add(theme === "light" ? "theme-light" : "theme-dark");
}

function applyLanguageAttribute(lang: LanguageCode) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("lang", lang);
  document.documentElement.setAttribute("data-lang", lang);
}

interface ThemeLanguageProviderProps {
  children: ReactNode;
  initialTheme?: ThemeMode;
  initialLanguage?: LanguageCode;
}

export function ThemeLanguageProvider({
  children,
  initialTheme = "light",
  initialLanguage = "vi",
}: ThemeLanguageProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(initialTheme);
  const [language, setLanguage] = useState<LanguageCode>(initialLanguage);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const preferredTheme = getPreferredTheme(initialTheme);
    const preferredLanguage = getPreferredLanguage(initialLanguage);
    setTheme(preferredTheme);
    setLanguage(preferredLanguage);

    setCookie(THEME_STORAGE_KEY, preferredTheme);
    setCookie(LANGUAGE_STORAGE_KEY, preferredLanguage);
    applyLanguageAttribute(preferredLanguage);

    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [initialTheme, initialLanguage]);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window === "undefined") return;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    setCookie(THEME_STORAGE_KEY, theme);
    applyThemeClass(theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    setCookie(LANGUAGE_STORAGE_KEY, language);
    applyLanguageAttribute(language);
  }, [language, mounted]);

  const toggleTheme = () => {
    setIsLoading(true);
    setTimeout(() => {
      setTheme((prev) => {
        const next = prev === "dark" ? "light" : "dark";
        if (typeof window !== "undefined") {
          window.localStorage.setItem(THEME_STORAGE_KEY, next);
          setCookie(THEME_STORAGE_KEY, next);
        }
        return next;
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, 500);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "en" ? "vi" : "en";
      if (typeof window !== "undefined") {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
        setCookie(LANGUAGE_STORAGE_KEY, next);
      }
      return next;
    });
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