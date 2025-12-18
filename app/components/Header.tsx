"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeLanguage } from "./ThemeLanguageProvider";
import { NAV_ITEMS, getNavLabels } from "../config/navigation";
import { useTranslations } from "../hooks/useTranslations";

export default function Header() {
  const pathname = usePathname();
  const { theme, language, toggleTheme, toggleLanguage } = useThemeLanguage();
  const { t } = useTranslations();
  const navLabels = getNavLabels(language);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-30 flex justify-center">
      <header
        className="pointer-events-auto mt-1.5 w-[95%] max-w-2xl rounded-full border px-2 py-1 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.45)] transition-all duration-300 animate-header-slide flex items-center justify-between gap-2"
      >
        <nav className="flex items-center gap-0.5 text-[10px] sm:text-[11px]">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-1.5 py-0.5 font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-gray-200/80 hover:text-white"
                }`}
              >
                <span>{navLabels[item.key]}</span>
                <span
                  className={`pointer-events-none absolute inset-x-0.5 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 transition-all duration-200 origin-center ${
                    isActive
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 text-[8px] sm:text-[10px]">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-0.5 rounded-full border border-white/20 bg-white/10 px-1 py-0.5 text-gray-100 transition-all duration-200 hover:bg-white/20 hover:border-white/40"
          >
            <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.15em]">
              {t(`header.theme.${theme}`)}
            </span>
          </button>

          <div className="inline-flex items-center gap-0.5 rounded-full border border-white/20 bg-white/10 p-0.5 text-gray-100 text-[7px] sm:text-[8px] font-semibold">
            <button
              type="button"
              onClick={() => language === "vi" && toggleLanguage()}
              className={`rounded-full px-1 py-0.5 transition-all duration-150 ${
                language === "en"
                  ? "bg-white text-black"
                  : "text-gray-100 hover:bg-white/10"
              }`}
            >
              {t('header.language.en')}
            </button>
            <button
              type="button"
              onClick={() => language === "en" && toggleLanguage()}
              className={`rounded-full px-1 py-0.5 transition-all duration-150 ${
                language === "vi"
                  ? "bg-white text-black"
                  : "text-gray-100 hover:bg-white/10"
              }`}
            >
              {t('header.language.vi')}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
