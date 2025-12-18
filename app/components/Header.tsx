"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeLanguage } from "./ThemeLanguageProvider";
import { NAV_ITEMS, NAV_LABELS } from "../config/navigation";

export default function Header() {
  const pathname = usePathname();
  const { theme, language, toggleTheme, toggleLanguage } = useThemeLanguage();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-30 flex justify-center">
      <header
        className="pointer-events-auto mt-3 w-[95%] max-w-5xl rounded-full border px-4 py-2 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.45)] transition-all duration-300 animate-header-slide flex items-center justify-between gap-4"
      >
        <nav className="flex items-center gap-1 text-sm sm:text-base">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-3 py-1 font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-gray-200/80 hover:text-white"
                }`}
              >
                <span>{NAV_LABELS[language][item.key]}</span>
                <span
                  className={`pointer-events-none absolute inset-x-1 bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 transition-all duration-200 origin-center ${
                    isActive
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-gray-100 transition-all duration-200 hover:bg-white/20 hover:border-white/40"
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em]">
              {theme === "dark" ? "Dark" : "Light"}
            </span>
          </button>

          <div className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 p-0.5 text-gray-100 text-[10px] sm:text-xs font-semibold">
            <button
              type="button"
              onClick={() => language === "vi" && toggleLanguage()}
              className={`rounded-full px-2 py-0.5 transition-all duration-150 ${
                language === "en"
                  ? "bg-white text-black"
                  : "text-gray-100 hover:bg-white/10"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => language === "en" && toggleLanguage()}
              className={`rounded-full px-2 py-0.5 transition-all duration-150 ${
                language === "vi"
                  ? "bg-white text-black"
                  : "text-gray-100 hover:bg-white/10"
              }`}
            >
              VI
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
