"use client";

import { useMemo, useState } from "react";
import { useThemeLanguage } from "./ThemeLanguageProvider";
import ParticlesBackground from "./ParticlesBackground";
import Header from "./Header";
import ClientAudioPlayer from "./ClientAudioPlayer";
import LoadingOverlay from "./LoadingOverlay";
import AOSInit from "./AOSInit";
import ScrollToTop from "./ScrollToTop";
import { withBasePath } from "../utils/paths";

interface LayoutContentProps {
  children: React.ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const { theme, mounted, isLoading } = useThemeLanguage();
  const baseVideoSrc = useMemo(
    () => withBasePath("/Images/Background/background.webm"),
    []
  );
  const [videoSrc, setVideoSrc] = useState(baseVideoSrc);
  const [hasRetriedVideo, setHasRetriedVideo] = useState(false);

  return (
    <div className="relative flex-1 overflow-hidden">
      <AOSInit />
      <LoadingOverlay isVisible={isLoading} />
      
      {mounted && theme === "light" && (
        <>
          <video
            className="background-video absolute inset-0 h-full w-full object-cover z-0"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            onError={() => {
              if (!hasRetriedVideo) {
                setHasRetriedVideo(true);
                setVideoSrc(`${baseVideoSrc}?cb=${Date.now()}`);
              }
            }}
          />
          {hasRetriedVideo && videoSrc.includes("?cb=") && (
            <div className="absolute inset-0 z-[-1] bg-slate-100" />
          )}
        </>
      )}

      {mounted && theme === "dark" && (
        <ParticlesBackground theme={theme} />
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