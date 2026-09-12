import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Layout, Monitor, Code, Palette } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

export const ServicesPage: React.FC = () => {
  const serviceIcons = [
    <Layout className="w-6 h-6 text-lime" />,
    <Monitor className="w-6 h-6 text-lime" />,
    <Code className="w-6 h-6 text-lime" />,
    <Palette className="w-6 h-6 text-lime" />,
  ];

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="text-xs font-mono tracking-widest text-lime uppercase">
            SERVICES
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white dark:text-white light:text-gray-900 leading-tight">
            From idea to digital product<span className="text-lime">.</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
            Turning ideas into meaningful digital experiences through design and technology.
          </p>
        </div>

        {/* 4 Pillars Expanded Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="p-8 sm:p-10 rounded-3xl bg-[#14171d] dark:bg-[#14171d] light:bg-white border border-white/10 dark:border-white/10 light:border-gray-200 hover:border-lime/40 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-gray-100 flex items-center justify-center border border-white/10 dark:border-white/10 light:border-gray-200">
                    {serviceIcons[index]}
                  </div>
                  <span className="text-xs font-mono font-bold text-lime">
                    {service.number}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-display text-white dark:text-white light:text-gray-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Checklist of deliverables */}
                <div className="space-y-2.5 pt-4 border-t border-white/5 dark:border-white/5 light:border-gray-100">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block mb-3">
                    WHAT'S INCLUDED
                  </span>
                  {service.tags.map((tag) => (
                    <div key={tag} className="flex items-center space-x-2 text-xs sm:text-sm text-gray-300 dark:text-gray-300 light:text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-lime shrink-0" />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10 dark:border-white/10 light:border-gray-100 flex justify-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase font-bold text-lime hover:underline"
                >
                  <span>Inquire Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="rounded-3xl bg-[#14171d] dark:bg-[#14171d] light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 p-8 sm:p-12 text-center shadow-xl">
          <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white dark:text-white light:text-gray-900 mb-4">
            Need a custom service package?
          </h3>
          <p className="text-sm sm:text-base text-gray-400 dark:text-gray-400 light:text-gray-600 max-w-xl mx-auto mb-8">
            Whether you need a complete design overhaul or an end-to-end full-stack web build, let's tailor a scope of work for your project.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-lime text-black font-bold text-sm hover:bg-lime-hover shadow-[0_0_20px_rgba(198,242,33,0.3)] transition-all"
          >
            <span>Let's Discuss</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

