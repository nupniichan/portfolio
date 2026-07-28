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

  if (isVisible && !shouldRender) {
    setShouldRender(true);
  }

  useEffect(() => {
    if (!isVisible) {
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

      <div className="preloader-decorations absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-[26vh] pointer-events-none">
          <svg viewBox="0 0 1200 240" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="horizonGlowGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#E87A3E" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#F7A859" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#F7A859" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="farHillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7C8353" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#474E29" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="nearHillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60673A" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#33381B" stopOpacity="1" />
              </linearGradient>
            </defs>

            <rect x="0" y="0" width="1200" height="240" fill="url(#horizonGlowGrad)" />

            <path
              d="M 0 240 L 0 140 Q 150 110 320 150 Q 500 190 680 130 Q 860 80 1020 120 Q 1120 140 1200 130 L 1200 240 Z"
              fill="url(#farHillGrad)"
            />

            <path
              d="M 0 240 L 0 180 Q 200 140 400 175 Q 650 210 850 160 Q 1050 120 1200 165 L 1200 240 Z"
              fill="url(#nearHillGrad)"
            />
          </svg>
        </div>

        <div className="absolute top-[18%] left-[15%] w-3 h-3 bg-[#FFF5D6] rounded-full blur-[1px] animate-[floating_6s_ease-in-out_infinite] opacity-90 shadow-[0_0_10px_rgba(255,245,214,0.8)]" />
        <div className="absolute top-[28%] right-[18%] w-3.5 h-3.5 bg-[#FFE8B5] rounded-full blur-[1px] animate-[floating_8s_ease-in-out_infinite_1s] opacity-85 shadow-[0_0_12px_rgba(255,232,181,0.8)]" />
        <div className="absolute top-[45%] left-[22%] w-2.5 h-2.5 bg-[#FFF9E6] rounded-full animate-[floating_7s_ease-in-out_infinite_2s] opacity-95" />
        <div className="absolute top-[58%] right-[25%] w-4 h-4 bg-[#F7D69E] rounded-full blur-[1px] animate-[floating_9s_ease-in-out_infinite_0.5s] opacity-80 shadow-[0_0_14px_rgba(247,214,158,0.8)]" />
        <div className="absolute top-[22%] left-[48%] w-2 h-2 bg-[#FFFFFF] rounded-full animate-pulse opacity-90" />
        <div className="absolute top-[65%] left-[18%] w-3 h-3 bg-[#D8CCA8] rounded-full blur-[1px] animate-[floating_10s_ease-in-out_infinite_3s] opacity-85" />
        <div className="absolute top-[38%] right-[10%] w-2.5 h-2.5 bg-[#FFE8B5] rounded-full blur-[1px] animate-[floating_7.5s_ease-in-out_infinite_1.8s] opacity-85" />
        <div className="absolute top-[15%] left-[32%] w-2 h-2 bg-[#FFF5D6] rounded-full animate-[floating_8.5s_ease-in-out_infinite_2.5s] opacity-90" />

        <div className="absolute inset-0 pointer-events-none flex justify-between items-end pb-[5%]">
          <div className="w-80 h-32 bg-[#D8CCA8]/25 rounded-full blur-[60px] -translate-x-16" />
          <div className="w-96 h-40 bg-[#7C8353]/20 rounded-full blur-[70px] translate-x-20" />
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

        <p className="preloader-text text-lg tracking-wider animate-pulse" />
      </div>
    </div>
  );
}