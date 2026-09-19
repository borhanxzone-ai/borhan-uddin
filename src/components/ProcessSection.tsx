import React from 'react';
import { processSteps } from '../data/portfolioData';
import { Compass, Scissors, Layers, CheckCircle2 } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5 text-amber-400" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5 text-amber-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-amber-400" />;
      case 'CheckCircle2':
      default:
        return <CheckCircle2 className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="process" className="py-20 md:py-28 border-t border-white/5 bg-[#0b0c13] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-4">
            <span>Production Workflow</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            How We Turn Ideas Into Masterpieces
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            A battle-tested 4-step creative pipeline that guarantees razor-sharp turnaround, brand alignment, and zero wasted revisions.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-[#11131c] border border-white/5 hover:border-amber-400/30 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-heading text-3xl font-black text-white/20 group-hover:text-amber-400/50 transition-colors">
                    {step.step}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/5 border border-white/10 text-neutral-300">
                    {step.duration}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-4">
                  {getIcon(step.iconName)}
                </div>

                <h3 className="font-heading text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connecting progress line on desktop */}
              {idx < processSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-[2px] bg-gradient-to-r from-amber-400/40 to-transparent z-10" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
