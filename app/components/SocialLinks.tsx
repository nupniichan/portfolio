import Image from "next/image";
import Link from "next/link";

export default function SocialLinks() {
  return (
    <div className="mt-1 flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
      <Link
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/10 hover:bg-white/20 transition"
      >
        <Image
          src="/Images/SocialMedia/facebook.png"
          alt="Facebook"
          width={32}
          height={32}
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full"
        />
      </Link>
      <Link
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/10 hover:bg-white/20 transition"
      >
        <Image
          src="/Images/SocialMedia/github.png"
          alt="GitHub"
          width={32}
          height={32}
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full"
        />
      </Link>
      <Link
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/10 hover:bg-white/20 transition"
      >
        <Image
          src="/Images/SocialMedia/youtube.png"
          alt="YouTube"
          width={32}
          height={32}
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full"
        />
      </Link>
      <Link
        href="https://discord.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/10 hover:bg-white/20 transition"
      >
        <Image
          src="/Images/SocialMedia/discord.png"
          alt="Discord"
          width={32}
          height={32}
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full"
        />
      </Link>
      <Link
        href="https://anilist.co"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/10 hover:bg-white/20 transition"
      >
        <Image
          src="/Images/SocialMedia/Anilist.png"
          alt="Anilist"
          width={32}
          height={32}
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full"
        />
      </Link>
      <Link
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/10 hover:bg-white/20 transition"
      >
        <Image
          src="/Images/SocialMedia/linkedin.png"
          alt="LinkedIn"
          width={32}
          height={32}
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full"
        />
      </Link>
    </div>
  );
}
