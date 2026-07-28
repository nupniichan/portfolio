import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans } from "next/font/google";
import { ThemeLanguageProvider } from "./components/ThemeLanguageProvider";
import LayoutContent from "./components/LayoutContent";
import { withBasePath } from "./utils/paths";

const notoSans = Noto_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "nupniichan",
  description: "Portfolio of nupniichan - Full Stack Developer",
  icons: {
    icon: withBasePath("/favicon.ico"),
    shortcut: withBasePath("/favicon.ico"),
    apple: withBasePath("/favicon.ico"),
  },
};

const INIT_SCRIPT = `
  (function init() {
    try {
      var savedTheme = localStorage.getItem('portfolio-theme');
      var themeClass = savedTheme === 'dark' ? 'theme-dark' : 'theme-light';
      document.documentElement.classList.remove('theme-light', 'theme-dark');
      document.documentElement.classList.add(themeClass);

      var savedLang = localStorage.getItem('portfolio-language');
      if (savedLang === 'en' || savedLang === 'vi') {
        document.documentElement.setAttribute('lang', savedLang);
        document.documentElement.setAttribute('data-lang', savedLang);
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INIT_SCRIPT }} />
      </head>
      <body className={`${notoSans.className} min-h-screen flex flex-col`}>
        <ThemeLanguageProvider>
          <LayoutContent>{children}</LayoutContent>
        </ThemeLanguageProvider>
      </body>
    </html>
  );
}
