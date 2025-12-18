import Image from "next/image";
import Link from "next/link";

export default function SocialLinks() {
  return (
    <div className="mt-1 flex flex-wrap justify-center md:justify-start gap-1.5 sm:gap-2">
      <Link
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/10 hover:bg-white/20 hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-transform transition-shadow transition-colors duration-200"
      >
        <Image
          src="/Images/SocialMedia/facebook.png"
          alt="Facebook"
          width={16}
          height={16}
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full"
        />
      </Link>
      <Link
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/10 hover:bg-white/20 hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-transform transition-shadow transition-colors duration-200"
      >
        <Image
          src="/Images/SocialMedia/github.png"
          alt="GitHub"
          width={16}
          height={16}
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full"
        />
      </Link>
      <Link
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/10 hover:bg-white/20 hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-transform transition-shadow transition-colors duration-200"
      >
        <Image
          src="/Images/SocialMedia/youtube.png"
          alt="YouTube"
          width={16}
          height={16}
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full"
        />
      </Link>
      <Link
        href="https://discord.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/10 hover:bg-white/20 hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-transform transition-shadow transition-colors duration-200"
      >
        <Image
          src="/Images/SocialMedia/discord.png"
          alt="Discord"
          width={16}
          height={16}
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full"
        />
      </Link>
      <Link
        href="https://anilist.co"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/10 hover:bg-white/20 hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-transform transition-shadow transition-colors duration-200"
      >
        <Image
          src="/Images/SocialMedia/Anilist.png"
          alt="Anilist"
          width={16}
          height={16}
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full"
        />
      </Link>
      <Link
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/10 hover:bg-white/20 hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-transform transition-shadow transition-colors duration-200"
      >
        <Image
          src="/Images/SocialMedia/linkedin.png"
          alt="LinkedIn"
          width={16}
          height={16}
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full"
        />
      </Link>
    </div>
  );
}
