import React, { useState, useEffect, useRef, useCallback } from 'react';
import { graphicsDesignData, siteConfig } from '../data/portfolioData';
import { GraphicDesignItem } from '../types';
import { 
  Palette, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Play, 
  Pause, 
  X, 
  ArrowRight,
  Sparkles,
  ExternalLink,
  MoveHorizontal,
  Layers
} from 'lucide-react';

interface GraphicsDesignSectionProps {
  onSelectService?: (serviceTitle: string) => void;
}

const formatImageUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  return url.startsWith('/') ? url : `/${url}`;
};

export const GraphicsDesignSection: React.FC<GraphicsDesignSectionProps> = ({ onSelectService }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<GraphicDesignItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragCurrentX, setDragCurrentX] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const lastWheelTime = useRef<number>(0);
  const totalItems = graphicsDesignData.length;

  const currentItem = graphicsDesignData[currentIndex] || graphicsDesignData[0];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  // Synchronize horizontal preview strip with active index
  useEffect(() => {
    if (scrollTrackRef.current) {
      const activeEl = scrollTrackRef.current.children[currentIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }
  }, [currentIndex]);

  // Autoplay support
  useEffect(() => {
    if (!isAutoplay || totalItems <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoplay, totalItems, handleNext]);

  // 🖱️ Cursor Wheel Scroll:
  // "যেন কারসার নিয়ে গেলে। ডান থেকে বামে স্ক্রল করালে ওইটা চেঞ্জ হয়।"
  // When cursor is placed over the slider container, scrolling changes the slide
  useEffect(() => {
    const sliderEl = sliderRef.current;
    if (!sliderEl) return;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      // Throttle wheel events to change 1 slide at a time comfortably (350ms cooldown)
      if (now - lastWheelTime.current < 350) {
        return;
      }

      // Check horizontal or vertical scroll intent
      // DeltaX > 0 or DeltaY > 0 means scrolling right/down (Next slide)
      // DeltaX < 0 or DeltaY < 0 means scrolling left/up (Previous slide)
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      if (Math.abs(delta) > 15) {
        e.preventDefault(); // Prevent page jitter while interacting with slider
        lastWheelTime.current = now;

        if (delta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    sliderEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      sliderEl.removeEventListener('wheel', handleWheel);
    };
  }, [handleNext, handlePrev]);

  // 🖱️ Drag & Swipe Support: Drag cursor left/right to change slide
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragCurrentX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = dragCurrentX - dragStartX;
    const threshold = 40; // Pixels needed to trigger slide change
    if (diff < -threshold) {
      // Dragged right to left -> Next slide
      handleNext();
    } else if (diff > threshold) {
      // Dragged left to right -> Prev slide
      handlePrev();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setDragCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = dragCurrentX - dragStartX;
    const threshold = 35;
    if (diff < -threshold) {
      handleNext();
    } else if (diff > threshold) {
      handlePrev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const handleRequestDesign = () => {
    if (selectedArtwork) setSelectedArtwork(null);
    if (onSelectService) {
      onSelectService('Thumbnail & Graphic Design');
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="graphics" className="py-20 md:py-28 border-t border-white/5 relative bg-[#090b12] overflow-hidden">
      
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* 🏷️ CONTAINER HEADLINE: "গ্রাফিক্স" (GRAPHICS) */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 shadow-sm">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>GRAPHICS SHOWCASE</span>
          </div>

          {/* Explicitly named "গ্রাফিক্স" as requested */}
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3 leading-tight">
            গ্রাফিক্স (Graphics)
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto mb-4">
            ৮টি নির্বাচিত প্রজেক্টের ধারাবাহিক স্লাইডার। কারসার নিয়ে ডান থেকে বামে স্ক্রল অথবা ড্র্যাগ করে পরবর্তী পোস্টগুলো দেখুন।
          </p>

          {/* Interactive Hint Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-amber-300">
            <MoveHorizontal className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span>কারসার নিয়ে ডান-বামে স্ক্রল বা ড্র্যাগ করুন (Scroll / Drag to Slide)</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 🎠 MAIN SLIDE STAGE (8 POSTS SERIAL BY SERIAL) */}
        {/* ========================================================================= */}
        <div className="max-w-5xl mx-auto">
          
          {/* Top Control Bar: Serial Counter + Title + Navigation Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-2 mb-3 text-xs">
            
            {/* Serial Indicator: Graphics 1 to Graphics 8 */}
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-lg bg-amber-400/20 border border-amber-400/40 text-amber-300 font-extrabold font-mono text-xs">
                {String(currentIndex + 1).padStart(2, '0')} / {String(totalItems).padStart(2, '0')}
              </span>
              <span className="text-white font-bold text-sm tracking-wide">
                {currentItem.title}
              </span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-neutral-300 text-[11px] font-medium hidden sm:inline-block">
                {currentItem.categoryLabel}
              </span>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2">
              
              {/* Autoplay toggle */}
              <button
                type="button"
                onClick={() => setIsAutoplay(!isAutoplay)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isAutoplay 
                    ? 'bg-amber-400/20 border-amber-400/40 text-amber-300' 
                    : 'bg-white/5 border-white/10 text-neutral-300 hover:text-white'
                }`}
                title={isAutoplay ? "Pause auto-slide" : "Play auto-slide"}
              >
                {isAutoplay ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Auto-Slide On</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Auto-Slide</span>
                  </>
                )}
              </button>

              {/* Lightbox full view */}
              <button
                type="button"
                onClick={() => setSelectedArtwork(currentItem)}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="View in high-resolution lightbox"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Full Resolution</span>
              </button>

              {/* Behance Link */}
              <a
                href="https://www.behance.net/borhanuddin-2004"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#0057ff]/15 hover:bg-[#0057ff]/25 border border-[#0057ff]/30 text-blue-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="View Behance Profile"
              >
                <span>Behance</span>
                <ExternalLink className="w-3 h-3" />
              </a>

            </div>
          </div>

          {/* Interactive Slide Viewer Container */}
          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`relative rounded-2xl sm:rounded-3xl bg-[#0e1018] border border-white/10 shadow-2xl overflow-hidden select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            
            {/* Visual Content Box with Crisp Aspect Ratio */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-black/95 flex items-center justify-center overflow-hidden">
              
              {/* Blurred Ambient Backdrop for atmospheric depth */}
              <img
                src={formatImageUrl(currentItem.imageUrl)}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none transition-all duration-700"
              />

              {/* Crisp, Sharp Image (Uncropped) */}
              <img
                key={currentItem.id}
                src={formatImageUrl(currentItem.imageUrl)}
                alt={currentItem.title}
                referrerPolicy="no-referrer"
                className="relative z-10 max-h-full max-w-full object-contain p-3 sm:p-5 transition-all duration-300 pointer-events-none"
              />

              {/* Subtle top/bottom gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none z-10" />

              {/* Top Floating Badge: Serial Title */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-black/80 backdrop-blur-md text-amber-400 border border-amber-400/40 shadow-lg">
                  {currentItem.title}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-black/70 backdrop-blur-md text-neutral-300 border border-white/10">
                  {currentItem.categoryLabel}
                </span>
              </div>

              {/* Top Right Zoom Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedArtwork(currentItem);
                }}
                className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-black/70 hover:bg-black/90 text-white hover:text-amber-400 border border-white/20 backdrop-blur-md transition-all cursor-pointer shadow-lg"
                title="Zoom into Full View"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Arrow Navigation: Previous Slide Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/80 hover:bg-amber-400 hover:text-black text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-2xl backdrop-blur-md z-30 transform hover:scale-105 active:scale-95"
                aria-label="Previous slide"
                title="Previous graphic (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              {/* Arrow Navigation: Next Slide Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/80 hover:bg-amber-400 hover:text-black text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-2xl backdrop-blur-md z-30 transform hover:scale-105 active:scale-95"
                aria-label="Next slide"
                title="Next graphic (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="px-3.5 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-xs text-white flex items-center gap-2">
                  <span className="font-bold text-amber-400">{currentItem.title}</span>
                  <span className="text-neutral-400">•</span>
                  <span className="text-neutral-300 font-mono text-[11px]">{currentItem.imageUrl.replace(/^\//, '')}</span>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-xs text-neutral-300 flex items-center gap-1.5">
                  <span>পোস্ট {currentIndex + 1} / {totalItems}</span>
                </div>
              </div>

            </div>

          </div>

          {/* ========================================================================= */}
          {/* 🔢 SERIAL 1 TO 8 SELECTOR PILLS & HORIZONTAL SCROLL RAIL */}
          {/* ========================================================================= */}
          <div className="mt-5">
            
            <div className="flex items-center justify-between mb-2.5 px-1">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>গ্রাফিক্স ১ থেকে ৮ সিরিয়াল নির্বাচন করুন (Select Graphics 1 - 8)</span>
              </span>
              <span className="text-xs font-mono text-amber-400">
                Active: {currentItem.title}
              </span>
            </div>

            {/* Quick 8-Item Serial Buttons */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-4">
              {graphicsDesignData.map((item, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center border text-center ${
                      isActive
                        ? 'bg-amber-400 text-black border-amber-400 shadow-lg shadow-amber-400/25 scale-[1.03]'
                        : 'bg-[#121420] text-neutral-300 border-white/10 hover:border-white/30 hover:bg-[#181a28]'
                    }`}
                  >
                    <span className="text-[11px] leading-tight font-extrabold">{item.title}</span>
                    <span className={`text-[10px] ${isActive ? 'text-black/70' : 'text-neutral-400'}`}>
                      {item.categoryLabel}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Horizontal Thumbnail Slider Rail (Scrolls smoothly left/right) */}
            <div 
              ref={scrollTrackRef}
              className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scroll-smooth scrollbar-thin scrollbar-thumb-amber-400/30 scrollbar-track-transparent snap-x"
            >
              {graphicsDesignData.map((item, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <div
                    key={`strip-${item.id}`}
                    onClick={() => setCurrentIndex(idx)}
                    className={`shrink-0 w-36 sm:w-44 rounded-xl overflow-hidden cursor-pointer border-2 transition-all relative aspect-[16/10] bg-black/60 snap-center group ${
                      isActive
                        ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-400/20 scale-[1.02]'
                        : 'border-white/10 hover:border-white/40 opacity-70 hover:opacity-100'
                    }`}
                    title={`Go to ${item.title}`}
                  >
                    <img
                      src={formatImageUrl(item.imageUrl)}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between">
                      <span className={`text-[11px] font-bold ${isActive ? 'text-amber-300' : 'text-white'}`}>
                        {item.title}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        isActive ? 'bg-amber-400 text-black' : 'bg-black/70 text-neutral-300'
                      }`}>
                        #{idx + 1}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Bottom Actions: Behance Link + Order Custom Graphic Design */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href="https://www.behance.net/borhanuddin-2004"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0057ff]/15 hover:bg-[#0057ff]/25 border border-[#0057ff]/35 text-blue-200 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5"
              >
                <Palette className="w-4 h-4 text-blue-400" />
                <span>View More Designs on Behance</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              </a>
            </div>

            <button
              type="button"
              onClick={handleRequestDesign}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs sm:text-sm font-bold shadow-lg shadow-amber-400/20 transition-all cursor-pointer hover:-translate-y-0.5"
            >
              <span>Order Custom Graphic Design</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 🔍 FULLSCREEN LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      {selectedArtwork && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl"
          onClick={() => setSelectedArtwork(null)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[92vh] bg-[#0c0d15] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#121420]">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded text-xs font-extrabold bg-amber-400 text-black">
                  {selectedArtwork.title}
                </span>
                <h3 className="font-heading text-sm sm:text-base font-bold text-white truncate max-w-md">
                  {selectedArtwork.categoryLabel}
                </h3>
                <span className="text-xs font-mono text-amber-300 bg-white/5 px-2 py-0.5 rounded border border-white/10 hidden sm:inline-block">
                  {selectedArtwork.imageUrl.replace(/^\//, '')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const prevIdx = (currentIndex - 1 + totalItems) % totalItems;
                    setCurrentIndex(prevIdx);
                    setSelectedArtwork(graphicsDesignData[prevIdx]);
                  }}
                  className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-mono text-neutral-400">
                  {currentIndex + 1} / {totalItems}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const nextIdx = (currentIndex + 1) % totalItems;
                    setCurrentIndex(nextIdx);
                    setSelectedArtwork(graphicsDesignData[nextIdx]);
                  }}
                  className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="w-[1px] h-4 bg-white/20 mx-1" />
                <button
                  type="button"
                  onClick={() => setSelectedArtwork(null)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Large Artwork View */}
            <div className="p-3 sm:p-5 flex-1 overflow-auto flex items-center justify-center bg-black/90 relative">
              <img
                src={formatImageUrl(selectedArtwork.imageUrl)}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-20 pointer-events-none"
              />
              <img
                src={formatImageUrl(selectedArtwork.imageUrl)}
                alt={selectedArtwork.title}
                referrerPolicy="no-referrer"
                className="relative z-10 max-h-[72vh] w-auto max-w-full object-contain rounded-lg border border-white/10 shadow-2xl"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-white/10 bg-[#121420] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs text-neutral-400 hidden sm:inline font-mono">
                  Asset: {selectedArtwork.imageUrl.replace(/^\//, '')} • High Resolution
                </span>
                <a
                  href="https://www.behance.net/borhanuddin-2004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Behance Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <button
                type="button"
                onClick={handleRequestDesign}
                className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <span>Order Custom Design</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
