"use client";

import { useTranslations } from "../hooks/useTranslations";
import MetadataUpdater from "../components/MetadataUpdater";

export default function ProjectsPage() {
  const { t } = useTranslations();

  return (
    <>
      <MetadataUpdater pageKey="projects" />
      <div className="flex min-h-screen items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6">
      <div 
        className="w-full max-w-[95%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] xl:max-w-[60%] floating-container"
        data-aos="fade-up"
      >
        <h1 className="text-lg md:text-xl lg:text-2xl font-extrabold text-white text-stroke mb-2">
          {t('pages.projects.title')}
        </h1>
        <p className="text-[11px] md:text-xs text-gray-100 leading-relaxed">
          {t('pages.projects.description')}
        </p>
      </div>
    </div>
    </>
  );
}

