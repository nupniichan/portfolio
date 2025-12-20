"use client";

import Image from "next/image";
import { useTranslations } from "../hooks/useTranslations";
import MetadataUpdater from "../components/MetadataUpdater";
import { Code, Music, Tv, Gamepad2 } from "lucide-react";

export default function AboutMePage() {
  const { t } = useTranslations();

  const interests = [
    { key: "programming", icon: <Code size={14} className="text-[#CCCCFF]" /> },
    { key: "music", icon: <Music size={14} className="text-[#CCCCFF]" /> },
    { key: "anime", icon: <Tv size={14} className="text-[#CCCCFF]" /> },
    { key: "gaming", icon: <Gamepad2 size={14} className="text-[#CCCCFF]" /> },
  ];

  return (
    <>
      <MetadataUpdater pageKey="about" />
      <div className="flex min-h-screen items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6">
        <div className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[75%] xl:max-w-[70%] 2xl:max-w-[1100px] relative">
          <div className="floating-container animate-fade-in-up relative">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#CCCCFF]/30 -translate-x-2 -translate-y-2"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#CCCCFF]/30 translate-x-2 translate-y-2"></div>

            <div className="about-section p-2 md:p-4 lg:p-6">
              <div 
                className="about-header mb-6 relative border-b border-white/10 pb-4"
                data-aos="fade-down"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white text-stroke">
                    {t('pages.about.header')} <span className="animate-kaomoji ml-2 inline-block">{t('pages.about.headerEmoji')}</span>
                  </h1>
                  
                  <div className="hidden md:flex items-center gap-4 select-none pointer-events-none">
                    <div className="flex gap-1.5">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-1 h-1 bg-[#CCCCFF]/30 rotate-45"
                          style={{ animation: `pulse 2s infinite ${i * 0.2}s` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="about-content grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
                <div className="lg:col-span-4 flex flex-col gap-4">
                  <div 
                    className="relative profile-card bg-white/5 rounded-none p-5 text-center border border-white/10 group" 
                    data-aos="fade-right"
                    data-aos-delay="100"
                  >
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#CCCCFF]/40"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#CCCCFF]/40"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#CCCCFF]/40"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#CCCCFF]/40"></div>

                    <div className="flex justify-center mb-6 relative">
                      <div className="relative w-32 h-32 md:w-36 md:h-36 flex items-center justify-center group">
                        <div className="absolute inset-0 rounded-full border border-dashed border-[#CCCCFF]/30 animate-[spin_20s_linear_infinite]"></div>
                        
                        <div className="absolute inset-2 rounded-full border-t border-b border-[#CCCCFF]/60 animate-[spin_8s_linear_infinite]"></div>
                        
                        <div className="absolute inset-4 rounded-full bg-[#CCCCFF]/10 blur-xl animate-pulse"></div>
                        
                        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden p-1 border border-white/10 bg-[#CCCCFF] z-10 flex items-center justify-center">
                          <Image
                            src="/Images/Avatar/avatar2.png"
                            alt="Profile Picture"
                            fill
                            className="rounded-full object-cover p-1"
                            priority
                          />
                        </div>

                        <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#CCCCFF] rotate-45 shadow-[0_0_10px_#CCCCFF]"></div>
                        </div>

                        <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#CCCCFF] rounded-sm rotate-12 flex items-center justify-center shadow-lg z-20">
                          <span className="text-[8px] text-[#05050a] font-black uppercase">NUP</span>
                        </div>
                      </div>
                    </div>
                    
                    <h2 className="text-lg md:text-xl font-bold text-white mb-1">
                      {t('pages.about.profileName')}
                    </h2>
                    <p className="text-xs md:text-sm font-medium tracking-widest text-[#CCCCFF]/80 italic">
                      {t('pages.about.profileTitle')}
                    </p>
                  </div>

                  <div 
                    className="bg-white/5 border border-white/10 p-4" 
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1.5 h-1.5 bg-[#CCCCFF] rotate-45"></div>
                      <h3 className="text-xs font-bold text-white tracking-widest uppercase">
                        {t('pages.about.interestsTitle')}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {interests.map((interest, index) => (
                        <div
                          key={interest.key}
                          className="flex items-center gap-2 p-2 bg-white/5 border border-white/5 transition-all duration-300 hover:border-[#CCCCFF]/30 hover:bg-white/10 group"
                          data-aos="zoom-in"
                          data-aos-delay={400 + (index * 100)}
                        >
                          <span className="text-sm group-hover:scale-110 transition-transform">{interest.icon}</span>
                          <span className="text-[11px] md:text-xs text-gray-300 uppercase tracking-tight leading-tight font-medium">
                            {t(`pages.about.interests.${interest.key}`)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <div 
                    className="relative h-full info-card bg-white/5 p-5 md:p-8 border border-white/10" 
                    data-aos="fade-left"
                    data-aos-delay="200"
                  >
                    <div className="absolute top-0 right-0 w-8 h-8 opacity-10">
                      <div className="absolute top-0 right-0 w-full h-px bg-white"></div>
                      <div className="absolute top-0 right-0 w-px h-full bg-white"></div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-4">
                      <span className="w-8 h-px bg-[#CCCCFF]"></span>
                      {t('pages.about.introTitle')}
                    </h3>
                    
                    <div className="space-y-6">
                      {[1, 2, 3, 4].map((num) => (
                        <div key={num} className="relative pl-6 group">
                          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 group-hover:bg-[#CCCCFF]/40 transition-colors"></div>
                          <p className="text-gray-200 text-xs md:text-sm lg:text-[15px] leading-relaxed text-justify opacity-90 group-hover:opacity-100 transition-opacity">
                            {t(`pages.about.intro${num}` as any)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-12 flex justify-end items-center gap-2 opacity-30">
                      <div className="w-12 h-px bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

