import React, { useEffect, useRef, useState } from 'react';

export const GlowingCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // References for direct DOM manipulation to achieve 60/120fps smooth performance
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const targetPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Smooth interpolation loop (Lerp) for ambient glow
    const render = () => {
      // Lerp mouse position for smooth trailing aura
      targetPos.current.x += (mousePos.current.x - targetPos.current.x) * 0.18;
      targetPos.current.y += (mousePos.current.y - targetPos.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    // Mouse handlers (Desktop)
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
      setIsTouch(false);

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer')
        );
        setIsHovered(isClickable);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Touch handlers (Mobile & Tablet)
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mousePos.current = { x: touch.clientX, y: touch.clientY };
        targetPos.current = { x: touch.clientX, y: touch.clientY };
        setIsVisible(true);
        setIsTouch(true);
        setIsClicking(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mousePos.current = { x: touch.clientX, y: touch.clientY };
        setIsVisible(true);
      }
    };

    const handleTouchEnd = () => {
      setIsClicking(false);
      // Gentle delayed fade out on touch release
      setTimeout(() => {
        setIsVisible(false);
      }, 400);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);

      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Large Ambient Radiant Aura (Luminous Ellipse Spotlight) */}
      <div
        ref={auraRef}
        className="fixed top-0 left-0 w-72 h-72 sm:w-96 sm:h-96 -ml-36 -mt-36 sm:-ml-48 sm:-mt-48 rounded-full pointer-events-none will-change-transform"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(251, 191, 36, 0.16) 0%, rgba(245, 158, 11, 0.08) 40%, rgba(217, 70, 239, 0.03) 65%, transparent 80%)',
          filter: 'blur(30px)',
        }}
      />

      {/* 2. Focused Glowing Ellipse Ring (Trailing Follower) */}
      <div
        ref={glowRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none will-change-transform transition-[width,height,background-color,border-color,box-shadow] duration-200 ease-out flex items-center justify-center ${
          isTouch
            ? 'w-14 h-14 border-2 border-amber-400 bg-amber-400/25 shadow-[0_0_30px_rgba(251,191,36,0.85)]'
            : isHovered
            ? 'w-16 h-16 border border-amber-300 bg-amber-400/20 shadow-[0_0_35px_rgba(251,191,36,0.75)]'
            : isClicking
            ? 'w-8 h-8 border-2 border-amber-400 bg-amber-400/40 shadow-[0_0_25px_rgba(251,191,36,0.9)]'
            : 'w-10 h-10 border border-amber-400/70 bg-amber-400/10 shadow-[0_0_20px_rgba(251,191,36,0.5)]'
        }`}
      >
        {/* Subtle inner pulse ring */}
        <span
          className={`w-full h-full rounded-full border border-white/20 animate-ping opacity-25 ${
            isClicking ? 'opacity-60 scale-125' : ''
          }`}
        />
      </div>

      {/* 3. Center Precision Luminous Core Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none will-change-transform transition-[transform,width,height,opacity] duration-75 ${
          isTouch
            ? 'w-3 h-3 bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,1)]'
            : isHovered
            ? 'w-2 h-2 bg-white opacity-80'
            : isClicking
            ? 'w-3.5 h-3.5 bg-amber-300 shadow-[0_0_15px_rgba(251,191,36,1)]'
            : 'w-2 h-2 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)]'
        }`}
      />
    </div>
  );
};
