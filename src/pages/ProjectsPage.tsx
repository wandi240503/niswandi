import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { WORK_STATS } from '../data/portfolioData';
import { getStoredProjects } from '../utils/projectStorage';
import { ProjectCard } from '../components/ProjectCard';

export const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const projects = getStoredProjects();

  const filterTabs = [
    { label: 'ALL (06)', filter: 'ALL' },
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
        <div className="py-8 sm:py-12 border-b border-white/10 dark:border-white/10 light:border-gray-200">
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

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2.5 mt-10">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.filter;
              return (
                <button
                  key={tab.filter}
                  onClick={() => setActiveFilter(tab.filter)}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-200 ${
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
        </div>

        {/* 6 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 py-14">
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

