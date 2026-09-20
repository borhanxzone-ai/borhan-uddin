import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BioSection } from './components/BioSection';
import { WorksFilter } from './components/WorksFilter';
import { WorkCard } from './components/WorkCard';
import { VideoModal } from './components/VideoModal';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { projectsData, siteConfig } from './data/portfolioData';
import { ProjectCategory, ProjectItem } from './types';
import { Sparkles, Layers, ArrowRight, Video, Flame, Film } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [formatFilter, setFormatFilter] = useState<'all' | 'horizontal' | 'vertical'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [selectedServiceForContact, setSelectedServiceForContact] = useState<string | undefined>(undefined);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<ProjectCategory, number> = {
      'all': projectsData.length,
      'motion-ads': 0,
      'reels-shorts': 0,
      'commercials': 0,
      'documentary': 0,
      'motion-graphics': 0,
    };
    projectsData.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category] += 1;
      }
    });
    return counts;
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // Category match
      if (selectedCategory !== 'all' && project.category !== selectedCategory) {
        return false;
      }

      // Format match
      if (formatFilter === 'horizontal' && project.isVertical) {
        return false;
      }
      if (formatFilter === 'vertical' && !project.isVertical) {
        return false;
      }

      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = project.title.toLowerCase().includes(query);
        const inClient = project.client.toLowerCase().includes(query);
        const inDesc = project.description.toLowerCase().includes(query);
        const inTags = project.tags.some((t) => t.toLowerCase().includes(query));
        return inTitle || inClient || inDesc || inTags;
      }

      return true;
    });
  }, [selectedCategory, formatFilter, searchQuery]);

  const scrollToWorks = () => {
    const el = document.getElementById('works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = (serviceTitle?: string) => {
    if (serviceTitle) {
      setSelectedServiceForContact(serviceTitle);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlayFeatured = () => {
    const featured = projectsData.find((p) => p.featured) || projectsData[0];
    if (featured) {
      setActiveProject(featured);
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <Hero
        onExploreClick={scrollToWorks}
        onFeaturedPlay={handlePlayFeatured}
      />

      {/* Creator Bio Data Section (Right: Picture, Left: Data) */}
      <BioSection onContactClick={() => scrollToContact()} />

      {/* Main Works Portfolio Section */}
      <section id="works" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>Portfolio Catalog</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              MY PROJECT WORK
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
            Browse our commercial edits, direct-response ads, viral shorts, and documentary productions. Click any card to play the full video & view project case breakdown.
          </p>
        </div>

        {/* Filters (Categories & Aspect Ratios) */}
        <WorksFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          formatFilter={formatFilter}
          onSelectFormat={setFormatFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          counts={categoryCounts}
        />

        {/* Works Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
            {filteredProjects.map((project) => (
              <WorkCard
                key={project.id}
                project={project}
                onOpenModal={setActiveProject}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-3xl bg-[#11131c] border border-white/5 max-w-xl mx-auto p-8">
            <Layers className="w-12 h-12 text-neutral-500 mx-auto mb-4" />
            <h3 className="font-heading text-lg font-bold text-white mb-1">
              No Projects Found
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              No video projects match the selected category or search query.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setFormatFilter('all');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>

      {/* Services Capabilities Section */}
      <ServicesSection onSelectService={(service) => scrollToContact(service)} />

      {/* 4-Step Production Process */}
      <ProcessSection />

      {/* Inquiry & Contact Section */}
      <ContactSection preselectedService={selectedServiceForContact} />

      {/* Footer */}
      <Footer />

      {/* Video Lightbox Modal */}
      <VideoModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onBookCall={() => scrollToContact()}
      />

    </div>
  );
}
