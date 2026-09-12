import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, Star, Mail, Grid3X3, LayoutGrid } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../components/SocialIcons';
import { HERO_DATA, PHILOSOPHY_DATA, SERVICES, TESTIMONIALS } from '../data/portfolioData';
import { getStoredProjects } from '../utils/projectStorage';
import { MarqueeTicker } from '../components/MarqueeTicker';
import { ProjectCard } from '../components/ProjectCard';

export const HomePage: React.FC = () => {
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

  const [gridCols, setGridCols] = useState<2 | 3>(3);
  const testimonial = TESTIMONIALS[0];

  return (
    <div className="pt-24 sm:pt-28 pb-16">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Availability Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#14171d] dark:bg-[#14171d] light:bg-white border border-white/10 dark:border-white/10 light:border-gray-300 text-xs font-mono tracking-wider">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="text-gray-300 dark:text-gray-300 light:text-gray-700 uppercase font-medium">
                {HERO_DATA.availability}
              </span>
            </div>

            {/* Greeting */}
            <p className="text-base sm:text-lg font-mono text-gray-400 dark:text-gray-400 light:text-gray-600">
              {HERO_DATA.greeting}
            </p>

            {/* Big Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-white dark:text-white light:text-gray-900 uppercase leading-[1.05]">
                {HERO_DATA.headlineLine1}
              </h1>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-outline uppercase leading-[1.05]">
                {HERO_DATA.headlineLine2}
              </h1>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-white dark:text-white light:text-gray-900 uppercase leading-[1.05]">
                {HERO_DATA.headlineLine3.replace('.', '')}
                <span className="text-lime">.</span>
              </h1>
            </div>

            {/* Subtitle / Tagline */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-400 dark:text-gray-400 light:text-gray-600 max-w-xl leading-relaxed">
              {HERO_DATA.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/projects"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-lime text-black font-bold text-sm sm:text-base hover:bg-lime-hover shadow-[0_0_25px_rgba(198,242,33,0.35)] transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore My Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-[#14171d] dark:bg-[#14171d] light:bg-white text-white dark:text-white light:text-gray-900 font-semibold text-sm sm:text-base border border-white/10 dark:border-white/10 light:border-gray-300 hover:border-lime/50 transition-all transform hover:-translate-y-0.5"
              >
                <span>About Me</span>
              </Link>
            </div>

            {/* Micro Info Row */}
            <div className="flex items-center space-x-8 pt-6 text-xs font-mono text-gray-500 dark:text-gray-500 light:text-gray-500">
              <span className="inline-flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                <span>{HERO_DATA.location}</span>
              </span>
              <span className="inline-flex items-center space-x-1.5">
                <span>Scroll to explore</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </span>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Ambient Radial Glow */}
            <div className="absolute inset-0 bg-lime/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 dark:border-white/10 light:border-gray-300 bg-[#12151a] shadow-2xl group">
              {/* Portrait Image */}
              <img
                src="/images/niswandi-portrait.png"
                alt="Niswandi Portrait"
                className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-transparent to-transparent opacity-80" />

              {/* Top Floating Tags */}
              <div className="absolute top-5 left-5 right-5 flex flex-wrap gap-2">
                <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-lime font-semibold">
                  AVAILABLE // 2026
                </div>
              </div>

              {/* Bottom Signature & Floating Roles */}
              <div className="absolute bottom-6 left-6 right-6 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {HERO_DATA.roles.map((role) => (
                    <span
                      key={role}
                      className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-medium text-white shadow-lg"
                    >
                      {role}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex items-baseline justify-between border-t border-white/10">
                  <span className="text-lg font-serif italic text-white tracking-wide">
                    Niswandi
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-gray-400">
                    {HERO_DATA.experienceTag}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFINITE MARQUEE TICKER */}
      <MarqueeTicker />

      {/* 3. SELECTED WORK SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-lime uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" />
              <span>01 / ALL PROJECTS ({String(projects.length).padStart(2, '0')})</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white dark:text-white light:text-gray-900">
              Projects I'm proud of<span className="text-lime">.</span>
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
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

            <Link
              to="/projects"
              className="inline-flex items-center space-x-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#14171d] hover:bg-lime hover:text-black border border-white/10 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-gray-300 transition-all group"
            >
              <span>Explore Gallery</span>
              <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* All Projects Grid - Tanpa Pembatasan */}
        {projects.length > 0 ? (
          <div
            className={
              gridCols === 3
                ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6'
                : 'grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8'
            }
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-400 font-mono text-sm border border-dashed border-white/10 rounded-2xl">
            Belum ada proyek yang ditambahkan. Silakan tambahkan melalui panel Admin.
          </div>
        )}
      </section>

      {/* 4. PHILOSOPHY & STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl bg-[#14171d]/60 dark:bg-[#14171d]/60 light:bg-white border border-white/10 dark:border-white/10 light:border-gray-200 p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono tracking-widest text-lime uppercase">
                {PHILOSOPHY_DATA.sectionTag}
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white dark:text-white light:text-gray-900 leading-snug">
                {PHILOSOPHY_DATA.headline}
              </h2>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-sm sm:text-base text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                "{PHILOSOPHY_DATA.quote}"
              </p>
              <div>
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-2 text-sm font-bold text-white dark:text-white light:text-gray-900 hover:text-lime transition-colors group"
                >
                  <span>More About Me</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* 3 Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10 dark:border-white/10 light:border-gray-200">
            {PHILOSOPHY_DATA.stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-[#0e1014] dark:bg-[#0e1014] light:bg-gray-50 border border-white/5 dark:border-white/5 light:border-gray-200"
              >
                <div className="text-4xl sm:text-5xl font-black font-display tracking-tight text-lime mb-2">
                  {stat.value}
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-white dark:text-white light:text-gray-900 mb-1">
                  {stat.label}
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-600">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICES SECTION ("How I can help.") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono tracking-widest text-lime uppercase mb-2">
              03 / WHAT I DO
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white dark:text-white light:text-gray-900">
              How I can help<span className="text-lime">.</span>
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-lime transition-colors group"
          >
            <span>View All Services</span>
            <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#14171d] dark:bg-[#14171d] light:bg-white border border-white/10 dark:border-white/10 light:border-gray-200 hover:border-lime/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="text-xs font-mono text-lime font-bold mb-4">
                  {service.number}
                </div>
                <h3 className="text-xl font-extrabold text-white dark:text-white light:text-gray-900 font-display tracking-tight group-hover:text-lime transition-colors mb-3">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Tag pills */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 dark:border-white/5 light:border-gray-100">
                {service.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/5 dark:bg-white/5 light:bg-gray-100 border border-white/10 dark:border-white/10 light:border-gray-200 text-gray-400 dark:text-gray-400 light:text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIAL & QUICK INQUIRY CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Testimonial Card */}
          <div className="lg:col-span-7 rounded-3xl bg-[#14171d] dark:bg-[#14171d] light:bg-white border border-white/10 dark:border-white/10 light:border-gray-200 p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono tracking-wider text-gray-400 uppercase">
                  RECENT TESTIMONIAL
                </span>
                <div className="flex space-x-1 text-lime">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-lime stroke-none" />
                  ))}
                </div>
              </div>

              <blockquote className="text-lg sm:text-xl font-medium text-white dark:text-white light:text-gray-900 leading-relaxed mb-8">
                "{testimonial.quote}"
              </blockquote>
            </div>

            <div className="flex items-center space-x-4 pt-6 border-t border-white/10 dark:border-white/10 light:border-gray-200">
              <div className="w-11 h-11 rounded-full bg-lime/20 border border-lime/40 flex items-center justify-center text-lime font-bold font-display text-base">
                JD
              </div>
              <div>
                <div className="text-sm font-bold text-white dark:text-white light:text-gray-900">
                  {testimonial.author}
                </div>
                <div className="text-xs text-gray-400">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Inquiry Card */}
          <div className="lg:col-span-5 rounded-3xl bg-[#14171d] dark:bg-[#14171d] light:bg-white border border-white/10 dark:border-white/10 light:border-gray-200 p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div>
              <div className="text-xs font-mono tracking-wider text-lime uppercase mb-4">
                QUICK INQUIRY
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white dark:text-white light:text-gray-900 mb-4">
                Ready to start a project?
              </h3>
              <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed mb-6">
                I'm currently accepting select freelance and contract projects. Let's build something unforgettable together.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="mailto:muhniswandii@gmail.com"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 hover:border-lime/40 text-xs sm:text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-lime transition-all group"
              >
                <span className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-lime" />
                  <span>muhniswandii@gmail.com</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-lime transition-colors" />
              </a>

              <a
                href="https://www.linkedin.com/in/niswandii/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 hover:border-lime/40 text-xs sm:text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-lime transition-all group"
              >
                <span className="flex items-center space-x-2">
                  <LinkedinIcon className="w-4 h-4 text-lime" />
                  <span>linkedin.com/in/niswandii</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-lime transition-colors" />
              </a>

              <a
                href="https://github.com/wandi240503"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 hover:border-lime/40 text-xs sm:text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-lime transition-all group"
              >
                <span className="flex items-center space-x-2">
                  <GithubIcon className="w-4 h-4 text-lime" />
                  <span>github.com/wandi240503</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-lime transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BIG CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#14171d] to-[#0d0f12] dark:from-[#14171d] dark:to-[#0d0f12] light:from-white light:to-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 py-16 sm:py-24 px-6 sm:px-12 text-center overflow-hidden shadow-2xl">
          {/* Subtle lime glow in background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lime/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-lime uppercase">
              <span>✦</span>
              <span>LET'S WORK TOGETHER</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white dark:text-white light:text-gray-900 uppercase leading-tight">
              HAVE AN IDEA? LET'S CREATE SOMETHING GREAT<span className="text-lime">.</span>
            </h2>

            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-lime text-black font-extrabold text-base hover:bg-lime-hover shadow-[0_0_30px_rgba(198,242,33,0.4)] transition-all transform hover:-translate-y-1"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
