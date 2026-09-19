import React from 'react';
import { ProjectItem } from '../types';
import { Play, TrendingUp, Eye, Clock, Layers, Sparkles, Smartphone, MonitorPlay } from 'lucide-react';

interface WorkCardProps {
  project: ProjectItem;
  onOpenModal: (project: ProjectItem) => void;
}

export const WorkCard: React.FC<WorkCardProps> = ({ project, onOpenModal }) => {
  const isVertical = project.isVertical;

  return (
    <div
      id={`work-card-${project.id}`}
      onClick={() => onOpenModal(project)}
      className="group relative bg-[#11131c] rounded-2xl overflow-hidden border border-white/5 hover:border-amber-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Media Thumbnail Container */}
      <div
        className={`relative overflow-hidden bg-neutral-900 ${
          isVertical ? 'aspect-[9/14] sm:aspect-[9/13]' : 'aspect-video'
        }`}
      >
        <img
          src={project.thumbnail}
          alt={project.title}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('maxresdefault.jpg')) {
              target.src = target.src.replace('maxresdefault.jpg', 'hqdefault.jpg');
            }
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#11131c] via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-black/60 backdrop-blur-md text-amber-300 border border-white/10 shadow-sm">
            {isVertical ? (
              <Smartphone className="w-3 h-3 text-amber-400" />
            ) : (
              <MonitorPlay className="w-3 h-3 text-amber-400" />
            )}
            {project.categoryLabel}
          </span>

          <div className="flex items-center gap-1.5">
            {project.stats.views && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/70 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                <Eye className="w-2.5 h-2.5" />
                {project.stats.views}
              </span>
            )}
            {project.stats.roas && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/70 backdrop-blur-md text-amber-400 border border-amber-500/30">
                <TrendingUp className="w-2.5 h-2.5" />
                {project.stats.roas}
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/60 backdrop-blur-md text-neutral-300 border border-white/10">
              <Clock className="w-2.5 h-2.5" />
              {project.duration}
            </span>
          </div>
        </div>

        {/* Central Play Button Hover Trigger */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-13 h-13 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-xl shadow-amber-400/40 transform scale-90 opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300">
            <Play className="w-5 h-5 fill-black ml-0.5" />
          </div>
        </div>

        {/* Client Tag pill at bottom of media */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span className="text-[11px] font-medium text-neutral-200 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
            {project.client}
          </span>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-heading text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 mb-2">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2 leading-relaxed mb-4">
            {project.description}
          </p>
        </div>

        {/* Deliverables & Tags */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 flex-wrap text-[11px] text-neutral-400">
          <div className="flex items-center gap-1.5 flex-wrap">
            {project.software.slice(0, 2).map((soft, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-neutral-300"
              >
                {soft}
              </span>
            ))}
            {project.software.length > 2 && (
              <span className="text-[10px] text-neutral-500">
                +{project.software.length - 2}
              </span>
            )}
          </div>
          <span className="text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
            Watch Video &rarr;
          </span>
        </div>
      </div>

    </div>
  );
};
