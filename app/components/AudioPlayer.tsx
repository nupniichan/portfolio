'use client';

import { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Volume2, Music } from 'lucide-react';

interface AudioPlayerProps {
  className?: string;
}

const AudioPlayer = ({ className = '' }: AudioPlayerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = [
    {
      title: "CLANNAD - The palm of a tiny hand",
      src: "/Musics/CLANNAD  The palm of a tiny hand.mp3"
    },
  ];

  const currentTrack = tracks[currentSongIndex];

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const handlePrevious = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    const wasPlaying = !audio.paused;
    const newIndex = currentSongIndex === 0 ? tracks.length - 1 : currentSongIndex - 1;

    audio.pause();
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

    const wasPlaying = !audio.paused;
    const newIndex = (currentSongIndex + 1) % tracks.length;

    audio.pause();
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
            onClick={() => setIsExpanded(true)}
            className="w-8 h-8 rounded-full bg-[#CCCCFF] hover:bg-[#BBBBFF] text-black shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 animate-in slide-in-from-bottom-4 flex items-center justify-center group"
            title="Open Audio Player"
          >
            <Music className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
          </button>
        </div>
      )}

      {isExpanded && (
        <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
          <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-xl p-2 shadow-2xl animate-in slide-in-from-bottom-4 duration-500 max-w-[220px]">
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#CCCCFF] text-black hover:bg-[#BBBBFF] transition-colors duration-200 text-xs font-bold flex items-center justify-center"
              title="Close"
            >
              ×
            </button>

            <div className="flex items-center gap-1 mb-1">
              <div className="flex items-center gap-1 text-[10px] font-medium">
                <span className="text-[#CCCCFF]">
                  {isPlaying ? 'Playing:' : 'Paused:'}
                </span>
                <div className="overflow-hidden flex-1">
                  <div
                    className="text-white whitespace-nowrap"
                    title={currentTrack.title}
                  >
                    {currentTrack.title}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-1.5 mb-1">
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
                  className={`p-1 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 ${
                    isLooping
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