import React from 'react';
import { siteConfig } from '../data/portfolioData';
import { Video, ArrowUp, Instagram, Youtube, Facebook } from 'lucide-react';

interface FooterProps {
  onOpenEditGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07080d] border-t border-white/5 py-12 md:py-16 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/5">
          
          {/* Logo & Slogan */}
          <div className="space-y-2 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-purple-500 to-rose-500 p-0.5 flex items-center justify-center shadow-md">
                <div className="w-full h-full bg-[#0d0e15] rounded-[9px] overflow-hidden flex items-center justify-center">
                  {siteConfig.avatarUrl ? (
                    <img
                      src={siteConfig.avatarUrl}
                      alt={siteConfig.agencyName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <Video className="w-4 h-4 text-amber-400" />
                  )}
                </div>
              </div>
              <span className="font-heading text-lg font-bold text-white tracking-tight">
                {siteConfig.agencyName}
              </span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              {siteConfig.brandTagline}. Crafting high-converting motion ads, viral short-form retention, and brand commercials.
            </p>
          </div>

          {/* Social Links: Facebook, YouTube, Instagram only */}
          <div className="flex items-center gap-3">
            {siteConfig.contact.socials.facebook && (
              <a
                href={siteConfig.contact.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/40 flex items-center justify-center text-neutral-300 hover:text-blue-400 transition-colors"
                aria-label="Facebook"
                title="Facebook Profile"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
            {siteConfig.contact.socials.youtube && (
              <a
                href={siteConfig.contact.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-500/40 flex items-center justify-center text-neutral-300 hover:text-red-400 transition-colors"
                aria-label="YouTube"
                title="YouTube Channel (@Borhan_Creation-e6n)"
              >
                <Youtube className="w-4 h-4" />
              </a>
            )}
            {siteConfig.contact.socials.instagram && (
              <a
                href={siteConfig.contact.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-pink-600/20 border border-white/10 hover:border-pink-500/40 flex items-center justify-center text-neutral-300 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
                title="Instagram Profile (@borhan_xyz)"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.agencyName}. All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
