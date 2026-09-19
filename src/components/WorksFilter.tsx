import React from 'react';
import { ProjectCategory } from '../types';
import { Search, Film, Smartphone, MonitorPlay } from 'lucide-react';

interface WorksFilterProps {
  selectedCategory: ProjectCategory;
  onSelectCategory: (cat: ProjectCategory) => void;
  formatFilter: 'all' | 'horizontal' | 'vertical';
  onSelectFormat: (format: 'all' | 'horizontal' | 'vertical') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  counts: Record<ProjectCategory, number>;
}

export const WorksFilter: React.FC<WorksFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  formatFilter,
  onSelectFormat,
  searchQuery,
  onSearchChange,
  counts
}) => {
  const allCategories: Array<{ id: ProjectCategory; label: string }> = [
    { id: 'all', label: 'All Projects' },
    { id: 'commercials', label: 'YouTube Videos' },
    { id: 'reels-shorts', label: 'Reels & Shorts' },
    { id: 'motion-ads', label: 'UI & Motion' },
    { id: 'documentary', label: 'Documentaries' },
    { id: 'motion-graphics', label: '3D & Motion' },
  ];

  const categories = allCategories.filter(
    (cat) => cat.id === 'all' || (counts[cat.id] && counts[cat.id] > 0)
  );

  return (
    <div className="flex flex-col gap-5 mb-10">
      
      {/* Category Tabs */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none w-full sm:w-auto">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = counts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                type="button"
                id={`filter-tab-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20 font-semibold'
                    : 'bg-[#12141f] text-neutral-300 hover:text-white hover:bg-[#1a1d2e] border border-white/5'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-neutral-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Format Selector (Aspect Ratio 16:9 vs 9:16) */}
        <div className="flex items-center gap-1.5 bg-[#12141f] border border-white/5 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => onSelectFormat('all')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
              formatFilter === 'all'
                ? 'bg-white/15 text-white'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            All Ratios
          </button>
          <button
            type="button"
            onClick={() => onSelectFormat('horizontal')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
              formatFilter === 'horizontal'
                ? 'bg-white/15 text-white'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="16:9 Landscape / Widescreen"
          >
            <MonitorPlay className="w-3.5 h-3.5" />
            <span>16:9</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectFormat('vertical')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
              formatFilter === 'vertical'
                ? 'bg-amber-400 text-black font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="9:16 Vertical (Reels / TikTok / Shorts)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>9:16 Shorts</span>
          </button>
        </div>
      </div>

      {/* Search Filter Bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          type="text"
          id="works-search-input"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by client, tags (e.g. Kinetic, ROAS, Hormozi)..."
          className="w-full bg-[#12141f] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/40 transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

    </div>
  );
};
