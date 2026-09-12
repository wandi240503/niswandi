import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectCardProps {
  project: Project;
  layout?: 'standard' | 'featured' | 'compact';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, layout = 'standard' }) => {
  if (layout === 'featured') {
    return (
      <div className="group relative rounded-3xl bg-[#14171d] dark:bg-[#14171d] light:bg-white border border-white/10 dark:border-white/10 light:border-gray-200 hover:border-lime/40 transition-all duration-300 p-6 sm:p-8 lg:p-10 overflow-hidden shadow-2xl">
        {/* Glow effect on hover */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-lime/10 rounded-full blur-3xl pointer-events-none group-hover:bg-lime/20 transition-all duration-500" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Mockup Preview Area */}
          <div className="lg:col-span-7 overflow-hidden rounded-2xl border border-white/10 dark:border-white/10 light:border-gray-200 bg-[#0c0e12] relative aspect-video flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(198,242,33,0.15)] transition-all">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            />
            {/* Tag badge overlay */}
            <div className="absolute bottom-4 left-4 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-mono text-gray-200 tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" />
              <span>{project.badge}</span>
            </div>

            {/* Live indicator if liveUrl exists */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute top-4 right-4 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-lime text-black font-bold text-xs shadow-lg hover:bg-lime-hover transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Live Site</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Details Area */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-3">
                <span className="text-lime">{project.tag}</span>
                <span>{project.year}</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white light:text-gray-900 font-display tracking-tight group-hover:text-lime transition-colors">
                {project.title}
              </h3>
              <p className="mt-4 text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 dark:bg-white/5 light:bg-gray-100 border border-white/10 dark:border-white/10 light:border-gray-200 text-gray-300 dark:text-gray-300 light:text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action links */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to={`/projects/${project.id}`}
                className="inline-flex items-center space-x-2 text-sm font-bold text-white dark:text-white light:text-gray-900 group-hover:text-lime transition-colors"
              >
                <span>Explore Case Study</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-lime hover:underline"
                >
                  <span>Visit Website</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col rounded-2xl bg-[#14171d] dark:bg-[#14171d] light:bg-white border border-white/10 dark:border-white/10 light:border-gray-200 hover:border-lime/40 transition-all duration-300 p-5 sm:p-6 overflow-hidden shadow-xl hover:-translate-y-1">
      {/* Mockup Preview Area */}
      <Link to={`/projects/${project.id}`} className="block w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/10 dark:border-white/10 light:border-gray-200 bg-[#0c0e12] relative mb-5">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
        />
        {/* Tag badge overlay */}
        <div className="absolute bottom-3 left-3 inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-gray-200 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-lime" />
          <span>{project.badge}</span>
        </div>

        {/* Live badge if liveUrl exists */}
        {project.liveUrl && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-lime text-black font-bold text-[10px] font-mono flex items-center space-x-1 shadow-md">
            <span>● LIVE</span>
          </div>
        )}
      </Link>

      {/* Meta Row */}
      <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mb-2">
        <span className="text-lime">{project.tag}</span>
        <span>{project.year}</span>
      </div>

      {/* Title & Arrow */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <Link to={`/projects/${project.id}`} className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-gray-900 font-display tracking-tight group-hover:text-lime transition-colors">
          {project.title}
        </Link>
        <div className="flex items-center space-x-1">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              title="Open Live Website"
              className="w-8 h-8 rounded-full border border-lime/30 bg-lime/10 flex items-center justify-center text-lime hover:bg-lime hover:text-black transition-all shrink-0"
            >
              <Globe className="w-4 h-4" />
            </a>
          ) : (
            <Link
              to={`/projects/${project.id}`}
              className="w-8 h-8 rounded-full border border-white/10 dark:border-white/10 light:border-gray-300 bg-white/5 dark:bg-white/5 light:bg-gray-100 flex items-center justify-center text-gray-400 group-hover:text-lime group-hover:border-lime/40 group-hover:bg-lime/10 transition-all shrink-0"
            >
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 line-clamp-2 leading-relaxed mt-auto mb-4">
        {project.description}
      </p>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5 dark:border-white/5 light:border-gray-100 text-xs">
        <Link to={`/projects/${project.id}`} className="font-mono text-gray-400 hover:text-lime transition-colors">
          Case Study →
        </Link>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-lime hover:underline font-bold inline-flex items-center space-x-1"
          >
            <span>Live Site</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
};
