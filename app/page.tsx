"use client";

import "./page.css";
import Image from "next/image";
import Typewriter from "./components/Typewriter";
import SocialLinks from "./components/SocialLinks";
import { useTranslations } from "./hooks/useTranslations";
import MetadataUpdater from "./components/MetadataUpdater";
import { withBasePath } from "./utils/paths";
import { useEffect } from "react";
import CardParticles from "./components/CardParticles";

export default function Home() {
  const { t } = useTranslations();
  const avatarPath = withBasePath("/Images/Avatar/ChinoKafuu.png");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = avatarPath;
    link.fetchPriority = "high";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [avatarPath]);

  return (
    <>
      <MetadataUpdater pageKey="home" />
      <div className="flex h-screen items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6 -mt-18 sm:mt-0">
      <div 
        className="w-full max-w-[95%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] xl:max-w-[60%] floating-container max-sm:animate-none relative group overflow-hidden md:mt-4"
        data-aos="fade-up"
      >
        <CardParticles />
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#CCCCFF]/30 -translate-x-2 -translate-y-2 z-10"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#CCCCFF]/30 translate-x-2 translate-y-2 z-10"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#CCCCFF]/40 -translate-x-1 translate-y-1 z-10"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#CCCCFF]/40 translate-x-1 -translate-y-1 z-10"></div>

        <div className="absolute -left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 opacity-20 select-none pointer-events-none">
          <span className="[writing-mode:vertical-rl] text-[10px] tracking-[0.5em] text-white uppercase font-black">PORTFOLIO</span>
          <div className="w-px h-12 bg-linear-to-b from-[#CCCCFF] to-transparent"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center p-2.5 md:p-4 lg:p-6 relative z-10">
          <div className="absolute top-4 right-4 hidden md:flex gap-1.5 select-none opacity-20 group-hover:opacity-40 transition-opacity">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="w-1.5 h-1.5 bg-[#CCCCFF] rotate-45 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-start items-center md:items-start space-y-1 md:space-y-2 order-2 md:order-1 mt-2">
            <div 
              className="text-center md:text-left text-sm md:text-base lg:text-lg font-bold text-white text-stroke flex items-center gap-2"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {t('home.greeting')}
            </div>
            <div 
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Typewriter />
            </div>
            <div 
              className="mt-1.5 md:mt-2"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <p className="text-center md:text-left text-xs md:text-sm lg:text-base font-semibold">
                <span className="bg-linear-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {t('home.connect')}
                </span>
              </p>
            </div>
            <div 
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <SocialLinks />
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center items-center mt-2.5 md:mt-0 order-1 md:order-2">
            <div 
              className="relative avatar-container"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="absolute inset-[-15%] rounded-full border border-dashed border-[#CCCCFF]/30 animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-[-8%] rounded-full border-t border-b border-[#CCCCFF]/60 animate-spin-reverse"></div>
              <div className="absolute inset-0 rounded-full bg-[#CCCCFF]/10 blur-xl animate-pulse"></div>
              
              <Image
                className="rounded-full w-24 h-24 sm:w-40 sm:h-40 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 object-cover transition-all duration-300 relative z-10 border-2 border-white/10"
                src={avatarPath}
                alt="Avatar"
                width={224}
                height={224}
                priority
                fetchPriority="high"
                loading="eager"
              />
            </div>
            
            <span 
              className="text-white text-stroke mt-4 text-[12px] tracking-widest uppercase font-medium"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              @nupniichan
            </span>
            <div 
              className="online-status inline-flex items-center gap-2 rounded-none bg-white/5 border border-white/10 px-2 sm:px-3 py-1 text-[8px] sm:text-[10px] text-white mt-2"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
              <span className="uppercase tracking-[0.2em] text-[8px] text-gray-200 font-bold">
                {t('home.status')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
