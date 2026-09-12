import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Grid3X3, LayoutGrid } from 'lucide-react';
import { WORK_STATS } from '../data/portfolioData';
import { getStoredProjects } from '../utils/projectStorage';
import { ProjectCard } from '../components/ProjectCard';

export const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [gridCols, setGridCols] = useState<2 | 3>(3);
  const [projects, setProjects] = useState(getStoredProjects());

  useEffect(() => {
    const refreshProjects = () => {
      setProjects(getStoredProjects());
    };
    refreshProjects();
    window.addEventListener('storage', refreshProjects);
    window.addEventListener('niswandi_projects_updated', refreshProjects);
    window.addEventListener('focus', refreshProjects);

    return () => {
      window.removeEventListener('storage', refreshProjects);
      window.removeEventListener('niswandi_projects_updated', refreshProjects);
      window.removeEventListener('focus', refreshProjects);
    };
  }, []);

  const countFormatted = String(projects.length).padStart(2, '0');

  const filterTabs = [
    { label: `ALL (${countFormatted})`, filter: 'ALL' },
    { label: 'UI/UX', filter: 'UI/UX' },
    { label: 'WEB', filter: 'WEB' },
    { label: 'MOBILE', filter: 'MOBILE' },
    { label: 'BRANDING', filter: 'BRANDING' },
    { label: 'DEVELOPMENT', filter: 'DEVELOPMENT' },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'UI/UX') return project.category.includes('UI/UX') || project.category.includes('PRODUCT');
    if (activeFilter === 'WEB') return project.category.includes('WEB') || project.category.includes('ARCHITECTURE');
    if (activeFilter === 'MOBILE') return project.category.includes('MOBILE');
    if (activeFilter === 'BRANDING') return project.category.includes('BRANDING');
    if (activeFilter === 'DEVELOPMENT') return project.category.includes('FRONT-END') || project.tags.includes('TypeScript') || project.tags.includes('React');
    return true;
  });

  return (
    <div className="pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="py-8 sm:py-10 border-b border-white/10 dark:border-white/10 light:border-gray-200">
          <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-lime uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-lime" />
            <span>PORTFOLIO // WORK | ESTD. 2024 — 2026</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-white dark:text-white light:text-gray-900 uppercase">
                SELECTED WORK<span className="text-lime">.</span>
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm sm:text-base text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                A curated archive of digital products, scalable platforms, and architectural web experiences engineered for impact.
              </p>
            </div>
          </div>

          {/* Filter Tabs & Grid View Mode Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
            <div className="flex flex-wrap gap-2">
              {filterTabs.map((tab) => {
                const isActive = activeFilter === tab.filter;
                return (
                  <button
                    key={tab.filter}
                    onClick={() => setActiveFilter(tab.filter)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'bg-lime text-black shadow-[0_0_15px_rgba(198,242,33,0.3)] scale-105'
                        : 'bg-[#14171d] dark:bg-[#14171d] light:bg-gray-100 text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white light:hover:text-black border border-white/5 dark:border-white/5 light:border-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Layout Switcher (Visible on both Mobile HP and Desktop) */}
            <div className="flex items-center space-x-1 bg-[#14171d] dark:bg-[#14171d] light:bg-gray-100 p-1 rounded-full border border-white/10 dark:border-white/10 light:border-gray-200 shrink-0">
              <button
                onClick={() => setGridCols(3)}
                className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold transition-all ${
                  gridCols === 3
                    ? 'bg-lime text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Tampilan Ringkas"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span>Compact (3)</span>
              </button>
              <button
                onClick={() => setGridCols(2)}
                className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold transition-all ${
                  gridCols === 2
                    ? 'bg-lime text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Tampilan Lebar"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Large (2)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div
          className={
            gridCols === 3
              ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 py-10'
              : 'grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 py-10'
          }
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Stats Summary Bar */}
        <div className="rounded-3xl bg-[#12151a] dark:bg-[#12151a] light:bg-white border border-white/10 dark:border-white/10 light:border-gray-200 p-8 sm:p-10 my-10 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {WORK_STATS.map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-xs font-mono uppercase tracking-widest text-gray-400">
                  {stat.label}
                </div>
                <div className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white dark:text-white light:text-gray-900 group-hover:text-lime transition-colors">
                  {stat.value.includes('%') ? (
                    <>
                      <span className="text-lime">{stat.value.replace('%', '')}</span>%
                    </>
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-500">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Card: Let's work together */}
        <div className="rounded-3xl bg-[#14171d] dark:bg-[#14171d] light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 p-8 sm:p-12 my-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono tracking-wider text-lime uppercase">
              <span>✦</span>
              <span>OPEN FOR 2026 COLLABORATIONS</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white dark:text-white light:text-gray-900">
              Let's work together<span className="text-lime">.</span>
            </h3>
            <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
              Have a visionary concept, brand evolution, or digital product in mind? Let's engineer something memorable together.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-lime text-black font-bold text-sm hover:bg-lime-hover shadow-[0_0_20px_rgba(198,242,33,0.3)] transition-all shrink-0"
          >
            <span>Contact Me</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

