import React, { useState, useRef } from 'react';
import { ArrowDown, Play, Pause, Sparkles, Film, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { siteConfig } from '../data/portfolioData';

interface HeroProps {
  onExploreClick: () => void;
  onFeaturedPlay: () => void;
}

function getYouTubeId(url: string): string {
  if (!url) return '';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : '';
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isYtActive, setIsYtActive] = useState(false);

  const showreel = siteConfig.showreel || {
    title: "Showreel",
    badge: "FEATURED WORK",
    subheadline: "A glimpse into our high-converting motion design, viral pacing, and direct-response visual storytelling.",
    videoUrl: "https://www.youtube.com/embed/MGx7f66I2sI",
    videoType: "youtube" as const
  };

  const ytId = getYouTubeId(showreel.videoUrl) || 'MGx7f66I2sI';
  const isYouTube = showreel.videoType === 'youtube' || Boolean(ytId);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleStartShowreel = () => {
    if (isYouTube) {
      setIsYtActive(true);
    }
    const el = document.getElementById('showreel-player');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Ambient background glow & grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/15 via-orange-500/10 to-rose-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-10 opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow Badge */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-amber-300 uppercase mb-6 backdrop-blur-md shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{siteConfig.hero.badge}</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-5xl leading-[1.08] mb-6">
            {siteConfig.hero.headline}{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              {siteConfig.hero.highlightedText}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-3xl text-base sm:text-lg text-neutral-300 font-normal leading-relaxed mb-10 text-balance">
            {siteConfig.hero.subheadline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <button
              type="button"
              id="hero-explore-works-btn"
              onClick={onExploreClick}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg shadow-amber-400/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>{siteConfig.hero.ctaPrimary}</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>

            <button
              type="button"
              id="hero-showreel-play-btn"
              onClick={handleStartShowreel}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl backdrop-blur-md transition-all cursor-pointer group"
            >
              <div className="w-6 h-6 rounded-full bg-amber-400/20 group-hover:bg-amber-400/30 flex items-center justify-center text-amber-400 transition-colors">
                <Play className="w-3 h-3 fill-amber-400 ml-0.5" />
              </div>
              <span>Watch Showreel</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            🎬 SHOWREEL SECTION (Replacing the previous stats strip)
           ======================================================== */}
        <div id="showreel-player" className="max-w-4xl mx-auto pt-8 border-t border-white/10">
          
          {/* Showreel Headline & Badge */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-semibold tracking-wider text-amber-300 uppercase mb-2.5">
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>{showreel.badge}</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {showreel.title}
            </h2>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mt-2">
              {showreel.subheadline}
            </p>
          </div>

          {/* Video Container with glow and custom controls */}
          <div className="relative group rounded-2xl overflow-hidden border border-white/15 bg-[#0a0b12] shadow-2xl shadow-amber-500/5 aspect-video w-full max-w-4xl mx-auto">
            {isYouTube ? (
              isYtActive ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`}
                  title="Borhan Uddin Showreel"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div
                  onClick={() => setIsYtActive(true)}
                  className="relative w-full h-full cursor-pointer flex items-center justify-center overflow-hidden group/poster"
                >
                  {/* YouTube Thumbnail Background */}
                  <img
                    src={`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`}
                    alt="Borhan Uddin Showreel Video"
                    onError={(e) => {
                      // Fallback to hqdefault if maxresdefault is not available
                      (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
                    }}
                    className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover/poster:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Dark gradient vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />

                  {/* Top overlay badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-xs font-medium text-neutral-200">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    <span>YouTube Showreel</span>
                  </div>

                  {/* Center Play CTA Button */}
                  <div className="relative z-10 flex flex-col items-center gap-3.5 text-center px-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-400 hover:bg-amber-300 text-black flex items-center justify-center shadow-2xl shadow-amber-400/40 group-hover/poster:scale-110 transition-all duration-300">
                      <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-black ml-1" />
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold text-white group-hover/poster:border-amber-400/60 transition-colors shadow-lg">
                      <span>Click to Play Video</span>
                    </div>
                  </div>

                  {/* Bottom hint */}
                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="line-clamp-1">Borhan Uddin • Direct-Response Video & Motion</span>
                    <span className="hidden sm:inline">Plays inside website</span>
                  </div>
                </div>
              )
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={showreel.videoUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onClick={togglePlay}
                  className="w-full h-full object-cover cursor-pointer"
                />

                {/* Subtle dark gradient overlay at bottom for controls visibility */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Top overlay badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-medium text-neutral-200 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Motion Reel Preview</span>
                </div>

                {/* Video Controls Bar */}
                <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 flex items-center justify-between pointer-events-auto">
                  
                  {/* Left: Play/Pause */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/15 text-white flex items-center gap-2 text-xs font-semibold transition-all cursor-pointer shadow-lg"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-white text-white" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-white text-white" />
                          <span>Play</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/15 text-white flex items-center gap-1.5 text-xs transition-all cursor-pointer shadow-lg"
                      aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                          <span className="hidden sm:inline text-xs text-neutral-300">Unmute</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="hidden sm:inline text-xs text-neutral-300">Muted</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Right: Fullscreen & Status */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleFullscreen}
                      className="p-2 rounded-lg bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/15 text-neutral-300 hover:text-white transition-all cursor-pointer shadow-lg"
                      aria-label="Fullscreen"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
