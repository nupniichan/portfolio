"use client";

import { useEffect, useRef } from "react";
import { useThemeLanguage } from "./ThemeLanguageProvider";
import { useTranslations } from "../hooks/useTranslations";

interface MetadataUpdaterProps {
  pageKey: "home" | "about" | "skills" | "projects" | "journey" | "contact";
}

export default function MetadataUpdater({ pageKey }: MetadataUpdaterProps) {
  const { language, mounted } = useThemeLanguage();
  const { t } = useTranslations();
  const prevValuesRef = useRef<{ pageKey: string; language: string; title: string; description: string } | null>(null);

  useEffect(() => {
    if (!mounted) return;

    const metaTitleKey = pageKey === "home" 
      ? "pages.home.title" 
      : `pages.${pageKey}.metaTitle`;
    const descriptionKey = `pages.${pageKey}.description`;

    const title = t(metaTitleKey);
    const description = t(descriptionKey);

    const prevValues = prevValuesRef.current;
    if (prevValues && 
        prevValues.pageKey === pageKey && 
        prevValues.language === language &&
        prevValues.title === title && 
        prevValues.description === description) {
      return;
    }

    prevValuesRef.current = { pageKey, language, title, description };

    if (document.title !== title) {
      document.title = title;
    }

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    if (metaDescription.getAttribute("content") !== description) {
      metaDescription.setAttribute("content", description);
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    if (ogTitle.getAttribute("content") !== title) {
      ogTitle.setAttribute("content", title);
    }

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement("meta");
      ogDescription.setAttribute("property", "og:description");
      document.head.appendChild(ogDescription);
    }
    if (ogDescription.getAttribute("content") !== description) {
      ogDescription.setAttribute("content", description);
    }

    const currentLang = document.documentElement.getAttribute("lang");
    if (currentLang !== language) {
      document.documentElement.setAttribute("lang", language);
    }
  }, [language, mounted, pageKey, t]);

  return null;
}