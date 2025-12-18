"use client";

import "./page.css";
import Image from "next/image";
import Typewriter from "./components/Typewriter";
import SocialLinks from "./components/SocialLinks";
import { useTranslations } from "./hooks/useTranslations";

export default function Home() {
  const { t } = useTranslations();

  return (
    <div className="flex min-h-screen items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6">
      <div className="w-full max-w-[95%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] xl:max-w-[60%] floating-container">
        <div className="flex flex-col md:flex-row items-center p-2.5 md:p-4 lg:p-6">
          <div className="w-full md:w-1/2 flex flex-col justify-start items-center md:items-start space-y-1 md:space-y-2 order-2 md:order-1">
            <div className="text-center md:text-left md:mt-0 text-lg md:text-xl lg:text-2xl font-extrabold text-white text-stroke animate-slide-up">
              Quốc Bảo
            </div>
            <div className="text-center md:text-left text-sm md:text-base lg:text-lg font-bold text-white text-stroke animate-slide-up delay-100">
              {t('home.greeting')}
            </div>
            <div className="animate-slide-up delay-200">
              <Typewriter />
            </div>
            <div className="mt-1.5 md:mt-2 animate-slide-up delay-300">
              <p className="text-center md:text-left text-xs md:text-sm lg:text-base font-semibold">
                <span className="bg-linear-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {t('home.connect')}
                </span>
              </p>
            </div>
            <div className="animate-slide-up delay-400">
              <SocialLinks />
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center items-center mt-2.5 md:mt-0 order-1 md:order-2">
            <div className="avatar-container animate-slide-up delay-200">
              <Image
                className="rounded-full w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 object-cover transition-all duration-300 hover:shadow-[0_0_12px_rgba(255,255,255,0.3)]"
                src="/Images/Avatar/ChinoKafuu.png"
                alt="Avatar"
                width={224}
                height={224}
                priority
              />
            </div>
            <span className="text-white text-stroke animate-slide-up mt-1 delay-300 text-[12px]">
              @nupniichan
            </span>
            <div className="online-status inline-flex items-center gap-1 rounded-full bg-white/10 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] text-white shadow-lg backdrop-blur mt-1 sm:mt-1.5 animate-slide-up delay-400">
              <span className="h-1 w-1 rounded-full bg-green-400" />
              <span className="uppercase tracking-[0.2em] text-[8px] text-gray-200">
                {t('home.status')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
