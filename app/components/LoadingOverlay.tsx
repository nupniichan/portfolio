"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "../hooks/useTranslations";
import { useThemeLanguage } from "./ThemeLanguageProvider";

interface LoadingOverlayProps {
  isVisible: boolean;
}

export default function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  const { t } = useTranslations();
  const { mounted } = useThemeLanguage();
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    if (mounted) {
      const id = requestAnimationFrame(() => {
        document.documentElement.setAttribute('data-transitions-ready', '');
      });
      return () => {
        cancelAnimationFrame(id);
        document.documentElement.removeAttribute('data-transitions-ready');
      };
    }
  }, [mounted]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] overflow-hidden flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isVisible ? "opacity-100 scale-100 visible" : "opacity-0 scale-105 invisible pointer-events-none"
        }`}
    >
      <div className="absolute inset-0 bg-[#b3bdf2] pointer-events-none" />

      <div className="preloader-bg-light absolute inset-0 bg-gradient-to-b from-[#a1b0ff] via-[#b3bdf2] to-[#e0d6ff] pointer-events-none" />
      <div className="preloader-bg-dark absolute inset-0 bg-gradient-to-b from-[#0a0a14] via-[#1a1a2e] to-[#4b4b7c] pointer-events-none" />
      <div className="preloader-stars absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[20%] w-1 h-1 bg-white rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-[25%] left-[80%] w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-50" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-[50%] left-[15%] w-1 h-1 bg-white rounded-full animate-pulse opacity-80" style={{ animationDuration: '2s' }}></div>
        <div className="absolute top-[10%] left-[60%] w-2 h-2 bg-white/80 rounded-full blur-[1px] animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-[40%] left-[85%] w-1 h-1 bg-white rounded-full animate-pulse opacity-60" style={{ animationDuration: '2.5s' }}></div>
      </div>

      <div className="preloader-rays absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-overlay">
        <div className="w-[200%] h-24 bg-white/15 rotate-45 absolute blur-2xl transform origin-center animate-[spin_20s_linear_infinite]"></div>
        <div className="w-[200%] h-24 bg-white/15 -rotate-45 absolute blur-2xl transform origin-center animate-[spin_20s_linear_infinite]"></div>
      </div>

      <div className="preloader-clouds absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-48 h-12 bg-white/95 rounded-full blur-[2px] animate-[floating_8s_ease-in-out_infinite] shadow-sm">
          <div className="absolute -top-6 left-8 w-20 h-20 bg-white/95 rounded-full"></div>
          <div className="absolute -top-8 left-20 w-24 h-24 bg-white/95 rounded-full"></div>
        </div>

        <div className="absolute top-[20%] right-[15%] w-40 h-10 bg-white/95 rounded-full blur-[2px] animate-[floating_6s_ease-in-out_infinite_1s] shadow-sm">
          <div className="absolute -top-5 left-6 w-16 h-16 bg-white/95 rounded-full"></div>
          <div className="absolute -top-10 left-16 w-20 h-20 bg-white/95 rounded-full"></div>
          <div className="absolute -top-3 left-32 w-12 h-12 bg-white/95 rounded-full"></div>
        </div>

        <div className="absolute top-[65%] left-[5%] w-60 h-14 bg-white/95 rounded-full blur-[2px] animate-[floating_9s_ease-in-out_infinite_2s] shadow-sm scale-90">
          <div className="absolute -top-6 left-8 w-16 h-16 bg-white/95 rounded-full"></div>
          <div className="absolute -top-12 left-20 w-28 h-28 bg-white/95 rounded-full"></div>
          <div className="absolute -top-8 left-40 w-20 h-20 bg-white/95 rounded-full"></div>
        </div>

        <div className="absolute top-[50%] right-[5%] w-32 h-10 bg-white/95 rounded-full blur-[2px] animate-[floating_7s_ease-in-out_infinite_3s] shadow-sm">
          <div className="absolute -top-5 left-4 w-16 h-16 bg-white/95 rounded-full"></div>
          <div className="absolute -top-4 left-16 w-12 h-12 bg-white/95 rounded-full"></div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none flex justify-between items-end pb-[20%]">
        <div className="preloader-glow-1 w-64 h-24 bg-white rounded-full -translate-x-12 mb-10"></div>
        <div className="preloader-glow-2 w-80 h-32 bg-white rounded-full translate-x-20"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="preloader-sun absolute">
            <div className="w-12 h-12 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,1)] animate-[bounce_3s_ease-in-out_infinite]">
              <div className="absolute inset-0 rounded-full bg-[#fff5b8]/50 blur-[2px]"></div>
            </div>
          </div>

          <div className="preloader-moon absolute">
            <div className="w-14 h-14 rounded-full shadow-[inset_-6px_-6px_0_0_rgba(255,255,255,0.9)]"></div>
          </div>
        </div>

        <p className="preloader-text text-lg tracking-wider animate-pulse">
          {t("loading")}
        </p>
      </div>
    </div>
  );
}