export type NavKey = "home" | "about" | "projects" | "education" | "contact";

export type NavigationItem = {
  href: string;
  key: NavKey;
};

export const NAV_ITEMS: readonly NavigationItem[] = [
  { href: "/", key: "home" },
  { href: "/about-me", key: "about" },
  { href: "/projects", key: "projects" },
  { href: "/education-work", key: "education" },
  { href: "/contact", key: "contact" },
];

export const NAV_LABELS: Record<"en", Record<NavKey, string>> &
  Record<"vi", Record<NavKey, string>> = {
  en: {
    home: "Home",
    about: "About me",
    projects: "Projects",
    education: "Education & Work",
    contact: "Contact",
  },
  vi: {
    home: "Trang chủ",
    about: "Giới thiệu",
    projects: "Dự án",
    education: "Học vấn & Công việc",
    contact: "Liên hệ",
  },
};

