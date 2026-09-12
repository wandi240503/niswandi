import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE_TIMELINE } from '../data/portfolioData';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <div className="text-xs font-mono tracking-widest text-lime uppercase">
            MY JOURNEY
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white dark:text-white light:text-gray-900">
            Experience<span className="text-lime">.</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
            A timeline of my professional journey and key milestones.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 sm:before:left-5 before:w-0.5 before:bg-white/10 dark:before:bg-white/10 light:before:bg-gray-200">
          {EXPERIENCE_TIMELINE.map((item, index) => (
            <div key={index} className="relative pl-10 sm:pl-14 group">
              {/* Dot on timeline */}
              <div
                className={`absolute left-1.5 sm:left-3.5 top-7 w-3.5 h-3.5 rounded-full border-2 transform -translate-x-1/2 transition-colors ${
                  item.isCurrent
                    ? 'bg-lime border-black ring-4 ring-lime/20'
                    : 'bg-[#14171d] border-gray-600 group-hover:border-lime'
                }`}
              />

              <div className="p-6 sm:p-8 rounded-2xl bg-[#14171d] dark:bg-[#14171d] light:bg-white border border-white/10 dark:border-white/10 light:border-gray-200 hover:border-lime/40 transition-all duration-300 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                  <span className="text-xs font-mono text-lime font-bold">
                    {item.period}
                  </span>
                  <span className="text-xs font-mono text-gray-400">
                    {item.company}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-white dark:text-white light:text-gray-900 mb-2">
                  {item.role}
                </h3>

                <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Banner: Always learning, always creating */}
        <div className="rounded-3xl bg-[#14171d] dark:bg-[#14171d] light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white dark:text-white light:text-gray-900 mb-1">
              Always learning, always creating<span className="text-lime">.</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
              Evolving with cutting-edge design tools and frontend frameworks.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-lime text-black font-bold text-sm hover:bg-lime-hover shadow-[0_0_20px_rgba(198,242,33,0.3)] transition-all shrink-0"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

