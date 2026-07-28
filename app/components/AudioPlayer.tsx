'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Volume2, Music } from 'lucide-react';
import { withBasePath } from '../utils/paths';

interface AudioPlayerProps {
  className?: string;
}

const AudioPlayer = ({ className = '' }: AudioPlayerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const lastDataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);

  const tracks = useMemo(() => [
    {
      title: "Kami no manimani／Rerulili - まるもち部 cover",
      src: withBasePath("/Musics/Kami no manimani／Rerulili - まるもち部 cover.mp3")
    },
    {
      title: "Encore Dance - MIMI",
      src: withBasePath("/Musics/Encore dance - MIMI.mp3")
    },
    {
      title: "木もれび青春譜 (Komorebi Seishunfu)",
      src: withBasePath("/Musics/Sunlight through the trees.mp3")
    },
  ], []);

  const currentTrack = tracks[currentSongIndex];

  const initWebAudio = () => {
    if (!audioRef.current) return;

    if (!audioContextRef.current) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64; // 32 bins, ideal for compact visualizer
        analyser.smoothingTimeConstant = 0.8;

        const source = ctx.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(ctx.destination);

        audioContextRef.current = ctx;
        analyserRef.current = analyser;
        sourceRef.current = source;
      } catch (err) {
        console.warn("Web Audio API error:", err);
      }
    }

    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => { });
      }
    };
  }, []);

  const frequencyBufferRef = useRef<Uint8Array<ArrayBuffer> | null>(null);

  useEffect(() => {
    if (!isExpanded) return;

    let animationFrameId: number;
    let lastRenderTime = performance.now();
    const frameInterval = 1000 / 30;

    const renderCanvas = (currentTime: number) => {
      if (isPlaying) {
        animationFrameId = requestAnimationFrame(renderCanvas);
      }

      const elapsed = currentTime - lastRenderTime;
      if (elapsed < frameInterval) return;

      lastRenderTime = currentTime - (elapsed % frameInterval);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const analyser = analyserRef.current;
      const bufferLength = analyser ? analyser.frequencyBinCount : 16;

      if (!frequencyBufferRef.current || frequencyBufferRef.current.length !== bufferLength) {
        frequencyBufferRef.current = new Uint8Array(new ArrayBuffer(bufferLength));
      }
      const dataArray = frequencyBufferRef.current;

      if (analyser && isPlaying) {
        analyser.getByteFrequencyData(dataArray);
        if (!lastDataRef.current || lastDataRef.current.length !== bufferLength) {
          lastDataRef.current = new Uint8Array(new ArrayBuffer(bufferLength));
        }
        lastDataRef.current.set(dataArray);
      } else if (lastDataRef.current) {
        dataArray.set(lastDataRef.current);
      }

      const barCount = 18;
      const gap = 3;
      const totalGaps = gap * (barCount - 1);
      const barWidth = Math.max(2, (width - totalGaps) / barCount);
      const hasRoundRect = typeof ctx.roundRect === "function";

      for (let i = 0; i < barCount; i++) {
        let val = 0;

        if (isPlaying || lastDataRef.current) {
          const sampleIdx = Math.floor((i / barCount) * (bufferLength * 0.7));
          val = dataArray[sampleIdx] / 255;
        } else {
          val = 0.08 + 0.07 * Math.sin(i * 0.6);
        }

        const barHeight = Math.max(3, val * (height * 0.85));
        const x = i * (barWidth + gap);
        const y = height - barHeight;

        const gradient = ctx.createLinearGradient(0, y, 0, height);
        gradient.addColorStop(0, "#FFFFFF");
        gradient.addColorStop(0.4, "#CCCCFF");
        gradient.addColorStop(1, isPlaying ? "rgba(204, 204, 255, 0.3)" : "rgba(204, 204, 255, 0.18)");

        ctx.fillStyle = gradient;

        const radius = Math.min(barWidth / 2, barHeight / 2);
        ctx.beginPath();
        if (hasRoundRect) {
          ctx.roundRect(x, y, barWidth, barHeight, [radius, radius, 0, 0]);
        } else {
          ctx.rect(x, y, barWidth, barHeight);
        }
        ctx.fill();
      }
    };

    animationFrameId = requestAnimationFrame(renderCanvas);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPlaying, isExpanded]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsExpanded(false);
      setIsClosing(false);
    }, 300);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    initWebAudio();

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const handlePrevious = () => {
    const audio = audioRef.current;
    if (!audio) return;

    initWebAudio();

    if (currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    const wasPlaying = !audio.paused;
    const newIndex = currentSongIndex === 0 ? tracks.length - 1 : currentSongIndex - 1;

    audio.pause();
    lastDataRef.current = null;
    setCurrentSongIndex(newIndex);
    setCurrentTime(0);

    if (wasPlaying) {
      setTimeout(() => {
        const a = audioRef.current;
        if (!a) return;
        a.currentTime = 0;
        a.play();
      }, 0);
    }
  };

  const handleNext = () => {
    const audio = audioRef.current;
    if (!audio) return;

    initWebAudio();

    const wasPlaying = !audio.paused;
    const newIndex = (currentSongIndex + 1) % tracks.length;

    audio.pause();
    lastDataRef.current = null;
    setCurrentSongIndex(newIndex);
    setCurrentTime(0);

    if (wasPlaying) {
      setTimeout(() => {
        const a = audioRef.current;
        if (!a) return;
        a.currentTime = 0;
        a.play();
      }, 0);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration || 0);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    initWebAudio();
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleEnded = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isLooping) {
      audio.currentTime = 0;
      audio.play();
      return;
    }

    const newIndex = (currentSongIndex + 1) % tracks.length;
    setCurrentSongIndex(newIndex);
    setCurrentTime(0);

    setTimeout(() => {
      const a = audioRef.current;
      if (!a) return;
      a.currentTime = 0;
      a.play();
    }, 0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
      />

      {!isExpanded && (
        <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
          <button
            onClick={() => {
              setIsExpanded(true);
              initWebAudio();
              setTimeout(() => {
                const audio = audioRef.current;
                if (audio && audio.paused) {
                  audio.play();
                }
              }, 100);
            }}
            className={`w-8 h-8 rounded-full bg-[#CCCCFF] hover:bg-[#BBBBFF] text-black shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 animate-in slide-in-from-bottom-4 flex items-center justify-center group relative ${isPlaying ? 'animate-pulse' : ''}`}
            title="Open Audio Player"
          >
            {isPlaying && (
              <span className="absolute inset-0 rounded-full bg-[#CCCCFF] animate-ping opacity-40" />
            )}
            <Music className={`w-4 h-4 group-hover:scale-110 transition-transform duration-200 ${isPlaying ? 'animate-bounce' : ''}`} />
          </button>
        </div>
      )}

      {isExpanded && (
        <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
          <div className={`bg-black/80 backdrop-blur-md border border-white/20 rounded-xl p-2.5 shadow-2xl max-w-[230px] relative ${isClosing ? 'animate-audio-player-close' : 'animate-audio-player-open'}`}>
            <button
              onClick={handleClose}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#CCCCFF] text-black hover:bg-[#BBBBFF] transition-colors duration-200 text-xs font-bold flex items-center justify-center z-10"
              title="Close"
            >
              ×
            </button>

            <div className="flex items-center gap-1 mb-1.5 pr-6">
              <div className="flex items-center gap-1 text-[10px] font-medium flex-1 min-w-0">
                <span className="text-[#CCCCFF] whitespace-nowrap">
                  {isPlaying ? 'Playing:' : 'Paused:'}
                </span>
                <div className="overflow-hidden flex-1 min-w-0 relative">
                  <div
                    className="text-white whitespace-nowrap animate-scroll-text"
                    title={currentTrack.title}
                  >
                    <span>{currentTrack.title}</span>
                    <span className="ml-4">{currentTrack.title}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mb-2">
              <canvas
                ref={canvasRef}
                width={204}
                height={30}
                className="w-full h-7 rounded bg-black/50 border border-white/10"
              />
            </div>

            <div className="flex items-center justify-between gap-1.5 mb-1.5">
              <div className="flex items-center gap-1">
                <Volume2 className="w-2.5 h-2.5 text-[#CCCCFF]" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="slider w-10 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #CCCCFF 0%, #CCCCFF ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
                  }}
                />
              </div>

              <div className="flex items-center gap-0.5">
                <button
                  onClick={handlePrevious}
                  className="p-1 rounded-full bg-[#CCCCFF]/20 hover:bg-[#CCCCFF]/30 text-[#CCCCFF] transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Previous"
                >
                  <SkipBack className="w-2.5 h-2.5" />
                </button>

                <button
                  onClick={togglePlay}
                  className="p-1.5 rounded-full bg-[#CCCCFF] hover:bg-[#BBBBFF] text-black transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>

                <button
                  onClick={handleNext}
                  className="p-1 rounded-full bg-[#CCCCFF]/20 hover:bg-[#CCCCFF]/30 text-[#CCCCFF] transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Next"
                >
                  <SkipForward className="w-2.5 h-2.5" />
                </button>

                <button
                  onClick={() => setIsLooping(!isLooping)}
                  className={`p-1 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 ${isLooping
                    ? 'bg-[#CCCCFF] text-black shadow-lg'
                    : 'bg-[#CCCCFF]/20 hover:bg-[#CCCCFF]/30 text-[#CCCCFF]'
                    }`}
                  title="Loop"
                >
                  <Repeat className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[8px] text-white/70 min-w-[22px]">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleProgressChange}
                className="slider flex-1 h-0.5 bg-white/20 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #CCCCFF 0%, #CCCCFF ${(currentTime / (duration || 100)) * 100}%, rgba(255,255,255,0.2) ${(currentTime / (duration || 100)) * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
              <span className="text-[8px] text-white/70 min-w-[22px]">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AudioPlayer;