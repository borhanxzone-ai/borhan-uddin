import React from 'react';

export const BackgroundBackdrop: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
      {/* 1. Base Dark Canvas */}
      <div className="absolute inset-0 bg-[#090a0f]" />

      {/* 2. Borhan's Photo as the Main Visible Website Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/borhan-bg.jpg"
          alt="Borhan Uddin Background Photo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center md:object-[center_25%] filter brightness-[0.65] contrast-[1.05] saturate-[1.08] scale-[1.01] transform will-change-transform"
        />
      </div>

      {/* 3. Subtle Warm Ambient Studio Glows Over the Photo */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px]" />
      <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-[140px]" />
      <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px]" />

      {/* 4. Cinematic Vignette & Readability Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090a0f]/45 via-[#090a0f]/20 to-[#090a0f]/75" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 35%, transparent 35%, rgba(9, 10, 15, 0.30) 65%, rgba(9, 10, 15, 0.85) 100%)',
        }}
      />

      {/* 5. Subtle Modern Grid Pattern for High-End Motion Studio Feel */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
};
