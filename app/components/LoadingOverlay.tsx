"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "../hooks/useTranslations";

interface LoadingOverlayProps {
  isVisible: boolean;
}

export default function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  const { t } = useTranslations();
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0a0a0a] transition-all duration-500 ease-in-out ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-3">
          <div 
            className="w-3 h-3 rounded-full bg-white animate-dot-bounce" 
            style={{ animationDelay: "0s" }}
          ></div>
          <div 
            className="w-3 h-3 rounded-full bg-white animate-dot-bounce" 
            style={{ animationDelay: "0.15s" }}
          ></div>
          <div 
            className="w-3 h-3 rounded-full bg-white animate-dot-bounce" 
            style={{ animationDelay: "0.3s" }}
          ></div>
        </div>
        
        <p className="text-white/80 text-lg font-medium tracking-wider animate-pulse">
          {t("loading")}
        </p>
      </div>
    </div>
  );
}
