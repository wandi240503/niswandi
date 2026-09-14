import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X, Sun, Moon, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsLightMode(true);
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      setIsLightMode(false);
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    if (isLightMode) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsLightMode(false);
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsLightMode(true);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Experience', path: '/experience' },
    { name: 'CV', path: '/cv' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0b0e]/85 dark:bg-[#0a0b0e]/90 light:bg-white/90 backdrop-blur-md border-b border-white/10 py-4 shadow-lg'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="group flex items-center space-x-1">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-white dark:text-white light:text-gray-900 font-display">
            NISWANDI<span className="text-lime inline-block transform group-hover:scale-125 transition-transform duration-300">.</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive
                    ? 'text-white dark:text-white light:text-black font-semibold'
                    : 'text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white light:hover:text-black'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-lime rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-10 h-10 rounded-full border border-white/10 dark:border-white/10 light:border-gray-300 bg-white/5 dark:bg-white/5 light:bg-gray-100 flex items-center justify-center text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-lime hover:border-lime/40 transition-all duration-200"
            title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Let's Talk CTA Button */}
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-lime text-black font-semibold text-sm hover:bg-lime-hover shadow-[0_0_20px_rgba(198,242,33,0.3)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={onOpenMobileMenu}
            aria-label="Open Navigation Menu"
            className="md:hidden w-10 h-10 rounded-full border border-white/10 dark:border-white/10 light:border-gray-300 bg-white/5 dark:bg-white/5 light:bg-gray-100 flex items-center justify-center text-white dark:text-white light:text-gray-900"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

