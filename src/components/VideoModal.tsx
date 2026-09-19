import React, { useEffect, useRef } from 'react';
import { ProjectItem } from '../types';
import { X, Play, Clock, Eye, TrendingUp, CheckCircle, Smartphone, MonitorPlay, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/portfolioData';

interface VideoModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onBookCall: () => void;
}

function getYouTubeEmbedUrl(url: string): string {
  if (!url) return '';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
  }
  return url.includes('?') ? `${url}&autoplay=1` : `${url}?autoplay=1`;
}

export const VideoModal: React.FC<VideoModalProps> = ({ project, onClose, onBookCall }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const isVertical = project.isVertical;

  return (
    <div
      id="video-theater-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0e1018] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#121420]">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/20">
              {isVertical ? <Smartphone className="w-3.5 h-3.5" /> : <MonitorPlay className="w-3.5 h-3.5" />}
              {project.categoryLabel}
            </span>
            <span className="text-xs text-neutral-400">
              Client: <strong className="text-white font-medium">{project.client}</strong>
            </span>
          </div>

          <button
            type="button"
            id="close-video-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Display Area */}
        <div className="bg-black flex items-center justify-center relative">
          {isVertical ? (
            <div className="py-4 sm:py-6 flex justify-center w-full bg-gradient-to-b from-[#0a0a0f] to-black">
              <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 bg-neutral-950">
                {project.videoType === 'youtube' ? (
                  <iframe
                    src={getYouTubeEmbedUrl(project.videoUrl)}
                    title={project.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src={project.videoUrl}
                    poster={project.thumbnail}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="w-full aspect-video bg-neutral-950">
              {project.videoType === 'youtube' ? (
                <iframe
                  src={getYouTubeEmbedUrl(project.videoUrl)}
                  title={project.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  ref={videoRef}
                  src={project.videoUrl}
                  poster={project.thumbnail}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          )}
        </div>

        {/* Case Study Details & Breakdown */}
        <div className="p-5 sm:p-8 space-y-6 max-h-[50vh] overflow-y-auto">
          
          {/* Header & Metrics Strip */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1.5">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400">
                Industry: <span className="text-neutral-200">{project.clientIndustry || 'Commercial'}</span> • Year: <span className="text-neutral-200">{project.year}</span> • Duration: <span className="text-neutral-200">{project.duration}</span>
              </p>
            </div>

            {/* Performance Metrics */}
            <div className="flex items-center gap-3 flex-wrap">
              {project.stats.views && (
                <div className="px-3 py-2 rounded-xl bg-[#141724] border border-emerald-500/20 text-center">
                  <div className="text-[11px] text-neutral-400">Views Generated</div>
                  <div className="text-sm font-bold text-emerald-400 flex items-center justify-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {project.stats.views}
                  </div>
                </div>
              )}
              {project.stats.roas && (
                <div className="px-3 py-2 rounded-xl bg-[#141724] border border-amber-500/20 text-center">
                  <div className="text-[11px] text-neutral-400">Ad ROAS</div>
                  <div className="text-sm font-bold text-amber-400 flex items-center justify-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {project.stats.roas}
                  </div>
                </div>
              )}
              {project.stats.retention && (
                <div className="px-3 py-2 rounded-xl bg-[#141724] border border-purple-500/20 text-center">
                  <div className="text-[11px] text-neutral-400">Avg Retention</div>
                  <div className="text-sm font-bold text-purple-400">
                    {project.stats.retention}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              Project Overview
            </h4>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Challenge & Solution Grid (if present) */}
          {project.challengeAndSolution && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#12141f] border border-white/5">
                <div className="text-xs font-semibold text-rose-400 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                  The Challenge
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {project.challengeAndSolution.challenge}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#12141f] border border-white/5">
                <div className="text-xs font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Our Creative Execution
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {project.challengeAndSolution.solution}
                </p>
              </div>
            </div>
          )}

          {/* Deliverables & Software Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2.5">
                Deliverables Provided
              </h4>
              <ul className="space-y-1.5">
                {project.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-neutral-400">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2.5">
                Production Software & Pipeline
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.software.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-neutral-300 font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Bottom CTA */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121420] -mx-5 sm:-mx-8 -mb-5 sm:-mb-8 p-5 sm:p-6">
            <div>
              <div className="text-sm font-semibold text-white">
                Need high-retention video content like this?
              </div>
              <div className="text-xs text-neutral-400">
                Let's discuss your project goals, turnaround time, and deliverables.
              </div>
            </div>

            <button
              type="button"
              id="modal-hire-cta-btn"
              onClick={() => {
                onClose();
                onBookCall();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20 cursor-pointer"
            >
              <span>Start Similar Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
