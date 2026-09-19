import React from 'react';
import { servicesData } from '../data/portfolioData';
import { 
  Palette, 
  Image as ImageIcon, 
  Repeat, 
  Volume2, 
  Sparkles, 
  Smartphone, 
  Check, 
  ArrowRight 
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palette':
        return <Palette className="w-5 h-5 text-amber-400" />;
      case 'Image':
        return <ImageIcon className="w-5 h-5 text-amber-400" />;
      case 'Repeat':
        return <Repeat className="w-5 h-5 text-amber-400" />;
      case 'Volume2':
        return <Volume2 className="w-5 h-5 text-amber-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-amber-400" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-4">
            <span>Specialized Capabilities</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Production Services Tailored For Scaling
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            From high-end DaVinci color grading to viral short-form retention edits, our specialized pipeline transforms footage into engaging high-converting assets.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className={`relative p-6 sm:p-8 rounded-2xl bg-[#0f111a] border transition-all duration-300 flex flex-col justify-between ${
                service.popular
                  ? 'border-amber-400/40 shadow-xl shadow-amber-500/5'
                  : 'border-white/5 hover:border-white/20'
              }`}
            >
              {service.popular && (
                <div className="absolute top-6 right-6">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-black">
                    High Demand
                  </span>
                </div>
              )}

              <div>
                <div className="w-12 h-12 rounded-xl bg-[#161826] border border-white/10 flex items-center justify-center mb-6">
                  {getIcon(service.iconName)}
                </div>

                <div className="text-xs font-semibold text-amber-400 mb-1">
                  {service.subtitle}
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables checklist */}
                <div className="space-y-2 mb-8">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                      <div className="w-4 h-4 rounded-full bg-amber-400/10 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-amber-400" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inquire CTA */}
              <button
                type="button"
                onClick={() => onSelectService(service.title)}
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-white/5 hover:bg-amber-400 hover:text-black border border-white/10 hover:border-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Request {service.title}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
