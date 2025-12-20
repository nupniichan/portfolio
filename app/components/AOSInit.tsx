"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AOSInit() {
  const pathname = usePathname();

  useEffect(() => {
    // ... load AOS logic ...
    const loadAOS = () => {
      return new Promise<void>((resolve) => {
        if ((window as any).AOS) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js";
        script.async = true;
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    const initAOS = async () => {
      // Load AOS CSS
      if (!document.getElementById("aos-css")) {
        const link = document.createElement("link");
        link.id = "aos-css";
        link.rel = "stylesheet";
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css";
        document.head.appendChild(link);
      }

      await loadAOS();
      if ((window as any).AOS) {
        (window as any).AOS.init({
          duration: 800,
          easing: "ease-in-out",
          once: true,
        });
      }
    };

    initAOS();
  }, []);

  // Refresh AOS on route change
  useEffect(() => {
    if ((window as any).AOS) {
      (window as any).AOS.refresh();
    }
  }, [pathname]);

  return null;
}

