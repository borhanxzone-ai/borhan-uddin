import React, { useState, useEffect } from 'react';
import { Video, Sparkles, MessageSquare, Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../data/portfolioData';

interface NavbarProps {
  onOpenEditGuide?: () => void;
  onOpenContactModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#bio-profile' },
    { label: 'Works', href: '#works' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090a0f]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Agency Brand */}
          <a
            href="#"
            id="brand-logo-link"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-purple-500 to-rose-500 p-0.5 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#0d0e15] rounded-[10px] overflow-hidden flex items-center justify-center">
                {siteConfig.avatarUrl ? (
                  <img
                    src={siteConfig.avatarUrl}
                    alt={siteConfig.agencyName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <Video className="w-5 h-5 text-amber-400" />
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  {siteConfig.agencyName}
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse"></span>
                  OPEN
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 hidden sm:block">
                Creative Video & Motion
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#12141e]/80 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-medium text-neutral-300 hover:text-white rounded-full hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Direct Hire / Quote button */}
            <a
              href="#contact"
              id="nav-hire-btn"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-lg shadow-lg shadow-amber-400/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Book a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 border border-white/10"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-white/10 bg-[#0e1017]/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-neutral-200 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-black bg-amber-400 text-center"
                >
                  Book a Project
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
