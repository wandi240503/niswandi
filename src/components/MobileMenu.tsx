import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowUpRight } from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon } from './SocialIcons';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  if (!isOpen) return null;

  const links = [
    { number: '01', name: 'Home', path: '/' },
    { number: '02', name: 'Projects', path: '/projects' },
    { number: '03', name: 'About', path: '/about' },
    { number: '04', name: 'CV / Resume', path: '/cv' },
    { number: '05', name: 'Services', path: '/services' },
    { number: '06', name: 'Experience', path: '/experience' },
    { number: '07', name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0b0e] flex flex-col justify-between p-6 sm:p-8 animate-fadeIn">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link to="/" onClick={onClose} className="text-2xl font-extrabold tracking-tighter text-white font-display">
          NISWANDI<span className="text-lime">.</span>
        </Link>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:text-lime hover:border-lime transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="my-auto py-8 space-y-4">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.number}
              to={link.path}
              onClick={onClose}
              className="flex items-baseline space-x-4 group"
            >
              <span className={`text-xs font-mono tracking-widest ${isActive ? 'text-lime' : 'text-gray-500 group-hover:text-lime'}`}>
                {link.number}
              </span>
              <span
                className={`text-3xl sm:text-4xl font-extrabold font-display tracking-tight transition-all duration-200 ${
                  isActive
                    ? 'text-lime translate-x-2'
                    : 'text-white group-hover:text-lime group-hover:translate-x-2'
                }`}
              >
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section: Socials & CTA */}
      <div className="space-y-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-400">
          <a
            href="https://www.linkedin.com/in/niswandii/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 hover:text-lime transition-colors"
          >
            <LinkedinIcon className="w-4 h-4 text-lime" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 text-gray-500" />
          </a>
          <a
            href="https://github.com/wandi240503"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 hover:text-lime transition-colors"
          >
            <GithubIcon className="w-4 h-4 text-lime" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-gray-500" />
          </a>
          <a
            href="https://instagram.com/niswandi"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 hover:text-lime transition-colors"
          >
            <InstagramIcon className="w-4 h-4 text-lime" />
            <span>Instagram</span>
            <ArrowUpRight className="w-3 h-3 text-gray-500" />
          </a>
          <a
            href="mailto:muhniswandii@gmail.com"
            className="flex items-center space-x-2 hover:text-lime transition-colors"
          >
            <span>Email</span>
            <ArrowUpRight className="w-3 h-3 text-gray-500" />
          </a>
        </div>

        <Link
          to="/contact"
          onClick={onClose}
          className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-full bg-lime text-black font-bold text-base hover:bg-lime-hover shadow-[0_0_25px_rgba(198,242,33,0.3)] transition-all"
        >
          <span>Let's Talk</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

