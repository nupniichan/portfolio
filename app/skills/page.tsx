"use client";

import { useTranslations } from "../hooks/useTranslations";
import MetadataUpdater from "../components/MetadataUpdater";
import CardParticles from "../components/CardParticles";
import { 
  Server, 
  Database, 
  Wrench, 
  Globe, 
  Terminal, 
  Layout, 
  GitBranch,
  Cloud,
  BookOpen
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { withBasePath } from "../utils/paths";

export default function SkillsPage() {
  const { t } = useTranslations();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const skillCategories = [
    {
      id: "frontend",
      title: t('pages.skills.categories.frontend'),
      Icon: Layout,
      skills: [
        { name: "HTML5 & CSS3", level: 80 },
        { name: "JavaScript", level: 50 },
        { name: "React.js / Next.js", level: 50 },
        { name: "Tailwind CSS", level: 85 },
      ]
    },
    {
      id: "backend",
      title: t('pages.skills.categories.backend'),
      Icon: Server,
      skills: [
        { name: "C#", level: 90 },
        { name: "Node.js", level: 55 },
        { name: "Python", level: 70 },
      ]
    },
    {
      id: "database",
      title: t('pages.skills.categories.database'),
      Icon: Database,
      skills: [
        { name: "MySQL", level: 70 },
        { name: "SQL Server", level: 80 },
        { name: "PostgreSQL", level: 40 },
        { name: "MongoDB", level: 50 },
      ]
    }
  ];

  const tools = [
    { name: "Docker", description: t('pages.skills.toolDetails.docker'), icon: <Cloud size={24} className="text-[#CCCCFF]" /> },
    { name: "Ubuntu/Linux", description: t('pages.skills.toolDetails.linux'), icon: <Terminal size={24} className="text-[#CCCCFF]" /> },
    { name: "Git", description: t('pages.skills.toolDetails.git'), icon: <GitBranch size={24} className="text-[#CCCCFF]" /> },
    { name: "Others", description: t('pages.skills.toolDetails.others'), icon: <Wrench size={24} className="text-[#CCCCFF]" /> },
  ];

  const languages = [
    { 
      name: t('pages.skills.languages.vietnamese.name'), 
      level: 99.9, 
      description: t('pages.skills.languages.vietnamese.description'), 
      badges: [t('pages.skills.languages.vietnamese.badge1'), t('pages.skills.languages.vietnamese.badge2')],
      flag: withBasePath("/Images/CountryFlag/Flag_of_VietNam.png") 
    },
    { 
      name: t('pages.skills.languages.english.name'), 
      level: 75, 
      description: t('pages.skills.languages.english.description'), 
      badges: [t('pages.skills.languages.english.badge1'), t('pages.skills.languages.english.badge2')],
      flag: withBasePath("/Images/CountryFlag/Flag_of_the_United_States_and_United_Kingdom.png") 
    },
  ];

  const futurePlans = (t('pages.skills.futureLearning.items') || []) as { title: string, description: string }[];

  return (
    <>
      <MetadataUpdater pageKey="skills" />
      <div className="flex min-h-screen items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#CCCCFF]/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-[#CCCCFF]/8 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-[#CCCCFF]/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
          <div className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-[#CCCCFF]/20 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-[#CCCCFF]/10 rotate-12 animate-spin-reverse" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
          <div className="absolute top-1/3 left-1/2 w-20 h-20 bg-linear-to-br from-[#CCCCFF]/10 to-transparent rounded-full blur-md animate-floating"></div>
          <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-linear-to-tl from-[#CCCCFF]/8 to-transparent rounded-full blur-lg" style={{ animation: 'floating 8s ease-in-out infinite', animationDelay: '1.5s' }}></div>
        </div>

        <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[1200px] relative py-8 z-10">
          <div className="floating-container animate-fade-in-up relative overflow-hidden">
            <CardParticles />
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#CCCCFF]/30 -translate-x-2 -translate-y-2 z-10"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#CCCCFF]/30 translate-x-2 translate-y-2 z-10"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#CCCCFF]/40 -translate-x-1 translate-y-1 z-10"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#CCCCFF]/40 translate-x-1 -translate-y-1 z-10"></div>
            <div className="absolute top-1/2 left-0 w-1 h-20 bg-linear-to-b from-transparent via-[#CCCCFF]/20 to-transparent -translate-x-4 z-10"></div>
            <div className="absolute top-1/2 right-0 w-1 h-20 bg-linear-to-b from-transparent via-[#CCCCFF]/20 to-transparent translate-x-4 z-10"></div>

            <div className="skills-section p-2 md:p-6 lg:p-8 relative z-10">
              <div 
                className="skills-header mb-8 relative border-b border-white/10 pb-4"
                data-aos="fade-down"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white text-stroke">
                    {t('pages.skills.header')} <span className="animate-kaomoji ml-2 inline-block text-[#CCCCFF]">{t('pages.skills.headerEmoji')}</span>
                  </h1>
                  <div className="hidden md:flex items-center gap-4 select-none pointer-events-none">
                    <div className="flex gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-1.5 h-1.5 bg-[#CCCCFF]/40 rounded-full"
                          style={{ animation: `pulse 1.5s infinite ${i * 0.1}s` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skillCategories.map((category, idx) => (
                      <div 
                        key={category.id} 
                        className={`bg-white/5 border border-white/10 p-5 relative overflow-hidden group ${category.id === 'database' ? 'md:col-span-2' : ''}`}
                        data-aos="fade-up"
                        data-aos-delay={100 * (idx + 1)}
                      >
                        <div className="absolute top-2 left-2 w-2 h-2 bg-[#CCCCFF]/30 rounded-full animate-pulse" style={{ animationDelay: `${idx * 0.2}s` }}></div>
                        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-[#CCCCFF]/40 rounded-full"></div>
                        <div className="absolute top-1/2 left-0 w-0.5 h-8 bg-linear-to-b from-transparent via-[#CCCCFF]/10 to-transparent"></div>
                        
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                          <category.Icon size={64} className="text-[#CCCCFF]" />
                        </div>
                        
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-[#CCCCFF]/10 rounded-lg text-[#CCCCFF]">
                            <category.Icon size={20} />
                          </div>
                          <h3 className="text-lg font-bold text-white">{category.title}</h3>
                        </div>

                        <div className="space-y-4">
                          {category.skills.map((skill, sIdx) => (
                            <div key={sIdx} className="space-y-1.5">
                              <div className="flex justify-between text-xs sm:text-sm">
                                <span className="text-gray-300 font-medium">{skill.name}</span>
                                <span className="text-[#CCCCFF]">{skill.level}%</span>
                              </div>
                              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-linear-to-r from-[#CCCCFF]/60 to-[#CCCCFF] rounded-full relative"
                                  style={{ width: mounted ? `${skill.level}%` : '0%', transition: 'width 1s ease-out 0.2s' }}
                                >
                                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 animate-pulse"></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white/5 border border-white/10 p-5 md:p-6 relative" data-aos="fade-up" data-aos-delay="400">
                    <div className="absolute top-4 right-4 w-16 h-16 border border-[#CCCCFF]/10 rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 border border-[#CCCCFF]/10 rotate-45"></div>
                    <div className="absolute top-1/2 right-8 w-1 h-12 bg-linear-to-b from-transparent via-[#CCCCFF]/10 to-transparent"></div>
                    
                    <div className="flex items-center gap-3 mb-6">
                      <Wrench className="text-[#CCCCFF]" size={20} />
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider">{t('pages.skills.toolDetails.title')}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {tools.map((tool, idx) => (
                        <div 
                          key={idx}
                          className="group relative bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#CCCCFF]/30 p-4 transition-all duration-300 flex flex-col items-center text-center gap-3"
                        >
                          <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#CCCCFF]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="relative z-10 p-3 bg-[#CCCCFF]/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                            {tool.icon}
                          </div>
                          <div className="relative z-10">
                            <h4 className="font-bold text-white text-sm mb-1">{tool.name}</h4>
                            <p className="text-[10px] text-gray-400">{tool.description}</p>
                          </div>
                          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#CCCCFF]/0 group-hover:border-[#CCCCFF]/50 transition-all duration-300"></div>
                          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#CCCCFF]/0 group-hover:border-[#CCCCFF]/50 transition-all duration-300"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-6">
                   <div 
                    className="bg-white/5 border border-white/10 p-5 md:p-6 relative"
                    data-aos="fade-left"
                    data-aos-delay="200"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-br from-[#CCCCFF]/10 to-transparent rounded-bl-full pointer-events-none"></div>
                    <div className="absolute top-6 left-6 w-3 h-3 border border-[#CCCCFF]/20 rotate-45"></div>
                    <div className="absolute bottom-6 right-6 w-2 h-2 bg-[#CCCCFF]/30 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/4 left-0 w-0.5 h-16 bg-linear-to-b from-transparent via-[#CCCCFF]/10 to-transparent"></div>
                    
                    <div className="flex items-center gap-3 mb-8">
                      <Globe className="text-[#CCCCFF]" size={20} />
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider">{t('pages.skills.languages.title')}</h3>
                    </div>

                    <div className="space-y-8">
                      {languages.map((lang, idx) => (
                        <div key={idx} className="relative group">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="relative w-8 h-6 filter transition-all duration-300 transform group-hover:scale-110">
                              <Image 
                                src={lang.flag} 
                                alt={`${lang.name} flag`}
                                fill
                                className="object-cover rounded-sm"
                                sizes="32px"
                              />
                            </div>
                            <div>
                              <h4 className="font-bold text-white">{lang.name}</h4>
                              <p className="text-xs text-[#CCCCFF]">{lang.description}</p>
                            </div>
                          </div>
                          
                          <div className="relative pt-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-[10px] uppercase tracking-wider text-gray-400">{t('pages.skills.languages.proficiency')}</span>
                              <span className="text-[10px] font-bold text-white">{lang.level}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-linear-to-r from-[#CCCCFF] to-[#a3a3ff]"
                                style={{ width: mounted ? `${lang.level}%` : '0%', transition: 'width 1s ease-out 0.5s' }}
                              ></div>
                            </div>
                            
                            <div className="flex gap-2 mt-3">
                              {lang.badges.map((badge, bIdx) => (
                                <span 
                                  key={bIdx} 
                                  className="text-[10px] px-2 py-0.5 border border-[#CCCCFF]/30 text-[#CCCCFF] rounded-sm bg-[#CCCCFF]/5"
                                >
                                  {badge}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div 
                    className="bg-white/5 border border-white/10 p-5 md:p-6 relative"
                    data-aos="fade-left"
                    data-aos-delay="300"
                  >
                    <div className="absolute top-0 left-0 w-20 h-20 border border-[#CCCCFF]/10 rounded-full -translate-x-8 -translate-y-8"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#CCCCFF]/20 rotate-45"></div>
                    <div className="absolute top-1/2 left-4 w-8 h-0.5 bg-linear-to-r from-[#CCCCFF]/20 to-transparent"></div>
                    
                    <div className="flex items-center gap-3 mb-6">
                      <BookOpen className="text-[#CCCCFF]" size={20} />
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider">{t('pages.skills.futureLearning.title')}</h3>
                    </div>

                    <div className="space-y-4">
                      {Array.isArray(futurePlans) && futurePlans.map((plan, idx) => (
                        <div 
                          key={idx}
                          className="group p-3 bg-white/5 border border-white/5 hover:border-[#CCCCFF]/30 transition-all duration-300"
                        >
                          <h4 className="font-bold text-white text-sm mb-1 group-hover:text-[#CCCCFF] transition-colors">
                            {plan.title}
                          </h4>
                          <p className="text-xs text-gray-400">
                            {plan.description}
                          </p>
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

