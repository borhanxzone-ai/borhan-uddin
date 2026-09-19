import React from 'react';
import { MapPin, Sparkles, MessageSquare, CheckCircle2, Video, Film, ArrowRight, ExternalLink, Facebook, Youtube, Instagram } from 'lucide-react';
import { siteConfig } from '../data/portfolioData';

interface BioSectionProps {
  onContactClick?: () => void;
}

export const BioSection: React.FC<BioSectionProps> = ({ onContactClick }) => {
  const bio = siteConfig.bio || {
    name: "BORHAN UDDIN",
    role: "Video editor & Motion Designer",
    location: "Dhaka",
    photoUrl: "/borhan-dp.jpg",
    photoLink: "https://www.facebook.com/share/1BuYp4HLTY/",
    aboutText: "Specializing in direct-response video editing, retention-focused pacing, and creative motion graphics for ambitious brands and digital creators worldwide.",
    skills: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Motion Design", "Sound Design", "Color Grading"],
    experienceYears: "4+ Years of Crafting Edits",
    openToWork: true
  };

  const handleScrollToContact = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="bio-profile" className="pt-12 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="relative rounded-3xl bg-[#0c0d16]/90 border border-white/10 p-6 sm:p-8 lg:p-12 overflow-hidden shadow-2xl shadow-amber-500/5 backdrop-blur-xl">
        
        {/* Ambient atmospheric glows */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ====================================================
              LEFT SIDE: BORHAN'S DATA
              - "BORHAN UDDIN"
              - Video editor & Motion Designer
              - "Dhaka"
             ==================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
            
            {/* Top eyebrow badge & availability */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-amber-300 uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>ABOUT THE CREATOR</span>
              </div>

              {bio.openToWork && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for Hire</span>
                </div>
              )}
            </div>

            {/* Name */}
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {bio.name}
              </h2>

              {/* Designation / Role */}
              <div className="mt-2 text-lg sm:text-xl font-semibold bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                {bio.role}
              </div>
            </div>

            {/* Location Pill */}
            <div className="inline-flex items-center gap-2 text-neutral-300 text-sm font-medium bg-white/5 px-3.5 py-1.5 rounded-xl border border-white/10 w-fit">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{bio.location}</span>
            </div>

            {/* Short Narrative / Bio Statement */}
            {bio.aboutText && (
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-xl">
                {bio.aboutText}
              </p>
            )}

            {/* Skills & Tools Pills */}
            {bio.skills && bio.skills.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Core Toolset & Capabilities
                </div>
                <div className="flex flex-wrap gap-2">
                  {bio.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-[#141624] border border-white/10 text-xs font-medium text-neutral-200 hover:border-amber-400/40 hover:text-amber-300 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs / Quick Actions */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={handleScrollToContact}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs sm:text-sm font-bold shadow-lg shadow-amber-400/20 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Hire / Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {siteConfig.contact.whatsapp && (
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-medium transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              )}

              {bio.photoLink && (
                <a
                  href={bio.photoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/25 text-blue-300 text-xs sm:text-sm font-medium transition-colors"
                >
                  <Facebook className="w-4 h-4 text-blue-400" />
                  <span>Facebook</span>
                </a>
              )}

              {siteConfig.contact.socials.youtube && (
                <a
                  href={siteConfig.contact.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/15 hover:bg-red-600/25 border border-red-500/25 text-red-300 text-xs sm:text-sm font-medium transition-colors"
                  title="YouTube Channel"
                >
                  <Youtube className="w-4 h-4 text-red-400" />
                  <span>YouTube</span>
                </a>
              )}

              {siteConfig.contact.socials.instagram && (
                <a
                  href={siteConfig.contact.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-600/15 hover:bg-pink-600/25 border border-pink-500/25 text-pink-300 text-xs sm:text-sm font-medium transition-colors"
                  title="Instagram Profile"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>Instagram</span>
                </a>
              )}
            </div>

          </div>

          {/* ====================================================
              RIGHT SIDE: BORHAN'S PICTURE
              - High quality framed card with avatar
             ==================================================== */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md group">
              
              {/* Decorative background glow frame */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-amber-400/40 via-purple-500/30 to-rose-500/40 rounded-3xl blur-md group-hover:blur-lg transition-all duration-300 opacity-80" />

              {/* Photo Frame Container */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0d0e17] border border-white/15 p-2 shadow-2xl">
                <div className="relative rounded-[16px] sm:rounded-[20px] overflow-hidden aspect-[4/5] sm:aspect-[3/4] w-full bg-[#151724]">
                  <img
                    src={bio.photoUrl}
                    alt={bio.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out"
                  />

                  {/* Subtle inner dark gradient at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                  {/* Bottom Float Card Tag */}
                  <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-heading text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{bio.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      </div>
                      <div className="text-[11px] text-neutral-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>{bio.location}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded bg-amber-400/20 border border-amber-400/30 text-[10px] font-bold text-amber-300 uppercase tracking-wide">
                        Pro Editor
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
