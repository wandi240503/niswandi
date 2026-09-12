import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { getStoredProjects } from '../utils/projectStorage';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projects = getStoredProjects();

  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projectIndex !== -1 ? projects[projectIndex] : projects[0];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-lime transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* Header Title Area */}
        <div className="space-y-4 pb-8 border-b border-white/10 dark:border-white/10 light:border-gray-200">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 dark:bg-white/5 light:bg-gray-100 border border-white/10 dark:border-white/10 light:border-gray-200 text-lime"
              >
                {tag}
              </span>
            ))}
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 dark:bg-white/5 light:bg-gray-100 border border-white/10 dark:border-white/10 light:border-gray-200 text-gray-400">
              {project.year}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white dark:text-white light:text-gray-900">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed max-w-3xl">
            {project.description}
          </p>

          {project.liveUrl && (
            <div className="pt-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-lime text-black font-bold text-sm hover:bg-lime-hover shadow-[0_0_20px_rgba(198,242,33,0.3)] transition-all"
              >
                <span>Visit Live Website</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Hero Image Showcase */}
        <div className="my-10 rounded-3xl overflow-hidden border border-white/10 dark:border-white/10 light:border-gray-200 bg-[#12151a] shadow-2xl relative aspect-video flex items-center justify-center">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono text-lime">
            ● {project.badge}
          </div>
        </div>

        {/* Project Meta Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 sm:p-8 rounded-2xl bg-[#14171d] dark:bg-[#14171d] light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 my-10">
          <div>
            <div className="text-[11px] font-mono uppercase text-gray-500 mb-1">CLIENT</div>
            <div className="text-sm font-bold text-white dark:text-white light:text-gray-900">{project.client || "Private Client"}</div>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-gray-500 mb-1">ROLE</div>
            <div className="text-sm font-bold text-white dark:text-white light:text-gray-900">{project.role || "Lead Designer"}</div>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-gray-500 mb-1">TIMELINE</div>
            <div className="text-sm font-bold text-white dark:text-white light:text-gray-900">{project.timeline || "8 Weeks"}</div>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-gray-500 mb-1">SERVICES</div>
            <div className="text-sm font-bold text-white dark:text-white light:text-gray-900">{project.services?.join(', ') || "UI/UX, Dev"}</div>
          </div>
        </div>

        {/* Case Study Deep Dive Content */}
        <div className="space-y-16 py-8">
          {/* 01. Overview */}
          <div className="space-y-4">
            <div className="text-xs font-mono text-lime uppercase tracking-widest">
              01 / OVERVIEW
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white dark:text-white light:text-gray-900">
              A modern digital experience designed for real impact.
            </h2>
            <p className="text-sm sm:text-base text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
              {project.overview || project.description}
            </p>
          </div>

          {/* 02. The Challenge */}
          <div className="space-y-4 p-8 rounded-2xl bg-[#12151a] dark:bg-[#12151a] light:bg-white border border-white/10 dark:border-white/10 light:border-gray-200">
            <div className="text-xs font-mono text-lime uppercase tracking-widest">
              02 / THE CHALLENGE
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white dark:text-white light:text-gray-900">
              Transforming complex user friction into frictionless flow.
            </h3>
            <p className="text-sm sm:text-base text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
              {project.challenge || "Eliminating bottlenecks, reducing cognitive fatigue, and elevating conversion rates while maintaining strict design system fidelity."}
            </p>
          </div>

          {/* 03. Research */}
          <div className="space-y-4">
            <div className="text-xs font-mono text-lime uppercase tracking-widest">
              03 / RESEARCH & STRATEGY
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white dark:text-white light:text-gray-900">
              {project.research?.summary || "Understanding user behaviors and business objectives."}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {(project.research?.points || [
                "Qualitative interviews and contextual inquiries",
                "Information architecture mapping and rapid card sorting",
                "High-fidelity prototyping with sub-second feedback loops"
              ]).map((point, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl bg-[#14171d] dark:bg-[#14171d] light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 flex flex-col justify-between"
                >
                  <span className="text-xs font-mono text-lime mb-2">0{index + 1}</span>
                  <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 04. Final Design & Results */}
          <div className="space-y-6">
            <div className="text-xs font-mono text-lime uppercase tracking-widest">
              04 / FINAL DESIGN & IMPACT
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white dark:text-white light:text-gray-900">
              Engineered for seamless cross-platform performance.
            </h3>
            <div className="space-y-3">
              {(project.finalDesignNotes || [
                "Optimized responsive layouts with rigorous typographic scale",
                "Zero-latency interaction states with accessible micro-animations",
                "Delivered production-ready component tokens and design guidelines"
              ]).map((note, index) => (
                <div key={index} className="flex items-start space-x-3 text-sm text-gray-400">
                  <CheckCircle2 className="w-5 h-5 text-lime shrink-0 mt-0.5" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Project Footer Bar */}
        <div className="pt-16 mt-16 border-t border-white/10 dark:border-white/10 light:border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-mono text-gray-500 uppercase">NEXT PROJECT</div>
            <Link
              to={`/projects/${nextProject.id}`}
              className="text-2xl font-bold font-display text-white dark:text-white light:text-gray-900 hover:text-lime transition-colors inline-flex items-center space-x-2"
            >
              <span>{nextProject.title}</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

          <Link
            to="/contact"
            className="px-6 py-3 rounded-full bg-lime text-black font-bold text-sm hover:bg-lime-hover shadow-[0_0_20px_rgba(198,242,33,0.3)] transition-all"
          >
            Start Your Project ↗
          </Link>
        </div>
      </div>
    </div>
  );
};

