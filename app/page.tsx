"use client";

import "./page.css";
import Image from "next/image";
import Typewriter from "./components/Typewriter";
import SocialLinks from "./components/SocialLinks";
import { useThemeLanguage } from "./components/ThemeLanguageProvider";

const homeTexts = {
  en: {
    greeting: "Hi, I'm Nguyen Phi Quoc Bao",
    connect: "Connect with me ⸜(｡˃ ᵕ ˂ )⸝♡",
    status: "Online",
  },
  vi: {
    greeting: "Xin chào, mình là Nguyễn Phi Quốc Bảo",
    connect: "Kết nối với mình nhé ⸜(｡˃ ᵕ ˂ )⸝♡",
    status: "Đang online",
  },
} as const;

export default function Home() {
  const { language } = useThemeLanguage();
  const t = homeTexts[language];

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-12 lg:p-24">
      <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[75%] floating-container">
        <div className="flex flex-col md:flex-row items-center p-4 md:p-8 lg:p-12">
          <div className="w-full md:w-1/2 flex flex-col justify-start items-center md:items-start space-y-3 md:space-y-5 order-2 md:order-1">
            <div className="text-center md:text-left md:mt-0 text-3xl md:text-4xl lg:text-5xl font-extrabold text-white text-stroke animate-slide-up">
              Quốc Bảo
            </div>
            <div className="text-center md:text-left text-xl md:text-2xl lg:text-3xl font-bold text-white text-stroke animate-slide-up delay-100">
              {t.greeting}
            </div>
            <div className="animate-slide-up delay-200">
              <Typewriter />
            </div>
            <div className="mt-4 md:mt-6 animate-slide-up delay-300">
              <p className="text-center md:text-left text-lg md:text-xl lg:text-2xl font-semibold">
                <span className="bg-linear-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {t.connect}
                </span>
              </p>
            </div>
            <div className="animate-slide-up delay-400">
              <SocialLinks />
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center items-center mt-6 md:mt-0 order-1 md:order-2">
            <div className="avatar-container animate-slide-up delay-200">
              <Image
                className="rounded-full w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 object-cover transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                src="/Images/Avatar/ChinoKafuu.png"
                alt="Avatar"
                width={320}
                height={320}
                priority
              />
            </div>
            <span className="text-white text-stroke animate-slide-up mt-2 delay-300">
              @nupniichan
            </span>
            <div className="online-status inline-flex items-center gap-2 rounded-full bg-white/10 px-3 sm:px-4 py-1 text-xs sm:text-sm text-white shadow-lg backdrop-blur mt-3 sm:mt-4 animate-slide-up delay-400">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <span className="uppercase tracking-[0.2em] text-xs text-gray-200">
                {t.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
