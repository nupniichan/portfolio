"use client";

import React, { useEffect, useRef } from "react";
import { useThemeLanguage } from "./ThemeLanguageProvider";

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  maxOpacity: number;
  width: number;
  life: number;
  maxLife: number;
}

interface PollenParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  swaySpeed: number;
  swayAmp: number;
  phase: number;
  color: string;
}

interface Cloud {
  x: number;
  y: number;
  scale: number;
  speed: number;
  opacity: number;
}

interface BackgroundProps {
  isLoading?: boolean;
}

export default function Background({ isLoading = false }: BackgroundProps) {
  const { theme } = useThemeLanguage();
  const themeRef = useRef(theme);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isLoadingRef = useRef(isLoading);
  const startAnimationRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    isLoadingRef.current = isLoading;
    if (!isLoading && startAnimationRef.current) {
      startAnimationRef.current();
    }
  }, [isLoading]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = false;
    let isIntersecting = true;
    let canvasWidth = 0;
    let canvasHeight = 0;

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const startAnimation = () => {
      if (isIntersecting && !isRunning && !isLoadingRef.current) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(tick);
      }
    };
    startAnimationRef.current = startAnimation;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    let stars: Star[] = [];
    const starColors = ["#ffffff", "#e0e7ff", "#c7d2fe", "#ddd6fe", "#fae8ff", "#bae6fd"];
    const starTextureCache = new Map<string, HTMLCanvasElement>();

    starColors.forEach((color) => {
      const offscreenCanvas = document.createElement("canvas");
      const radius = 32;
      offscreenCanvas.width = radius * 2;
      offscreenCanvas.height = radius * 2;
      const offscreenCtx = offscreenCanvas.getContext("2d");
      if (offscreenCtx) {
        const textureGradient = offscreenCtx.createRadialGradient(radius, radius, 0, radius, radius, radius);
        textureGradient.addColorStop(0, "#ffffff");
        textureGradient.addColorStop(0.25, color);
        textureGradient.addColorStop(0.6, `${color}44`);
        textureGradient.addColorStop(1.0, "rgba(255, 255, 255, 0)");
        offscreenCtx.fillStyle = textureGradient;
        offscreenCtx.beginPath();
        offscreenCtx.arc(radius, radius, radius, 0, Math.PI * 2);
        offscreenCtx.fill();
      }
      starTextureCache.set(color, offscreenCanvas);
    });

    const initStars = (width: number, height: number) => {
      const starCount = Math.floor((width * height) / 6000);
      stars = [];
      for (let i = 0; i < starCount; i++) {
        const randomValue = Math.random();
        let size: number;
        if (randomValue < 0.7) {
          size = Math.random() * 0.5 + 0.3;
        } else if (randomValue < 0.95) {
          size = Math.random() * 0.6 + 0.8;
        } else {
          size = Math.random() * 0.8 + 1.4;
        }

        stars.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.78),
          size,
          baseOpacity: Math.random() * 0.6 + 0.35,
          twinkleSpeed: Math.random() * 0.025 + 0.008,
          twinklePhase: Math.random() * Math.PI * 2,
          color: starColors[Math.floor(Math.random() * starColors.length)],
        });
      }
    };

    const shootingStars: ShootingStar[] = [];
    let nextShootingStarTime = Date.now() + Math.random() * 2000 + 1000;

    const spawnShootingStar = (width: number, height: number) => {
      const directionPreset = Math.floor(Math.random() * 4);
      let angle: number;

      if (directionPreset === 0) {
        angle = (Math.PI * (15 + Math.random() * 30)) / 180;
      } else if (directionPreset === 1) {
        angle = (Math.PI * (35 + Math.random() * 30)) / 180;
      } else if (directionPreset === 2) {
        angle = (Math.PI * (115 + Math.random() * 30)) / 180;
      } else {
        angle = (Math.PI * (135 + Math.random() * 30)) / 180;
      }

      const speed = Math.random() * 8 + 12;
      const length = Math.random() * 180 + 140;

      const startX = Math.random() * width;
      const startY = Math.random() * (height * 0.5);

      shootingStars.push({
        x: startX,
        y: startY,
        length,
        speed,
        angle,
        opacity: 0,
        maxOpacity: Math.random() * 0.4 + 0.6,
        width: Math.random() * 1.5 + 1.2,
        life: 0,
        maxLife: Math.floor(Math.random() * 40 + 60),
      });
    };

    const generateMountainPoints = (
      width: number,
      baseY: number,
      amplitude: number,
      step: number,
      seed: number
    ) => {
      const points: { x: number; y: number }[] = [];
      const numSteps = Math.ceil(width / step) + 2;

      for (let i = 0; i <= numSteps; i++) {
        const x = i * step - step;
        const primaryWave = Math.sin(i * 0.3 + seed) * amplitude;
        const secondaryWave = Math.sin(i * 0.8 + seed * 2) * (amplitude * 0.4);
        const tertiaryWave = Math.sin(i * 1.5 + seed * 3) * (amplitude * 0.2);
        const y = baseY + primaryWave + secondaryWave + tertiaryWave;
        points.push({ x, y });
      }

      return points;
    };

    let mountainBackPoints: { x: number; y: number }[] = [];
    let mountainMidPoints: { x: number; y: number }[] = [];
    let mountainFrontPoints: { x: number; y: number }[] = [];

    const initMountains = (width: number, height: number) => {
      mountainBackPoints = generateMountainPoints(width, height * 0.72, height * 0.08, 40, 1.2);
      mountainMidPoints = generateMountainPoints(width, height * 0.8, height * 0.06, 30, 4.5);
      mountainFrontPoints = generateMountainPoints(width, height * 0.88, height * 0.04, 20, 8.9);
    };

    let darkSkyGradient: CanvasGradient;

    const updateDarkSkyGradient = (height: number) => {
      darkSkyGradient = ctx.createLinearGradient(0, 0, 0, height);
      darkSkyGradient.addColorStop(0.0, "#3b2e7e");
      darkSkyGradient.addColorStop(0.25, "#3d50b8");
      darkSkyGradient.addColorStop(0.55, "#4786ea");
      darkSkyGradient.addColorStop(0.80, "#4589e5");
      darkSkyGradient.addColorStop(1.0, "#2c3f96");
    };

    let lightSkyGradient: CanvasGradient;
    let pollenParticles: PollenParticle[] = [];
    let clouds: Cloud[] = [];
    let ghibliFarHills: { x: number; y: number }[] = [];
    let ghibliMidHills: { x: number; y: number }[] = [];
    let ghibliNearHills: { x: number; y: number }[] = [];
    let ghibliForegroundMeadow: { x: number; y: number }[] = [];

    const pollenColors = ["#FFD166", "#FF9933", "#E85D04", "#FFBA08", "#F48C06"];

    const initLightAssets = (width: number, height: number) => {
      lightSkyGradient = ctx.createLinearGradient(0, 0, 0, height);
      lightSkyGradient.addColorStop(0.0, "#1E1F38");
      lightSkyGradient.addColorStop(0.22, "#5A3250");
      lightSkyGradient.addColorStop(0.45, "#BA523E");
      lightSkyGradient.addColorStop(0.68, "#E87A3E");
      lightSkyGradient.addColorStop(0.85, "#F7A859");
      lightSkyGradient.addColorStop(1.0, "#261C2C");

      const pollenCount = Math.floor((width * height) / 28000);
      pollenParticles = [];
      for (let i = 0; i < pollenCount; i++) {
        pollenParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.random() * 0.3 + 0.1,
          vy: -(Math.random() * 0.2 + 0.08),
          size: Math.random() * 1.8 + 0.6,
          opacity: Math.random() * 0.35 + 0.15,
          swaySpeed: Math.random() * 0.015 + 0.008,
          swayAmp: Math.random() * 1.2 + 0.4,
          phase: Math.random() * Math.PI * 2,
          color: pollenColors[Math.floor(Math.random() * pollenColors.length)],
        });
      }

      clouds = [
        { x: width * 0.05, y: height * 0.18, scale: 0.9, speed: 0.12, opacity: 0.8 },
        { x: width * 0.42, y: height * 0.10, scale: 1.2, speed: 0.08, opacity: 0.85 },
        { x: width * 0.78, y: height * 0.24, scale: 0.75, speed: 0.15, opacity: 0.7 },
      ];

      ghibliFarHills = generateMountainPoints(width, height * 0.58, height * 0.09, 50, 2.7);
      ghibliMidHills = generateMountainPoints(width, height * 0.68, height * 0.07, 35, 6.1);
      ghibliNearHills = generateMountainPoints(width, height * 0.79, height * 0.05, 25, 9.4);
      ghibliForegroundMeadow = generateMountainPoints(width, height * 0.89, height * 0.03, 18, 12.8);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;

      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      ctx.scale(dpr, dpr);
      updateDarkSkyGradient(canvasHeight);
      initStars(canvasWidth, canvasHeight);
      initMountains(canvasWidth, canvasHeight);
      initLightAssets(canvasWidth, canvasHeight);
    };

    resize();
    window.addEventListener("resize", resize);

    let elapsedTime = 0;

    const renderCloud = (cloud: Cloud, elapsedTime: number) => {
      ctx.save();
      const currentX = (cloud.x + elapsedTime * cloud.speed * 20) % (canvasWidth + 300) - 150;
      const currentY = cloud.y;
      ctx.globalAlpha = cloud.opacity;

      ctx.fillStyle = "rgba(255, 200, 150, 0.8)";
      ctx.beginPath();
      ctx.arc(currentX, currentY, 45 * cloud.scale, 0, Math.PI * 2);
      ctx.arc(currentX + 35 * cloud.scale, currentY - 15 * cloud.scale, 35 * cloud.scale, 0, Math.PI * 2);
      ctx.arc(currentX + 70 * cloud.scale, currentY, 38 * cloud.scale, 0, Math.PI * 2);
      ctx.arc(currentX + 30 * cloud.scale, currentY + 15 * cloud.scale, 40 * cloud.scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(90, 45, 75, 0.55)";
      ctx.beginPath();
      ctx.arc(currentX + 25 * cloud.scale, currentY + 12 * cloud.scale, 36 * cloud.scale, 0, Math.PI * 2);
      ctx.arc(currentX + 60 * cloud.scale, currentY + 10 * cloud.scale, 30 * cloud.scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const renderLightMode = () => {
      ctx.fillStyle = lightSkyGradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      const sunX = canvasWidth * 0.78 + mouseX * 8;
      const sunY = canvasHeight * 0.51 + mouseY * 5;

      ctx.save();
      ctx.globalCompositeOperation = "screen";

      const sunGlowGrad = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, canvasWidth * 0.35);
      sunGlowGrad.addColorStop(0, "rgba(232, 122, 62, 0.55)");
      sunGlowGrad.addColorStop(0.35, "rgba(247, 168, 89, 0.30)");
      sunGlowGrad.addColorStop(0.75, "rgba(90, 50, 80, 0.12)");
      sunGlowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = sunGlowGrad;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      const sunDiscGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 48);
      sunDiscGrad.addColorStop(0, "#FFF2D1");
      sunDiscGrad.addColorStop(0.4, "#FF9933");
      sunDiscGrad.addColorStop(0.8, "#D94E34");
      sunDiscGrad.addColorStop(1, "rgba(217, 78, 52, 0)");
      ctx.fillStyle = sunDiscGrad;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 48, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      ctx.save();
      const centerVignette = ctx.createRadialGradient(
        canvasWidth * 0.5,
        canvasHeight * 0.5,
        canvasWidth * 0.12,
        canvasWidth * 0.5,
        canvasHeight * 0.5,
        canvasWidth * 0.55
      );
      centerVignette.addColorStop(0, "rgba(15, 12, 24, 0.35)");
      centerVignette.addColorStop(0.6, "rgba(20, 16, 30, 0.18)");
      centerVignette.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = centerVignette;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.restore();

      clouds.forEach((cloud) => renderCloud(cloud, elapsedTime));

      const drawHillLayer = (
        points: { x: number; y: number }[],
        fillColor: string,
        parallaxOffsetX: number,
        parallaxOffsetY: number
      ) => {
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.moveTo(0, canvasHeight);

        if (points.length > 0) {
          ctx.lineTo(points[0].x + parallaxOffsetX, points[0].y + parallaxOffsetY);
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(
              points[i].x + parallaxOffsetX,
              points[i].y + parallaxOffsetY
            );
          }
        }

        ctx.lineTo(canvasWidth, canvasHeight);
        ctx.closePath();
        ctx.fill();
      };

      drawHillLayer(ghibliFarHills, "#4A2E43", mouseX * 4, mouseY * 3);
      drawHillLayer(ghibliMidHills, "#362134", mouseX * 8, mouseY * 5);
      drawHillLayer(ghibliNearHills, "#261729", mouseX * 14, mouseY * 8);
      drawHillLayer(ghibliForegroundMeadow, "#1A101D", mouseX * 22, mouseY * 12);

      ctx.save();
      for (let i = 0; i < pollenParticles.length; i++) {
        const p = pollenParticles[i];
        p.x += p.vx + Math.sin(elapsedTime * p.swaySpeed + p.phase) * p.swayAmp * 0.2;
        p.y += p.vy;

        if (p.x > canvasWidth) p.x = 0;
        if (p.y < 0) p.y = canvasHeight;

        const pulse = Math.sin(elapsedTime * 2 + p.phase) * 0.2;
        const currentOpacity = Math.max(0.1, Math.min(0.95, p.opacity + pulse));

        const pX = p.x + mouseX * (p.size * 2);
        const pY = p.y + mouseY * (p.size * 2);

        ctx.globalAlpha = currentOpacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(pX, pY, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const renderDarkMode = () => {
      ctx.fillStyle = darkSkyGradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.save();
      ctx.globalCompositeOperation = "screen";

      const violetNebulaX = canvasWidth * 0.15 + mouseX * 15;
      const violetNebulaY = canvasHeight * 0.2 + mouseY * 12;
      const violetNebulaGradient = ctx.createRadialGradient(
        violetNebulaX,
        violetNebulaY,
        20,
        violetNebulaX,
        violetNebulaY,
        canvasWidth * 0.45
      );
      violetNebulaGradient.addColorStop(0, "rgba(186, 104, 255, 0.45)");
      violetNebulaGradient.addColorStop(0.4, "rgba(147, 85, 247, 0.25)");
      violetNebulaGradient.addColorStop(0.7, "rgba(61, 80, 184, 0.1)");
      violetNebulaGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = violetNebulaGradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      const cyanNebulaX = canvasWidth * 0.85 - mouseX * 18;
      const cyanNebulaY = canvasHeight * 0.25 - mouseY * 12;
      const cyanNebulaGradient = ctx.createRadialGradient(
        cyanNebulaX,
        cyanNebulaY,
        30,
        cyanNebulaX,
        cyanNebulaY,
        canvasWidth * 0.5
      );
      cyanNebulaGradient.addColorStop(0, "rgba(113, 243, 249, 0.45)");
      cyanNebulaGradient.addColorStop(0.35, "rgba(113, 243, 249, 0.25)");
      cyanNebulaGradient.addColorStop(0.7, "rgba(71, 134, 234, 0.1)");
      cyanNebulaGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = cyanNebulaGradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      const horizonX = canvasWidth * 0.5 + mouseX * 10;
      const horizonY = canvasHeight * 0.7 - mouseY * 5;
      const horizonGlowGradient = ctx.createRadialGradient(
        horizonX,
        horizonY,
        40,
        horizonX,
        horizonY,
        canvasWidth * 0.75
      );
      horizonGlowGradient.addColorStop(0, "rgba(113, 243, 249, 0.18)");
      horizonGlowGradient.addColorStop(0.5, "rgba(69, 137, 229, 0.1)");
      horizonGlowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = horizonGlowGradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.restore();

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const twinkle = Math.sin(elapsedTime * star.twinkleSpeed * 60 + star.twinklePhase);
        const opacity = Math.min(1.0, Math.max(0.15, star.baseOpacity + twinkle * 0.35));

        const starPositionX = star.x + mouseX * (star.size * 1.5);
        const starPositionY = star.y + mouseY * (star.size * 1.5);

        if (star.size < 0.9) {
          ctx.fillStyle = star.color;
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.arc(starPositionX, starPositionY, star.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const glowRadius = star.size * 2.8;
          ctx.globalAlpha = opacity;

          const cachedTexture = starTextureCache.get(star.color);
          if (cachedTexture) {
            ctx.drawImage(
              cachedTexture,
              starPositionX - glowRadius,
              starPositionY - glowRadius,
              glowRadius * 2,
              glowRadius * 2
            );
          }

          if (star.size > 1.4 && opacity > 0.6) {
            const flareLength = star.size * 3.2 * (opacity * 0.8);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.4})`;
            ctx.lineWidth = 0.5;

            ctx.beginPath();
            ctx.moveTo(starPositionX - flareLength, starPositionY);
            ctx.lineTo(starPositionX + flareLength, starPositionY);
            ctx.moveTo(starPositionX, starPositionY - flareLength);
            ctx.lineTo(starPositionX, starPositionY + flareLength);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1.0;

      const now = Date.now();
      if (now > nextShootingStarTime) {
        spawnShootingStar(canvasWidth, canvasHeight);
        nextShootingStarTime = now + Math.random() * 4000 + 3000;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const shootingStar = shootingStars[i];
        shootingStar.life += 1;

        if (shootingStar.life < shootingStar.maxLife * 0.3) {
          shootingStar.opacity = (shootingStar.life / (shootingStar.maxLife * 0.3)) * shootingStar.maxOpacity;
        } else {
          shootingStar.opacity =
            (1 - (shootingStar.life - shootingStar.maxLife * 0.3) / (shootingStar.maxLife * 0.7)) *
            shootingStar.maxOpacity;
        }

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;

        const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
        const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;

        if (shootingStar.opacity > 0) {
          ctx.save();
          const starTrailGradient = ctx.createLinearGradient(shootingStar.x, shootingStar.y, tailX, tailY);
          starTrailGradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
          starTrailGradient.addColorStop(0.2, `rgba(186, 230, 253, ${shootingStar.opacity * 0.8})`);
          starTrailGradient.addColorStop(0.6, `rgba(147, 197, 253, ${shootingStar.opacity * 0.3})`);
          starTrailGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.strokeStyle = starTrailGradient;
          ctx.lineWidth = shootingStar.width;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          ctx.fillStyle = `rgba(255, 255, 255, ${shootingStar.opacity})`;
          ctx.beginPath();
          ctx.arc(shootingStar.x, shootingStar.y, shootingStar.width * 1.2, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }

        if (shootingStar.life >= shootingStar.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

      const drawMountainLayer = (
        points: { x: number; y: number }[],
        color: string,
        parallaxOffsetX: number,
        parallaxOffsetY: number
      ) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, canvasHeight);

        if (points.length > 0) {
          ctx.lineTo(points[0].x + parallaxOffsetX, points[0].y + parallaxOffsetY);
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(
              points[i].x + parallaxOffsetX,
              points[i].y + parallaxOffsetY
            );
          }
        }

        ctx.lineTo(canvasWidth, canvasHeight);
        ctx.closePath();
        ctx.fill();
      };

      drawMountainLayer(mountainBackPoints, "#324bb0", mouseX * 6, mouseY * 4);
      drawMountainLayer(mountainMidPoints, "#24368c", mouseX * 12, mouseY * 8);
      drawMountainLayer(mountainFrontPoints, "#192468", mouseX * 20, mouseY * 12);
    };

    const render = () => {
      elapsedTime += 0.016;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      if (themeRef.current === "light") {
        renderLightMode();
      } else {
        renderDarkMode();
      }
    };

    const tick = () => {
      if (!isIntersecting || isLoadingRef.current) {
        isRunning = false;
        return;
      }
      render();
      animationFrameId = requestAnimationFrame(tick);
    };

    isRunning = true;
    tick();

    return () => {
      startAnimationRef.current = null;
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
