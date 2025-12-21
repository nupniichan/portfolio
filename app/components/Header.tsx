"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeLanguage } from "./ThemeLanguageProvider";
import { NAV_ITEMS, getNavLabels } from "../config/navigation";
import { useTranslations } from "../hooks/useTranslations";
import { Home, User, Code, FolderKanban, GraduationCap, Mail, Sun, Moon, Globe } from "lucide-react";

const navIcons = {
  home: Home,
  about: User,
  skills: Code,
  projects: FolderKanban,
  journey: GraduationCap,
  contact: Mail,
};

export default function Header() {
  const pathname = usePathname();
  const { theme, language, toggleTheme, toggleLanguage } = useThemeLanguage();
  const { t } = useTranslations();
  const navLabels = getNavLabels(language);

  return (
    <>
      <div className="pointer-events-none fixed left-0 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <header className="pointer-events-auto ml-3 rounded-full border px-2 py-2 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.45)] transition-all duration-300 animate-header-slide">
          <div className="flex flex-col items-center gap-2">
            <nav className="flex flex-col items-center gap-1.5 relative">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                const Icon = navIcons[item.key as keyof typeof navIcons];

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 z-10 ${
                      isActive
                        ? "text-white scale-105"
                        : "text-gray-200/80 hover:text-white hover:scale-110"
                    }`}
                    title={navLabels[item.key as keyof typeof navLabels]}
                  >
                    <Icon size={20} className={`transition-all duration-300 ${isActive ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : ""}`} />
                  </Link>
                );
              })}
              <div
                className="absolute inset-x-0 rounded-full bg-linear-to-br from-orange-400/10 to-[#CCCCFF]/10 border border-[#CCCCFF]/20 shadow-[0_0_10px_rgba(251,146,60,0.1)] transition-all duration-300 ease-out -z-10"
                style={{
                  height: '2.5rem',
                  top: `${NAV_ITEMS.findIndex(item => item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) * 2.875}rem`,
                  opacity: NAV_ITEMS.findIndex(item => item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) !== -1 ? 1 : 0
                }}
              />
            </nav>

            <div className="flex flex-col items-center gap-1.5 pt-1 border-t border-white/10">
              <button
                type="button"
                onClick={toggleTheme}
                className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 text-gray-200/80 hover:text-white hover:bg-white/5"
                title={t(`header.theme.${theme}`)}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                type="button"
                onClick={toggleLanguage}
                className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 text-gray-200/80 hover:text-white hover:bg-white/5"
                title={language === "en" ? "English" : "Tiếng Việt"}
              >
                <Globe size={18} />
                <span className="absolute -bottom-0.5 text-[6px] font-semibold">
                  {language.toUpperCase()}
                </span>
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className="pointer-events-none fixed top-0 left-0 right-0 z-50 flex justify-center px-2 pt-4 md:hidden">
        <header className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1.5 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 animate-header-slide hover:bg-black/50 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          <nav className="flex items-center gap-1 relative">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              const Icon = navIcons[item.key as keyof typeof navIcons];

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 z-10 active:scale-90 ${
                    isActive
                      ? "text-white scale-105"
                      : "text-gray-400 hover:text-white hover:scale-110 hover:-translate-y-0.5"
                  }`}
                  title={navLabels[item.key as keyof typeof navLabels]}
                >
                  <Icon size={16} className={`transition-all duration-300 ${isActive ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : ""}`} />
                </Link>
              );
            })}
             <div
              className="absolute inset-y-0 rounded-full bg-linear-to-r from-orange-400/10 to-[#CCCCFF]/10 border border-[#CCCCFF]/20 shadow-[0_0_10px_rgba(251,146,60,0.1)] transition-all duration-300 ease-out -z-10"
              style={{
                width: '2rem',
                left: `${NAV_ITEMS.findIndex(item => item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) * 2.25}rem`,
                opacity: NAV_ITEMS.findIndex(item => item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) !== -1 ? 1 : 0
              }}
            />
          </nav>

          <div className="h-4 w-px bg-white/10" />

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={toggleTheme}
              className="relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 text-gray-400 hover:text-white hover:bg-white/5 hover:scale-110 hover:-translate-y-0.5 active:scale-90"
              title={t(`header.theme.${theme}`)}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              type="button"
              onClick={toggleLanguage}
              className="relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 text-gray-400 hover:text-white hover:bg-white/5 hover:scale-110 hover:-translate-y-0.5 active:scale-90"
              title={language === "en" ? "English" : "Tiếng Việt"}
            >
              <Globe size={16} />
              <span className="absolute -bottom-0.5 text-[6px] font-bold">
                {language.toUpperCase()}
              </span>
            </button>
          </div>
        </header>
      </div>
    </>
  );
}
