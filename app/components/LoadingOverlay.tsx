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
      const frameId = requestAnimationFrame(() => {
        document.documentElement.setAttribute('data-transitions-ready', '');
      });
      return () => {
        cancelAnimationFrame(frameId);
        document.documentElement.removeAttribute('data-transitions-ready');
      };
    }
  }, [mounted]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] overflow-hidden flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
        isVisible ? "opacity-100 scale-100 visible" : "opacity-0 scale-105 invisible pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-[#3b2e7e] pointer-events-none" />

      <div className="preloader-bg-light absolute inset-0 bg-gradient-to-b from-[#3b2e7e] via-[#3d50b8] via-50% to-[#2c3f96] pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-[#ba68ff]/20 blur-3xl pointer-events-none transform-gpu" />
        <div className="absolute top-[15%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-[#71f3f9]/25 blur-3xl pointer-events-none transform-gpu" />
      </div>
      <div className="preloader-stars absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[20%] w-1 h-1 bg-white rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-[25%] left-[80%] w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-50" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-[50%] left-[15%] w-1 h-1 bg-white rounded-full animate-pulse opacity-80" style={{ animationDuration: '2s' }}></div>
        <div className="absolute top-[10%] left-[60%] w-2 h-2 bg-white/80 rounded-full blur-[1px] animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-[40%] left-[85%] w-1 h-1 bg-white rounded-full animate-pulse opacity-60" style={{ animationDuration: '2.5s' }}></div>
      </div>

      <div className="preloader-rays absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-[200%] h-24 bg-white/10 rotate-45 absolute blur-xl transform origin-center animate-[spin_20s_linear_infinite] transform-gpu"></div>
        <div className="w-[200%] h-24 bg-white/10 -rotate-45 absolute blur-xl transform origin-center animate-[spin_20s_linear_infinite] transform-gpu"></div>
      </div>

      <div className="preloader-light-elements absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[12%] left-[-10%] w-[60vw] h-[30vh] bg-gradient-to-r from-[#ba68ff]/0 via-[#ba68ff]/20 to-[#71f3f9]/0 rounded-full blur-3xl transform -rotate-12 animate-[floating_10s_ease-in-out_infinite]" />
        <div className="absolute top-[35%] right-[-10%] w-[55vw] h-[25vh] bg-gradient-to-r from-[#71f3f9]/0 via-[#71f3f9]/25 to-[#ba68ff]/0 rounded-full blur-3xl transform rotate-12 animate-[floating_12s_ease-in-out_infinite_2s]" />

        <div className="absolute top-[18%] left-[15%] w-3 h-3 bg-cyan-200 rounded-full blur-[1px] animate-pulse" style={{ animationDuration: '2.5s' }} />
        <div className="absolute top-[28%] right-[22%] w-4 h-4 bg-purple-200 rounded-full blur-[1px] animate-pulse" style={{ animationDuration: '3.5s' }} />
        <div className="absolute top-[45%] left-[25%] w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDuration: '2s' }} />
        <div className="absolute top-[60%] right-[30%] w-3 h-3 bg-cyan-300/80 rounded-full blur-[1px] animate-pulse" style={{ animationDuration: '4s' }} />

        <div className="absolute top-[22%] right-[18%] opacity-75 animate-[floating_7s_ease-in-out_infinite]">
          <svg className="w-6 h-6 text-[#71f3f9] fill-current drop-shadow-[0_0_8px_rgba(113,243,249,0.8)]" viewBox="0 0 24 24">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>
        <div className="absolute top-[52%] left-[12%] opacity-65 animate-[floating_9s_ease-in-out_infinite_1.5s] scale-75">
          <svg className="w-6 h-6 text-[#ba68ff] fill-current drop-shadow-[0_0_8px_rgba(186,104,255,0.8)]" viewBox="0 0 24 24">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>
        <div className="absolute top-[70%] right-[15%] opacity-70 animate-[floating_8s_ease-in-out_infinite_3s] scale-90">
          <svg className="w-5 h-5 text-white fill-current drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]" viewBox="0 0 24 24">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>
      </div>

      <div className="preloader-clouds absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-48 h-12 bg-[#FFEAD8]/85 rounded-full blur-[1px] animate-[floating_8s_ease-in-out_infinite] shadow-[0_4px_20px_rgba(255,160,110,0.25)]">
          <div className="absolute -top-6 left-8 w-20 h-20 bg-[#FFEAD8]/90 rounded-full"></div>
          <div className="absolute -top-8 left-20 w-24 h-24 bg-[#FFF0E0]/95 rounded-full"></div>
        </div>
        
        <div className="absolute top-[20%] right-[15%] w-40 h-10 bg-[#FFDCC4]/85 rounded-full blur-[1px] animate-[floating_6s_ease-in-out_infinite_1s] shadow-[0_4px_20px_rgba(255,160,110,0.25)]">
          <div className="absolute -top-5 left-6 w-16 h-16 bg-[#FFDCC4]/90 rounded-full"></div>
          <div className="absolute -top-10 left-16 w-20 h-20 bg-[#FFEAD8]/95 rounded-full"></div>
          <div className="absolute -top-3 left-32 w-12 h-12 bg-[#FFDCC4]/85 rounded-full"></div>
        </div>

        <div className="absolute top-[65%] left-[5%] w-60 h-14 bg-[#F2C2D4]/80 rounded-full blur-[1px] animate-[floating_9s_ease-in-out_infinite_2s] shadow-[0_4px_20px_rgba(200,120,160,0.2)] scale-90">
          <div className="absolute -top-6 left-8 w-16 h-16 bg-[#F2C2D4]/85 rounded-full"></div>
          <div className="absolute -top-12 left-20 w-28 h-28 bg-[#FFEAD8]/90 rounded-full"></div>
          <div className="absolute -top-8 left-40 w-20 h-20 bg-[#F2C2D4]/80 rounded-full"></div>
        </div>

        <div className="absolute top-[50%] right-[5%] w-32 h-10 bg-[#FFD8C0]/80 rounded-full blur-[1px] animate-[floating_7s_ease-in-out_infinite_3s] shadow-[0_4px_20px_rgba(255,160,110,0.2)]">
          <div className="absolute -top-5 left-4 w-16 h-16 bg-[#FFD8C0]/85 rounded-full"></div>
          <div className="absolute -top-4 left-16 w-12 h-12 bg-[#FFD8C0]/80 rounded-full"></div>
        </div>

        <div className="absolute inset-0 pointer-events-none flex justify-between items-end pb-[10%]">
          <div className="w-64 h-24 bg-[#FFA870]/30 rounded-full blur-[40px] shadow-[0_0_50px_rgba(255,168,112,0.3)] -translate-x-12 mb-10"></div>
          <div className="w-80 h-32 bg-[#E87A3E]/30 rounded-full blur-[50px] shadow-[0_0_60px_rgba(232,122,62,0.3)] translate-x-20"></div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="preloader-sun absolute">
            <div className="preloader-sun-core w-12 h-12 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,1)] animate-[bounce_3s_ease-in-out_infinite]">
              <div className="preloader-sun-aura absolute inset-0 rounded-full bg-[#fff5b8]/50 blur-[2px]"></div>
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