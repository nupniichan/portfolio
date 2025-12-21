"use client";

import { useEffect } from "react";

interface ParticlesBackgroundProps {
  theme: "light" | "dark";
}

declare global {
  interface Window {
    particlesJS: (elementId: string, config: unknown) => void;
    pJSDom: Array<{ pJS: { particles: { move: { enable: boolean } }; fn: { particlesRefresh: () => void } } }>;
  }
}

export default function ParticlesBackground({ theme }: ParticlesBackgroundProps) {
  useEffect(() => {
    const loadParticlesJS = () => {
      return new Promise<void>((resolve) => {
        if (typeof window.particlesJS !== 'undefined') {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.async = true;
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    const initParticles = async () => {
      await loadParticlesJS();

      if (typeof window.particlesJS !== 'undefined') {
        window.particlesJS('particles-js', {
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: '#ffffff'
            },
            shape: {
              type: 'circle'
            },
            opacity: {
              value: 0.5,
              random: false
            },
            size: {
              value: 3,
              random: true
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#ffffff',
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: 3,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              bounce: false
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'repulse'
              },
              onclick: {
                enable: true,
                mode: 'push'
              },
              resize: true
            }
          },
          retina_detect: true
        });
      }
    };

    initParticles();
  }, []);

  useEffect(() => {
    if (window.pJSDom && window.pJSDom[0]) {
      const particles = window.pJSDom[0].pJS;
      if (theme === 'light') {
        particles.particles.move.enable = false;
      } else {
        particles.particles.move.enable = true;
        particles.fn.particlesRefresh();
      }
    }
  }, [theme]);

  return (
    <div
      id="particles-js"
      className="fixed inset-0 w-full h-full z-0"
    />
  );
}