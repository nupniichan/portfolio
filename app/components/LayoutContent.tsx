"use client";

import { useThemeLanguage } from "./ThemeLanguageProvider";
import Background from "./Background";
import Header from "./Header";
import ClientAudioPlayer from "./ClientAudioPlayer";
import LoadingOverlay from "./LoadingOverlay";
import AOSInit from "./AOSInit";
import ScrollToTop from "./ScrollToTop";

interface LayoutContentProps {
  children: React.ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const { mounted, isLoading } = useThemeLanguage();

  return (
    <div className="relative flex-1 overflow-hidden">
      <AOSInit />
      <LoadingOverlay isVisible={isLoading} />

      {mounted && (
        <Background isLoading={isLoading} />
      )}

      <Header />

      <main className="relative z-10 flex-1 flex flex-col justify-center">
        {children}
      </main>

      <ScrollToTop />
      <ClientAudioPlayer />
    </div>
  );
}