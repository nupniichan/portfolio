"use client";

import { useTranslations } from "../hooks/useTranslations";
import MetadataUpdater from "../components/MetadataUpdater";
import { useEffect, useRef, useState } from "react";
import CardParticles from "../components/CardParticles";
import { withBasePath } from "../utils/paths";
import Image from "next/image";
import {
  GraduationCap,
  Briefcase,
  School,
  Trophy,
  Award,
  Calendar,
  Building2,
  Cpu,
  Star,
  Sparkles,
  Code
} from "lucide-react";

export default function EducationWorkPage() {
  const { t } = useTranslations();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          if (timelineRef.current) {
            const rect = timelineRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const startPoint = windowHeight * 0.8;
            const currentPos = startPoint - rect.top;
            let progress = currentPos / rect.height;
            progress = Math.min(1, Math.max(0, progress));
            setLineProgress(progress);
          }
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const timelineItems = [
    {
      key: "work",
      icon: <Briefcase className="text-[#CCCCFF]" size={20} />,
      type: "work",
      logo: withBasePath("/Images/Logos/SchneiderElectric.webp"),
      logoFallback: "SE",
      skills: ["ASP.NET MVC", "C#", "SQL Server", "JavaScript", "HTML", "CSS", "REST API"]
    },
    {
      key: "university",
      icon: <GraduationCap className="text-[#CCCCFF]" size={20} />,
      type: "education",
      logo: withBasePath("/Images/Logos/Huflit.webp"),
      logoFallback: "HUFLIT"
    },
    {
      key: "highschool",
      icon: <School className="text-[#CCCCFF]" size={20} />,
      type: "education",
      logo: withBasePath("/Images/Logos/NTT.webp"),
      logoFallback: "NTT"
    }
  ];

  const certifications = [
    { key: "devops", icon: <Cpu size={16} /> },
    { key: "csharp", icon: <Award size={16} /> },
    { key: "problem_solving", icon: <Star size={16} /> },
    { key: "SAAC03", icon: <Sparkles size={16} /> },
    { key: "leetcode", icon: <Code size={16} /> }
  ];

  const futureLearning = [
    { key: "ai", icon: <Cpu size={16} /> },
    { key: "cloud", icon: <Sparkles size={16} /> },
    { key: "system", icon: <Building2 size={16} /> }
  ];

  return (
    <>
      <MetadataUpdater pageKey="journey" />
      <div className="flex min-h-screen items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-16 w-32 h-32 bg-[#CCCCFF]/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '5s' }}></div>
          <div className="absolute bottom-32 right-20 w-28 h-28 bg-[#CCCCFF]/6 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-[#CCCCFF]/4 rounded-full blur-lg animate-pulse" style={{ animationDelay: '3.5s', animationDuration: '4s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-[#CCCCFF]/15 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-[#CCCCFF]/8 rotate-12 animate-spin-reverse" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
          <div className="absolute top-1/4 left-1/2 w-22 h-22 bg-linear-to-br from-[#CCCCFF]/8 to-transparent rounded-full blur-md animate-floating"></div>
          <div className="absolute bottom-1/3 right-1/3 w-30 h-30 bg-linear-to-tl from-[#CCCCFF]/6 to-transparent rounded-full blur-lg" style={{ animation: 'floating 8s ease-in-out infinite', animationDelay: '1.5s' }}></div>
        </div>

        <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[75%] relative py-8 z-10">
          <div className="floating-container animate-fade-in-up relative overflow-hidden">
            <CardParticles />
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#CCCCFF]/30 -translate-x-2 -translate-y-2 z-10"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#CCCCFF]/30 translate-x-2 translate-y-2 z-10"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#CCCCFF]/40 -translate-x-1 translate-y-1 z-10"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#CCCCFF]/40 translate-x-1 -translate-y-1 z-10"></div>
            <div className="absolute top-1/2 left-0 w-1 h-28 bg-linear-to-b from-transparent via-[#CCCCFF]/20 to-transparent -translate-x-4 z-10"></div>
            <div className="absolute top-1/2 right-0 w-1 h-28 bg-linear-to-b from-transparent via-[#CCCCFF]/20 to-transparent translate-x-4 z-10"></div>

            <div className="p-3 sm:p-5 md:p-6 lg:p-8 relative z-10">
              <div
                className="mb-8 relative border-b border-white/10 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                data-aos="fade-down"
              >
                <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white text-stroke flex items-center gap-1 sm:gap-3 whitespace-nowrap">
                  <GraduationCap className="text-[#CCCCFF] animate-pulse w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  {t('pages.journey.header')}
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-6 md:space-y-8">
                  <h3 className="text-sm sm:text-base font-bold text-white mb-4 md:mb-6 flex items-center gap-2 sm:gap-4" data-aos="fade-right">
                    <span className="w-6 sm:w-8 h-px bg-[#CCCCFF]"></span>
                    {t('pages.journey.timelineTitle')}
                  </h3>

                  <div
                    ref={timelineRef}
                    className="relative ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8 md:space-y-12"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#CCCCFF]/10 rounded"></div>

                    <div
                      className="absolute left-0 top-0 w-[2px] z-0 transition-transform duration-150 ease-out rounded"
                      style={{
                        transform: `scaleY(${lineProgress})`,
                        transformOrigin: '50% 0% 0px',
                        height: '100%',
                        background: 'linear-gradient(to bottom, #CCCCFF, #CCCCFF80, transparent)'
                      }}
                    ></div>

                    {timelineItems.map((item, index) => (
                      <div
                        key={item.key}
                        className="relative"
                        data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
                        data-aos-delay={index * 100}
                      >
                        <div
                          className="absolute timeline-icon top-0 w-7 h-7 sm:w-8 sm:h-8 bg-[#05050a] border border-[#CCCCFF]/40 rounded-full flex items-center justify-center z-10 shadow-[0_0_10px_#CCCCFF33] transition-all duration-500"
                          style={{
                            borderColor: lineProgress > (index / (timelineItems.length - 0.5)) ? '#CCCCFF' : 'rgba(204, 204, 255, 0.4)',
                            boxShadow: lineProgress > (index / (timelineItems.length - 0.5)) ? '0 0 15px rgba(204, 204, 255, 0.4)' : 'none'
                          }}
                        >
                          <div className="scale-75 sm:scale-100 flex items-center justify-center">
                            {item.icon}
                          </div>
                        </div>

                        <div className="group relative bg-white/5 border border-white/10 p-4 sm:p-5 transition-all duration-300 hover:border-[#CCCCFF]/30 hover:bg-white/10">
                          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#CCCCFF]/20 group-hover:border-[#CCCCFF]/60 transition-colors"></div>
                          <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-[#CCCCFF]/30 rounded-full animate-pulse" style={{ animationDelay: `${index * 0.2}s` }}></div>
                          <div className="absolute bottom-2 right-2 w-1 h-1 bg-[#CCCCFF]/40 rounded-full"></div>
                          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#CCCCFF]/20"></div>

                          {/* Header with Date, Title, Subtitle, and Logo */}
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#CCCCFF] font-bold flex items-center gap-2">
                                  <Calendar size={12} />
                                  {t(`pages.journey.items.${item.key}.date`)}
                                </span>
                              </div>

                              <h3 className="text-sm sm:text-base font-bold text-white mb-1 group-hover:text-[#CCCCFF] transition-colors">
                                {t(`pages.journey.items.${item.key}.title`)}
                              </h3>

                              <div className="flex items-start sm:items-center gap-2 text-xs text-gray-400 italic">
                                <Building2 size={12} className="shrink-0 mt-0.5 sm:mt-0" />
                                <span className="leading-relaxed break-words">{t(`pages.journey.items.${item.key}.subtitle`)}</span>
                              </div>
                            </div>

                            {/* Top-Right Logo */}
                            {item.logo && (
                              <div className="shrink-0 relative group/logo flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14">
                                <Image
                                  src={item.logo}
                                  alt={t(`pages.journey.items.${item.key}.subtitle`)}
                                  width={56}
                                  height={56}
                                  className="w-11 h-11 sm:w-14 sm:h-14 object-contain rounded-xl filter drop-shadow-md transition-transform duration-300 group-hover/logo:scale-110"
                                  onError={(e) => {
                                    const target = e.currentTarget;
                                    target.style.display = "none";
                                    if (target.nextElementSibling) {
                                      (target.nextElementSibling as HTMLElement).style.display = "flex";
                                    }
                                  }}
                                />
                                <div className="hidden w-11 h-11 sm:w-14 sm:h-14 text-[10px] sm:text-xs font-extrabold text-[#CCCCFF] items-center justify-center text-center leading-tight tracking-wider uppercase bg-[#CCCCFF]/10 rounded-xl border border-[#CCCCFF]/30 p-1">
                                  {item.logoFallback}
                                </div>
                              </div>
                            )}
                          </div>

                          <p className="text-xs md:text-sm text-gray-300 leading-relaxed text-justify opacity-80 group-hover:opacity-100 transition-opacity">
                            {t(`pages.journey.items.${item.key}.description`)}
                          </p>

                          {/* Role / Achievement Badge */}
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.key === 'work' && (
                              <span className="px-2 py-1 bg-[#CCCCFF]/10 border border-[#CCCCFF]/30 text-[10px] text-[#CCCCFF] rounded-none uppercase font-bold tracking-wider">
                                {t('pages.journey.items.work.role')}
                              </span>
                            )}
                            {item.key === 'university' && (
                              <span className="px-2 py-1 bg-[#CCCCFF]/10 border border-[#CCCCFF]/30 text-[10px] text-[#CCCCFF] rounded-none uppercase font-bold tracking-wider">
                                {t('pages.journey.items.university.achievement1')}
                              </span>
                            )}
                            {item.key === 'highschool' && (
                              <span className="px-2 py-1 bg-[#CCCCFF]/10 border border-[#CCCCFF]/30 text-[10px] text-[#CCCCFF] rounded-none uppercase font-bold tracking-wider">
                                {t('pages.journey.items.highschool.achievement')}
                              </span>
                            )}
                          </div>

                          {/* Technologies & Skills Badges */}
                          {item.skills && item.skills.length > 0 && (
                            <div className="mt-4 pt-3.5 border-t border-white/10">
                              <div className="text-[10px] sm:text-[11px] font-bold text-[#CCCCFF]/80 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                                <Code size={13} className="text-[#CCCCFF]" />
                                <span>{t('pages.journey.techSkillsLabel')}</span>
                              </div>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {item.skills.map((skill, skillIdx) => (
                                  <span
                                    key={skillIdx}
                                    className="px-2.5 py-1 text-[10px] sm:text-[11px] bg-white/5 border border-white/10 hover:border-[#CCCCFF]/40 hover:bg-[#CCCCFF]/10 text-gray-300 hover:text-white rounded-md transition-all duration-300 flex items-center gap-1.5 group/skill shadow-sm"
                                  >
                                    <span className="w-1 h-1 rounded-full bg-[#CCCCFF]/60 group-hover/skill:bg-[#CCCCFF] transition-colors"></span>
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6">
                  <div
                    className="bg-white/5 border border-white/10 p-4 sm:p-6 relative group overflow-hidden"
                    data-aos="fade-left"
                  >
                    <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-[#CCCCFF]/5 rounded-full blur-2xl group-hover:bg-[#CCCCFF]/10 transition-all duration-700"></div>

                    <div className="absolute top-4 left-4 w-2 h-2 border border-[#CCCCFF]/20 rotate-45"></div>
                    <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-[#CCCCFF]/30 rounded-full"></div>
                    <div className="absolute top-1/2 left-0 w-0.5 h-12 bg-linear-to-b from-transparent via-[#CCCCFF]/10 to-transparent"></div>

                    <div className="flex items-center gap-3 mb-4 md:mb-6 relative">
                      <div className="w-1.5 h-1.5 bg-[#CCCCFF] rotate-45"></div>
                      <h3 className="text-[10px] sm:text-xs font-bold text-white tracking-[0.2em] uppercase flex items-center gap-2">
                        <Trophy size={14} className="text-[#CCCCFF]" />
                        {t('pages.journey.achievementsTitle')}
                      </h3>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      {certifications.map((cert, index) => {
                        const certUrl = t(`pages.journey.certifications.${cert.key}.url`);
                        const hasUrl = typeof certUrl === "string" && /^https?:\/\//.test(certUrl);
                        const Wrapper = hasUrl ? "a" : "div";

                        return (
                          <Wrapper
                            key={cert.key}
                            className="flex gap-3 sm:gap-4 p-2.5 sm:p-3 bg-white/5 border border-white/5 transition-all duration-300 hover:border-[#CCCCFF]/30 hover:bg-white/10 group"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            href={hasUrl ? certUrl : undefined}
                            target={hasUrl ? "_blank" : undefined}
                            rel={hasUrl ? "noopener noreferrer" : undefined}
                          >
                            <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#05050a] border border-white/10 flex items-center justify-center text-[#CCCCFF] group-hover:scale-110 transition-transform duration-300">
                              <div className="scale-75 sm:scale-100">
                                {cert.icon}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-[11px] md:text-xs font-bold text-white mb-1 group-hover:text-[#CCCCFF] transition-colors leading-tight">
                                {t(`pages.journey.certifications.${cert.key}.title`)}
                              </h4>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[9px] text-gray-400 uppercase tracking-wider">
                                  {t(`pages.journey.certifications.${cert.key}.issuer`)}
                                </span>
                                <span className="text-[9px] text-[#CCCCFF]/60 font-medium">
                                  {t(`pages.journey.certifications.${cert.key}.date`)}
                                </span>
                              </div>
                            </div>
                          </Wrapper>
                        );
                      })}
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/5 flex justify-center italic opacity-30 select-none">
                      <Sparkles size={20} className="text-[#CCCCFF] animate-pulse" />
                    </div>
                  </div>

                  <div
                    className="bg-white/5 border border-white/10 p-4 sm:p-6 relative group overflow-hidden"
                    data-aos="fade-up"
                  >
                    <div className="absolute top-[-20px] left-[-20px] w-24 h-24 bg-[#CCCCFF]/5 rounded-full blur-2xl group-hover:bg-[#CCCCFF]/10 transition-all duration-700"></div>

                    <div className="absolute top-4 right-4 w-2 h-2 border border-[#CCCCFF]/20 rotate-45"></div>
                    <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-[#CCCCFF]/30 rounded-full"></div>
                    <div className="absolute top-1/2 right-0 w-0.5 h-12 bg-linear-to-b from-transparent via-[#CCCCFF]/10 to-transparent"></div>

                    <div className="flex items-center gap-3 mb-4 md:mb-6 relative">
                      <div className="w-1.5 h-1.5 bg-[#CCCCFF] rotate-45"></div>
                      <h3 className="text-[10px] sm:text-xs font-bold text-white tracking-[0.2em] uppercase flex items-center gap-2">
                        <Sparkles size={14} className="text-[#CCCCFF]" />
                        {t('pages.journey.futureLearning.title')}
                      </h3>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      {futureLearning.map((item, index) => (
                        <div
                          key={item.key}
                          className="flex gap-3 sm:gap-4 p-2.5 sm:p-3 bg-white/5 border border-white/5 transition-all duration-300 hover:border-[#CCCCFF]/30 hover:bg-white/10 group"
                          data-aos="fade-up"
                          data-aos-delay={index * 100}
                        >
                          <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#05050a] border border-white/10 flex items-center justify-center text-[#CCCCFF] group-hover:scale-110 transition-transform duration-300">
                            <div className="scale-75 sm:scale-100">
                              {item.icon}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-[11px] md:text-xs font-bold text-white mb-1 group-hover:text-[#CCCCFF] transition-colors leading-tight">
                              {t(`pages.journey.futureLearning.items.${item.key}.title`)}
                            </h4>
                            <span className="text-[9px] text-gray-400 uppercase tracking-wider">
                              {t(`pages.journey.futureLearning.items.${item.key}.subtitle`)}
                            </span>
                          </div>
                        </div>
                      ))}
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
