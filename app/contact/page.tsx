"use client";

import { useState } from "react";
import { useTranslations } from "../hooks/useTranslations";
import MetadataUpdater from "../components/MetadataUpdater";
import { Mail, MessageCircle, Home, ArrowRight, X } from "lucide-react";

export default function ContactPage() {
  const { t } = useTranslations();
  const [qrModal, setQrModal] = useState<{ open: boolean; platform: string; image: string }>({
    open: false,
    platform: "",
    image: ""
  });

  const qrCodes = {
    telegram: "/Images/QR/telegram-qr.jpg",
    zalo: "/Images/QR/zalo-qr.jpg"
  };

  const openQrModal = (platform: string) => {
    setQrModal({
      open: true,
      platform,
      image: qrCodes[platform as keyof typeof qrCodes]
    });
  };

  const closeQrModal = () => {
    setQrModal({ open: false, platform: "", image: "" });
  };

  return (
    <>
      <MetadataUpdater pageKey="contact" />
      <div className="flex min-h-screen items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-24 left-20 w-36 h-36 bg-[#CCCCFF]/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '5s' }}></div>
          <div className="absolute bottom-28 right-16 w-32 h-32 bg-[#CCCCFF]/6 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '6s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-[#CCCCFF]/4 rounded-full blur-lg animate-pulse" style={{ animationDelay: '4s', animationDuration: '4s' }}></div>
          <div className="absolute top-1/3 left-1/4 w-18 h-18 border-2 border-[#CCCCFF]/15 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-1/3 right-1/3 w-14 h-14 bg-[#CCCCFF]/8 rotate-12 animate-spin-reverse" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
          <div className="absolute top-1/4 right-1/3 w-26 h-26 bg-linear-to-br from-[#CCCCFF]/8 to-transparent rounded-full blur-md animate-floating"></div>
          <div className="absolute bottom-1/4 left-1/3 w-34 h-34 bg-linear-to-tl from-[#CCCCFF]/6 to-transparent rounded-full blur-lg" style={{ animation: 'floating 9s ease-in-out infinite', animationDelay: '2s' }}></div>
        </div>

        <div className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[75%] xl:max-w-[70%] 2xl:max-w-[1100px] relative z-10">
          <div className="floating-container animate-fade-in-up relative">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#CCCCFF]/30 -translate-x-2 -translate-y-2"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#CCCCFF]/30 translate-x-2 translate-y-2"></div>
            <div className="absolute top-4 right-4 w-3 h-3 border border-[#CCCCFF]/20 rotate-45"></div>
            <div className="absolute bottom-4 left-4 w-3 h-3 border border-[#CCCCFF]/20 rotate-45"></div>
            <div className="absolute top-0 right-0 w-2 h-2 bg-[#CCCCFF]/30"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#CCCCFF]/30"></div>
            <div className="absolute top-1/2 left-0 w-1 h-32 bg-linear-to-b from-transparent via-[#CCCCFF]/20 to-transparent -translate-x-4"></div>
            <div className="absolute top-1/2 right-0 w-1 h-32 bg-linear-to-b from-transparent via-[#CCCCFF]/20 to-transparent translate-x-4"></div>

            <div className="p-2 md:p-4 lg:p-6">
              <div 
                className="mb-6 relative border-b border-white/10 pb-4"
                data-aos="fade-down"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white text-stroke">
                    <Mail size={20} className="inline mr-2 text-[#CCCCFF]" />
                    {t('pages.contact.header')} <span className="animate-kaomoji ml-2 inline-block">{t('pages.contact.headerEmoji')}</span>
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

              <div 
                className="mb-8"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <p className="text-xs md:text-sm text-gray-200 leading-relaxed text-center">
                  {t('pages.contact.welcomeText')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                <div 
                  className="relative bg-white/5 rounded-none p-5 border border-white/10 group"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#CCCCFF]/40"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#CCCCFF]/40"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#CCCCFF]/40"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#CCCCFF]/40"></div>
                  
                  <div className="absolute top-6 left-6 w-1.5 h-1.5 bg-[#CCCCFF]/30 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-[#CCCCFF]/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/2 left-0 w-0.5 h-8 bg-linear-to-b from-transparent via-[#CCCCFF]/10 to-transparent"></div>
                  <div className="absolute top-1/2 right-0 w-0.5 h-8 bg-linear-to-b from-transparent via-[#CCCCFF]/10 to-transparent"></div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-[#CCCCFF]/10 border border-[#CCCCFF]/30 flex items-center justify-center mb-4 group-hover:bg-[#CCCCFF]/20 transition-colors">
                      <Mail size={24} className="text-[#CCCCFF]" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-2">
                      {t('pages.contact.email.title')}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-300 mb-4">
                      {t('pages.contact.email.address')}
                    </p>
                    <a 
                      href={`mailto:${t('pages.contact.email.address')}`}
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:border-[#CCCCFF]/30 hover:bg-white/10 transition-all text-xs md:text-sm text-gray-200 group-hover:text-white"
                    >
                      {t('pages.contact.email.action')}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                <div 
                  className="relative bg-white/5 rounded-none p-5 border border-white/10 group"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#CCCCFF]/40"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#CCCCFF]/40"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#CCCCFF]/40"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#CCCCFF]/40"></div>
                  
                  <div className="absolute top-6 left-6 w-1.5 h-1.5 bg-[#CCCCFF]/30 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-[#CCCCFF]/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/2 left-0 w-0.5 h-8 bg-linear-to-b from-transparent via-[#CCCCFF]/10 to-transparent"></div>
                  <div className="absolute top-1/2 right-0 w-0.5 h-8 bg-linear-to-b from-transparent via-[#CCCCFF]/10 to-transparent"></div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-[#CCCCFF]/10 border border-[#CCCCFF]/30 flex items-center justify-center mb-4 group-hover:bg-[#CCCCFF]/20 transition-colors">
                      <MessageCircle size={24} className="text-[#CCCCFF]" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-2">
                      {t('pages.contact.telegram.title')}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-300 mb-4">
                      {t('pages.contact.telegram.description')}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openQrModal('telegram')}
                        className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 hover:border-[#CCCCFF]/30 hover:bg-white/10 transition-all text-xs text-gray-200 group-hover:text-white"
                      >
                        <MessageCircle size={14} />
                        {t('pages.contact.telegram.telegramButton')}
                      </button>
                      <button
                        onClick={() => openQrModal('zalo')}
                        className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 hover:border-[#CCCCFF]/30 hover:bg-white/10 transition-all text-xs text-gray-200 group-hover:text-white"
                      >
                        <MessageCircle size={14} />
                        {t('pages.contact.telegram.zaloButton')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:gap-6">
                <div 
                  className="relative bg-white/5 rounded-none p-5 border border-white/10 group"
        data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#CCCCFF]/40"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#CCCCFF]/40"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#CCCCFF]/40"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#CCCCFF]/40"></div>
                  
                  <div className="absolute top-6 left-6 w-1.5 h-1.5 bg-[#CCCCFF]/30 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-[#CCCCFF]/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/2 left-0 w-0.5 h-8 bg-linear-to-b from-transparent via-[#CCCCFF]/10 to-transparent"></div>
                  <div className="absolute top-1/2 right-0 w-0.5 h-8 bg-linear-to-b from-transparent via-[#CCCCFF]/10 to-transparent"></div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-[#CCCCFF]/10 border border-[#CCCCFF]/30 flex items-center justify-center mb-4 group-hover:bg-[#CCCCFF]/20 transition-colors">
                      <Home size={24} className="text-[#CCCCFF]" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-2">
                      {t('pages.contact.home.title')}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-300 mb-4">
                      {t('pages.contact.home.description')}
                    </p>
                    <a 
                      href="/"
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:border-[#CCCCFF]/30 hover:bg-white/10 transition-all text-xs md:text-sm text-gray-200 group-hover:text-white"
                    >
                      {t('pages.contact.home.action')}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex justify-end items-center gap-2 opacity-30">
                <div className="w-12 h-px bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {qrModal.open && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeQrModal}
        >
          <div 
            className="relative bg-white/10 border border-white/20 p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#CCCCFF]/40"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#CCCCFF]/40"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#CCCCFF]/40"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#CCCCFF]/40"></div>
            
            <button
              onClick={closeQrModal}
              className="absolute top-4 right-4 text-white hover:text-[#CCCCFF] transition-colors"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-lg font-bold text-white mb-4 text-center">
              {qrModal.platform === 'telegram' ? 'Telegram QR Code' : 'Zalo QR Code'}
            </h3>
            
            <div className="flex justify-center">
              <div className="relative w-80 h-80 md:w-96 md:h-96 bg-white/5 border border-white/10 p-4">
                <img 
                  src={qrModal.image} 
                  alt={`${qrModal.platform} QR Code`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
      </div>
    </div>
      )}
    </>
  );
}

