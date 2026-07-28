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

interface LeafParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  swaySpeed: number;
  swayAmp: number;
  phase: number;
  color: string;
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

    let lastFrameTimestamp = performance.now();
    const frameInterval = 1000 / 30;

    const startAnimation = () => {
      if (isIntersecting && !isRunning && !isLoadingRef.current) {
        isRunning = true;
        lastFrameTimestamp = performance.now();
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
    let lightSkyGradient: CanvasGradient;
    let centerVignetteGradient: CanvasGradient;

    let leafParticles: LeafParticle[] = [];
    let ghibliFarHills: { x: number; y: number }[] = [];
    let ghibliMidHills: { x: number; y: number }[] = [];
    let ghibliNearHills: { x: number; y: number }[] = [];
    let ghibliForegroundMeadow: { x: number; y: number }[] = [];

    const leafColors = ["#7C8353", "#9EA853", "#C2B55E", "#D9A752", "#5E6534", "#B8A34E"];

    const drawLeaf = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = color;

      ctx.beginPath();
      ctx.moveTo(0, -size * 2);
      ctx.bezierCurveTo(size * 1.3, -size * 0.8, size * 1.3, size * 0.8, 0, size * 2);
      ctx.bezierCurveTo(-size * 1.3, size * 0.8, -size * 1.3, -size * 0.8, 0, -size * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -size * 1.4);
      ctx.lineTo(0, size * 1.4);
      ctx.stroke();

      ctx.restore();
    };

    const buildGradients = (width: number, height: number) => {
      darkSkyGradient = ctx.createLinearGradient(0, 0, 0, height);
      darkSkyGradient.addColorStop(0.0, "#3b2e7e");
      darkSkyGradient.addColorStop(0.25, "#3d50b8");
      darkSkyGradient.addColorStop(0.55, "#4786ea");
      darkSkyGradient.addColorStop(0.80, "#4589e5");
      darkSkyGradient.addColorStop(1.0, "#2c3f96");

      lightSkyGradient = ctx.createLinearGradient(0, 0, 0, height);
      lightSkyGradient.addColorStop(0.0, "#D8CCA8");
      lightSkyGradient.addColorStop(0.28, "#E6DAC4");
      lightSkyGradient.addColorStop(0.58, "#ECE1CC");
      lightSkyGradient.addColorStop(0.85, "#DDD0B2");
      lightSkyGradient.addColorStop(1.0, "#7C8353");

      centerVignetteGradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        width * 0.12,
        width * 0.5,
        height * 0.5,
        width * 0.55
      );
      centerVignetteGradient.addColorStop(0, "rgba(220, 205, 180, 0.12)");
      centerVignetteGradient.addColorStop(0.6, "rgba(200, 185, 160, 0.05)");
      centerVignetteGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    };

    const initLightAssets = (width: number, height: number) => {
      const leafCount = Math.floor((width * height) / 32000);
      leafParticles = [];
      for (let i = 0; i < leafCount; i++) {
        leafParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.random() * 0.35 + 0.12,
          vy: Math.random() * 0.22 + 0.06,
          size: Math.random() * 2.5 + 1.6,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.03,
          opacity: Math.random() * 0.4 + 0.4,
          swaySpeed: Math.random() * 0.015 + 0.008,
          swayAmp: Math.random() * 1.5 + 0.5,
          phase: Math.random() * Math.PI * 2,
          color: leafColors[Math.floor(Math.random() * leafColors.length)],
        });
      }

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
      buildGradients(canvasWidth, canvasHeight);
      initStars(canvasWidth, canvasHeight);
      initMountains(canvasWidth, canvasHeight);
      initLightAssets(canvasWidth, canvasHeight);
    };

    resize();
    window.addEventListener("resize", resize);

    let elapsedTime = 0;

    const renderLightMode = () => {
      ctx.fillStyle = lightSkyGradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      const sunX = canvasWidth * 0.28 + mouseX * 8;
      const sunY = canvasHeight * 0.24 + mouseY * 5;

      ctx.save();
      ctx.globalCompositeOperation = "screen";

      const sunGlowGrad = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, canvasWidth * 0.35);
      sunGlowGrad.addColorStop(0, "rgba(255, 245, 215, 0.55)");
      sunGlowGrad.addColorStop(0.35, "rgba(240, 220, 170, 0.30)");
      sunGlowGrad.addColorStop(0.75, "rgba(215, 195, 150, 0.12)");
      sunGlowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = sunGlowGrad;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      const sunDiscGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 48);
      sunDiscGrad.addColorStop(0, "#FFFFFF");
      sunDiscGrad.addColorStop(0.4, "#FFFBF0");
      sunDiscGrad.addColorStop(0.85, "rgba(245, 230, 190, 0.7)");
      sunDiscGrad.addColorStop(1, "rgba(245, 230, 190, 0)");
      ctx.fillStyle = sunDiscGrad;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 48, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      ctx.save();
      ctx.fillStyle = centerVignetteGradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.restore();

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

      drawHillLayer(ghibliFarHills, "#7C8353", mouseX * 4, mouseY * 3);
      drawHillLayer(ghibliMidHills, "#60673A", mouseX * 8, mouseY * 5);
      drawHillLayer(ghibliNearHills, "#474E29", mouseX * 14, mouseY * 8);
      drawHillLayer(ghibliForegroundMeadow, "#33381B", mouseX * 22, mouseY * 12);

      ctx.save();
      for (let i = 0; i < leafParticles.length; i++) {
        const particle = leafParticles[i];
        particle.x += particle.vx + Math.sin(elapsedTime * particle.swaySpeed + particle.phase) * particle.swayAmp * 0.3;
        particle.y += particle.vy + Math.cos(elapsedTime * particle.swaySpeed * 0.7) * 0.15;
        particle.rotation += particle.rotationSpeed;

        if (particle.x > canvasWidth + 20) particle.x = -20;
        if (particle.x < -20) particle.x = canvasWidth + 20;
        if (particle.y > canvasHeight + 20) particle.y = -20;
        if (particle.y < -20) particle.y = canvasHeight + 20;

        const pulse = Math.sin(elapsedTime * 2 + particle.phase) * 0.15;
        const currentOpacity = Math.max(0.1, Math.min(0.95, particle.opacity + pulse));

        const positionX = particle.x + mouseX * 4;
        const positionY = particle.y + mouseY * 3;

        ctx.globalAlpha = currentOpacity;
        drawLeaf(ctx, positionX, positionY, particle.size, particle.rotation, particle.color);
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
      elapsedTime += 0.015;

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

