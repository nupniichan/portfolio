import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "../utils/paths";

export default function SocialLinks() {
  return (
    <div className="mt-1 flex flex-wrap justify-center md:justify-start gap-1.5 sm:gap-2">
      <Link
        href="https://www.facebook.com/nupniichan/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/10 hover:bg-white/20 hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-transform transition-shadow transition-colors duration-200"
      >
        <Image
          src={withBasePath("/Images/SocialMedia/facebook.webp")}
          alt="Facebook"
          width={16}
          height={16}
          className="w-6 h-6 rounded-full"
        />
      </Link>
      <Link
        href="https://github.com/nupniichan"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/10 hover:bg-white/20 hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-transform transition-shadow transition-colors duration-200"
      >
        <Image
          src={withBasePath("/Images/SocialMedia/github.webp")}
          alt="GitHub"
          width={16}
          height={16}
          className="w-6 h-6 rounded-full"
        />
      </Link>
      <Link
        href="https://www.youtube.com/@nupniichan"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/10 hover:bg-white/20 hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-transform transition-shadow transition-colors duration-200"
      >
        <Image
          src={withBasePath("/Images/SocialMedia/youtube.webp")}
          alt="YouTube"
          width={16}
          height={16}
          className="w-6 h-6 rounded-full"
        />
      </Link>
      <Link
        href="https://discord.gg/W2nye2nfAn"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/10 hover:bg-white/20 hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-transform transition-shadow transition-colors duration-200"
      >
        <Image
          src={withBasePath("/Images/SocialMedia/discord.webp")}
          alt="Discord"
          width={16}
          height={16}
          className="w-6 h-6 rounded-full"
        />
      </Link>
      <Link
        href="https://anilist.co/user/nupniichan/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/10 hover:bg-white/20 hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-transform transition-shadow transition-colors duration-200"
      >
        <Image
          src={withBasePath("/Images/SocialMedia/Anilist.webp")}
          alt="Anilist"
          width={16}
          height={16}
          className="w-6 h-6 rounded-full"
        />
      </Link>
      <Link
        href="https://www.linkedin.com/in/nguyenphiquocbao/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/10 hover:bg-white/20 hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-transform transition-shadow transition-colors duration-200"
      >
        <Image
          src={withBasePath("/Images/SocialMedia/linkedin.webp")}
          alt="LinkedIn"
          width={16}
          height={16}
          className="w-6 h-6 rounded-full"
        />
      </Link>
    </div>
  );
}
