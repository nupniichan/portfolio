"use client";

import { useTranslations } from "../../hooks/useTranslations";

export default function EducationWorkPage() {
  const { t } = useTranslations();

  return (
    <div className="flex min-h-screen items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6">
      <div className="w-full max-w-[95%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] xl:max-w-[60%] border border-white/20 floating-container animate-fade-in-up">
        <h1 className="text-lg md:text-xl lg:text-2xl font-extrabold text-white text-stroke mb-2">
          {t('pages.education.title')}
        </h1>
        <p className="text-[11px] md:text-xs text-gray-100 leading-relaxed">
          {t('pages.education.description')}
        </p>
      </div>
    </div>
  );
}

