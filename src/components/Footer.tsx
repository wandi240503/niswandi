import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-white/10 dark:border-white/10 light:border-gray-200 bg-[#07080a] dark:bg-[#07080a] light:bg-gray-100 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-white/10 dark:border-white/10 light:border-gray-200 gap-6">
          <div>
            <Link to="/" className="inline-block group">
              <span className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white dark:text-white light:text-gray-900 font-display">
                NISWANDI<span className="text-lime inline-block transform group-hover:scale-125 transition-transform">.</span>
              </span>
            </Link>
          </div>
          <p className="text-sm sm:text-base font-mono uppercase tracking-wider text-gray-400 dark:text-gray-400 light:text-gray-600">
            Designer & Developer Based in Indonesia
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {/* Navigation Column 1 */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-lime transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-lime transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-lime transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/cv" className="text-sm text-lime hover:underline transition-colors font-medium">
                  Curriculum Vitae (CV)
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2 */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
              SERVICES
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/services" className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-lime transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/experience" className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-lime transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-lime transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
              CONNECT
            </h4>
            <ul className="space-y-2.5">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-lime transition-colors group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-lime transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Back to top Column */}
          <div className="flex flex-col justify-between items-start md:items-end">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
              INDEX
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-white/10 dark:border-white/10 light:border-gray-300 bg-white/5 dark:bg-white/5 light:bg-white text-xs font-mono tracking-wider text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-lime hover:border-lime transition-all duration-200"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 dark:border-white/5 light:border-gray-200 text-xs font-mono text-gray-500 dark:text-gray-500 light:text-gray-500 gap-4">
          <p>© 2026 Niswandi. All rights reserved.</p>
          <p className="tracking-widest uppercase">DESIGNED & DEVELOPED WITH PASSION</p>
        </div>
      </div>
    </footer>
  );
};

