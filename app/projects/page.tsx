"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "../hooks/useTranslations";
import MetadataUpdater from "../components/MetadataUpdater";
import React from "react";
import CardParticles from "../components/CardParticles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import {
  MessageSquare,
  ShoppingCart,
  Tv,
  CloudSun,
  Gamepad2,
  IdCard,
  Github,
  Box,
  X,
  ExternalLink,
} from "lucide-react";

export default function ProjectsPage() {
  const { t } = useTranslations();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [readmeContent, setReadmeContent] = useState<string>("");
  const [isLoadingReadme, setIsLoadingReadme] = useState(false);
  const [readmeError, setReadmeError] = useState<string | null>(null);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsClosing(false);
      setReadmeContent("");
      setReadmeError(null);
    }, 300);
  };

  type ProjectKey = "chinokafuu" | "website-ban-linh-kien" | "cs-anilist" | "cs-owm" | "csteam-works" | "portfolio";

  const projects: { key: ProjectKey; icon: React.JSX.Element; github: string; nuget?: string }[] = [
    {
      key: "chinokafuu",
      icon: <MessageSquare size={18} className="text-[#CCCCFF]" />,
      github: "https://github.com/nupniichan/chinokafuu"
    },
    {
      key: "website-ban-linh-kien",
      icon: <ShoppingCart size={18} className="text-[#CCCCFF]" />,
      github: "https://github.com/nupniichan/Website-ban-linh-kien"
    },
    {
      key: "cs-anilist",
      icon: <Tv size={18} className="text-[#CCCCFF]" />,
      github: "https://github.com/nupniichan/cs-anilist",
      nuget: "https://www.nuget.org/packages/cs-anilist"
    },
    {
      key: "cs-owm",
      icon: <CloudSun size={18} className="text-[#CCCCFF]" />,
      github: "https://github.com/nupniichan/cs-owm",
      nuget: "https://www.nuget.org/packages/cs-owm"
    },
    {
      key: "csteam-works",
      icon: <Gamepad2 size={18} className="text-[#CCCCFF]" />,
      github: "https://github.com/nupniichan/csteam-works",
      nuget: "https://www.nuget.org/packages/csteam-works"
    },
    {
      key: "portfolio",
      icon: <IdCard size={18} className="text-[#CCCCFF]" />,
      github: "https://github.com/nupniichan/portfolio"
    }
  ];

  const fetchReadme = async (githubUrl: string) => {
    setIsLoadingReadme(true);
    setReadmeError(null);
    try {
      const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!match) {
        throw new Error("Invalid GitHub URL");
      }
      const [, owner, repo] = match;
      
      const readmeUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`;
      const response = await fetch(readmeUrl);
      
      if (!response.ok) {
        const readmeUrlMaster = `https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`;
        const responseMaster = await fetch(readmeUrlMaster);
        if (!responseMaster.ok) {
          throw new Error("README not found");
        }
        const text = await responseMaster.text();
        setReadmeContent(text);
      } else {
        const text = await response.text();
        setReadmeContent(text);
      }
    } catch (error) {
      setReadmeError("Unable to load README from GitHub");
      setReadmeContent("");
    } finally {
      setIsLoadingReadme(false);
    }
  };

  useEffect(() => {
    if (selectedProject) {
      const project = projects.find(p => p.key === selectedProject);
      if (project?.github) {
        fetchReadme(project.github);
      }
    }
  }, [selectedProject]);

  const getProjectData = (key: ProjectKey) => {
    return {
      title: t(`pages.projects.items.${key}.title`),
      description: t(`pages.projects.items.${key}.description`),
      tags: t(`pages.projects.items.${key}.tags`) as string[]
    };
  };

  const activeProject = projects.find(p => p.key === selectedProject);

  return (
    <>
      <MetadataUpdater pageKey="projects" />
      <div className="flex min-h-screen items-center justify-center p-2 sm:p-3 md:p-4 lg:p-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-16 right-16 w-28 h-28 bg-[#CCCCFF]/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-24 left-12 w-36 h-36 bg-[#CCCCFF]/6 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '5s' }}></div>
          <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-[#CCCCFF]/4 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '6s' }}></div>
          <div className="absolute top-1/4 left-1/3 w-14 h-14 border-2 border-[#CCCCFF]/15 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-10 h-10 bg-[#CCCCFF]/8 rotate-12 animate-spin-reverse" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
          <div className="absolute top-1/2 right-1/3 w-18 h-18 bg-linear-to-br from-[#CCCCFF]/8 to-transparent rounded-full blur-md animate-floating"></div>
          <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-linear-to-tl from-[#CCCCFF]/6 to-transparent rounded-full blur-lg" style={{ animation: 'floating 7s ease-in-out infinite', animationDelay: '2s' }}></div>
        </div>

        <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[1100px] relative py-8 z-10">
          <div className="floating-container animate-fade-in-up relative overflow-hidden">
            <CardParticles />
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#CCCCFF]/30 -translate-x-2 -translate-y-2 z-10"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#CCCCFF]/30 translate-x-2 translate-y-2 z-10"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#CCCCFF]/40 -translate-x-1 translate-y-1 z-10"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#CCCCFF]/40 translate-x-1 -translate-y-1 z-10"></div>
            <div className="absolute top-1/2 left-0 w-1 h-24 bg-linear-to-b from-transparent via-[#CCCCFF]/20 to-transparent -translate-x-4 z-10"></div>
            <div className="absolute top-1/2 right-0 w-1 h-24 bg-linear-to-b from-transparent via-[#CCCCFF]/20 to-transparent translate-x-4 z-10"></div>

            <div className="about-section p-2 md:p-4 lg:p-5 relative z-10">
              <div 
                className="about-header mb-4 relative border-b border-white/10 pb-3"
                data-aos="fade-down"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white text-stroke">
                    {t('pages.projects.header')} <span className="animate-kaomoji ml-2 inline-block">{t('pages.projects.headerEmoji')}</span>
                  </h1>
                  <p className="text-[11px] md:text-xs text-gray-400 max-w-md text-center sm:text-right italic">
                    {t('pages.projects.description')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
                {projects.map((project, index) => (
                  <div
                    key={project.key}
                    onClick={() => setSelectedProject(project.key)}
                    className="group relative bg-white/5 border border-white/10 p-4 transition-all duration-300 hover:bg-white/10 hover:border-[#CCCCFF]/30 cursor-pointer"
                    data-aos="fade-up"
                    data-aos-delay={100 * (index + 1)}
                  >
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#CCCCFF]/40"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#CCCCFF]/40"></div>
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#CCCCFF]/30 rounded-full animate-pulse" style={{ animationDelay: `${index * 0.15}s` }}></div>
                    <div className="absolute bottom-2 left-2 w-1 h-1 bg-[#CCCCFF]/40 rounded-full"></div>
                    <div className="absolute top-1/2 left-0 w-0.5 h-6 bg-linear-to-b from-transparent via-[#CCCCFF]/10 to-transparent group-hover:via-[#CCCCFF]/30 transition-colors"></div>

                    <div className="flex items-start justify-between mb-3">
                      <div className="p-1.5 bg-[#CCCCFF]/10 border border-[#CCCCFF]/20 group-hover:scale-110 transition-transform duration-300">
                        {project.icon}
                      </div>
                      <div className="flex gap-2">
                        {project.github && (
                          <div className="p-1.5 text-gray-400 group-hover:text-[#CCCCFF] transition-colors">
                            <Github size={16} />
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-white mb-1.5 group-hover:text-[#CCCCFF] transition-colors">
                      {getProjectData(project.key as ProjectKey).title}
                    </h3>

                    <p className="text-[11px] md:text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed h-8 md:h-9">
                      {getProjectData(project.key as ProjectKey).description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {getProjectData(project.key as ProjectKey).tags.map((tag: string, tagIdx: number) => (
                        <span 
                          key={tagIdx}
                          className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-white/5 border border-white/10 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div 
                className="mt-6 pt-5 border-t border-white/10 flex justify-center sm:justify-end items-center gap-2 relative"
                data-aos="fade-up"
                data-aos-delay={100 * (projects.length + 1)}
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-0.5 bg-linear-to-r from-[#CCCCFF]/20 to-transparent"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-linear-to-l from-[#CCCCFF]/20 to-transparent"></div>
                
                <p className="text-[10px] md:text-[11px] text-gray-400 italic">
                  {t('pages.projects.moreProjects')} <a href="https://github.com/nupniichan?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-[#CCCCFF] hover:underline underline-offset-4 font-bold">{t('pages.projects.moreProjectsLink')}</a> {t('pages.projects.moreProjectsEmoji')}
                </p>
                <div className="w-6 h-px bg-white/20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedProject && activeProject && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
          onClick={handleClose}
        >
          <div 
            className={`w-full max-w-2xl max-h-[85vh] bg-[#0a0a0f] border border-white/10 relative overflow-hidden flex flex-col ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#CCCCFF]/30"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#CCCCFF]/30"></div>
            
            <div className="absolute top-4 left-4 w-2 h-2 bg-[#CCCCFF]/30"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-[#CCCCFF]/30"></div>
            <div className="absolute top-1/2 left-0 w-1 h-16 bg-linear-to-b from-transparent via-[#CCCCFF]/15 to-transparent"></div>
            <div className="absolute top-1/2 right-0 w-1 h-16 bg-linear-to-b from-transparent via-[#CCCCFF]/15 to-transparent"></div>
            
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="p-6 md:p-10 overflow-y-auto flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-[#CCCCFF]/10 border border-[#CCCCFF]/20 shadow-[0_0_15px_rgba(204,204,255,0.1)]">
                  {activeProject.icon}
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    {getProjectData(activeProject.key as ProjectKey).title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {getProjectData(activeProject.key as ProjectKey).tags.map((tag: string, idx: number) => (
                      <span key={idx} className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-[#CCCCFF]/5 border border-[#CCCCFF]/20 text-[#CCCCFF]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-[#CCCCFF] uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <span className="w-4 h-px bg-[#CCCCFF]/50"></span>
                    {t('pages.projects.details.description')}
                  </h3>
                  {isLoadingReadme ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-gray-400 text-sm">Loading README...</div>
                    </div>
                  ) : readmeError ? (
                    <div className="text-gray-400 text-sm italic">
                      {readmeError}
                    </div>
                  ) : readmeContent ? (
                    <div className="prose prose-invert prose-sm max-w-none text-gray-300 markdown-content max-h-[50vh] overflow-y-auto pr-2">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}
                        components={{
                          h1: ({node, ...props}) => <h1 className="text-xl font-bold text-white mb-4 mt-6 first:mt-0" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-lg font-bold text-white mb-3 mt-5" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-base font-bold text-white mb-2 mt-4" {...props} />,
                          p: ({node, ...props}) => <p className="text-gray-300 mb-3 leading-relaxed" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc list-inside mb-3 text-gray-300 space-y-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-3 text-gray-300 space-y-1" {...props} />,
                          li: ({node, ...props}) => <li className="ml-4" {...props} />,
                          code: ({node, inline, className, children, ...props}: any) => {
                            if (inline) {
                              return <code className="bg-white/10 px-1.5 py-0.5 rounded text-[#CCCCFF] text-xs" {...props}>{children}</code>;
                            }
                            return <code className="text-xs text-gray-300 font-mono" {...props}>{children}</code>;
                          },
                          pre: ({node, children, ...props}: any) => {
                            return (
                              <pre className="bg-white/5 p-3 rounded mb-3 overflow-x-auto border border-white/10" {...props}>
                                {children}
                              </pre>
                            );
                          },
                          a: ({node, ...props}: any) => <a className="text-[#CCCCFF] hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#CCCCFF]/30 pl-4 italic text-gray-400 mb-3" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                          em: ({node, ...props}) => <em className="italic" {...props} />,
                        }}
                      >
                        {readmeContent}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed text-justify italic">
                      {getProjectData(activeProject.key as ProjectKey).description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProject.github && (
                    <a 
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 p-4 bg-white/5 border border-white/10 hover:bg-[#CCCCFF]/10 hover:border-[#CCCCFF]/30 transition-all group"
                    >
                      <Github size={20} className="text-gray-400 group-hover:text-[#CCCCFF]" />
                      <span className="text-sm font-bold text-white">{t('pages.projects.details.viewRepo')}</span>
                      <ExternalLink size={14} className="text-gray-500" />
                    </a>
                  )}
                  {activeProject.nuget && (
                    <a 
                      href={activeProject.nuget}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 p-4 bg-white/5 border border-white/10 hover:bg-[#CCCCFF]/10 hover:border-[#CCCCFF]/30 transition-all group"
                    >
                      <Box size={20} className="text-gray-400 group-hover:text-[#CCCCFF]" />
                      <span className="text-sm font-bold text-white">{t('pages.projects.details.viewNuget')}</span>
                      <ExternalLink size={14} className="text-gray-500" />
                    </a>
                  )}
                </div>
              </div>

              <div className="mt-10 flex justify-center opacity-20">
                <div className="flex gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-white rotate-45"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}