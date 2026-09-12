import React from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowUpRight, Compass, Laptop, Camera, Plane, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { ABOUT_DATA } from '../data/portfolioData';

export const AboutPage: React.FC = () => {
  const interestIcons: Record<string, React.ReactNode> = {
    Design: <Compass className="w-5 h-5 text-lime" />,
    Technology: <Laptop className="w-5 h-5 text-lime" />,
    Photography: <Camera className="w-5 h-5 text-lime" />,
    Travel: <Plane className="w-5 h-5 text-lime" />,
  };

  const handleDownloadResume = () => {
    // Generate a simple clean text resume or trigger prompt
    const resumeText = `NISWANDI - Designer & Developer Based in Indonesia
Email: muhniswandii@gmail.com
GitHub: https://github.com/wandi240503
LinkedIn: https://www.linkedin.com/in/niswandii/

FOCUS:
- UI/UX Product Design & Design Systems
- Full-Stack Frontend Engineering (React, Next.js, Tailwind CSS, TypeScript)
- WebGL & Creative Web Experiences`;

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Niswandi-Resume-2026.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Top Hero: Bio & Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono tracking-widest text-lime uppercase">
              ABOUT ME
            </div>

            <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white dark:text-white light:text-gray-900">
              {ABOUT_DATA.title}
            </h1>

            <p className="text-lg sm:text-xl font-medium text-gray-300 dark:text-gray-300 light:text-gray-800 leading-relaxed">
              {ABOUT_DATA.tagline}
            </p>

            <div className="space-y-4 text-sm sm:text-base text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
              {ABOUT_DATA.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={handleDownloadResume}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/5 dark:bg-white/5 light:bg-gray-100 border border-white/10 dark:border-white/10 light:border-gray-300 text-white dark:text-white light:text-gray-900 font-semibold text-sm hover:border-lime/40 hover:text-lime transition-all group"
              >
                <span>Download Resume</span>
                <Download className="w-4 h-4 text-gray-400 group-hover:text-lime transition-colors" />
              </button>
            </div>

            {/* Quick Details Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 dark:border-white/10 light:border-gray-200">
              <div>
                <span className="text-[11px] font-mono text-gray-500 uppercase block">Location</span>
                <span className="text-sm font-bold text-white dark:text-white light:text-gray-900">{ABOUT_DATA.details.location}</span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-gray-500 uppercase block">Focus</span>
                <span className="text-sm font-bold text-white dark:text-white light:text-gray-900">{ABOUT_DATA.details.focus}</span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-gray-500 uppercase block">Languages</span>
                <span className="text-sm font-bold text-white dark:text-white light:text-gray-900">{ABOUT_DATA.details.languages}</span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-gray-500 uppercase block">Status</span>
                <span className="text-sm font-bold text-lime inline-flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                  <span>Available</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 dark:border-white/10 light:border-gray-300 bg-[#12151a] shadow-2xl group">
              <img
                src="/images/niswandi-portrait.png"
                alt="Niswandi Portrait"
                className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0e] via-transparent to-transparent opacity-75" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-mono text-lime uppercase tracking-widest block mb-1">
                  PRODUCT DESIGNER & DEV
                </span>
                <span className="text-2xl font-serif italic text-white">Niswandi</span>
              </div>
            </div>
          </div>
        </div>

        {/* My Approach Section */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-mono tracking-widest text-lime uppercase mb-2">
              PROCESS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white dark:text-white light:text-gray-900">
              My Approach<span className="text-lime">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ABOUT_DATA.approach.map((item) => (
              <div
                key={item.number}
                className="p-6 rounded-2xl bg-[#14171d] dark:bg-[#14171d] light:bg-white border border-white/10 dark:border-white/10 light:border-gray-200 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-lime block mb-4">
                    {item.number}
                  </span>
                  <h3 className="text-xl font-bold font-display text-white dark:text-white light:text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Block */}
        <div className="rounded-3xl bg-[#14171d] dark:bg-[#14171d] light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-200 p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <blockquote className="text-xl sm:text-3xl font-extrabold font-display tracking-tight text-white dark:text-white light:text-gray-900 leading-snug">
              "{ABOUT_DATA.quote}"
            </blockquote>
            <p className="text-sm font-mono text-lime uppercase tracking-widest">
              — Niswandi
            </p>
          </div>
        </div>

        {/* Personal Interests Grid */}
        <div className="space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white dark:text-white light:text-gray-900">
            Personal Interests
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {ABOUT_DATA.interests.map((interest) => (
              <div
                key={interest}
                className="p-5 rounded-2xl bg-[#14171d] dark:bg-[#14171d] light:bg-white border border-white/10 dark:border-white/10 light:border-gray-200 flex items-center space-x-3 shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 dark:bg-white/5 light:bg-gray-100 flex items-center justify-center">
                  {interestIcons[interest]}
                </div>
                <span className="text-sm font-bold text-white dark:text-white light:text-gray-900">
                  {interest}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

