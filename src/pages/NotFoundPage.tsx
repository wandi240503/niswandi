import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 pt-20">
      <div className="relative max-w-lg w-full flex flex-col items-center">
        {/* Giant 404 Text Outline */}
        <div className="text-8xl sm:text-[14rem] font-black font-display tracking-tighter text-outline select-none opacity-40 leading-none">
          404
        </div>

        {/* Floating Astronaut Image */}
        <div className="relative -mt-20 sm:-mt-36 mb-6 w-44 h-44 sm:w-56 sm:h-56 animate-bounce" style={{ animationDuration: '3.5s' }}>
          <img
            src="/images/astronaut-404.png"
            alt="Lost Astronaut in Space"
            className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(198,242,33,0.3)]"
          />
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white dark:text-white light:text-gray-900 mb-2">
          Oops<span className="text-lime">.</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-400 dark:text-gray-400 light:text-gray-600 mb-8">
          This page seems to have disappeared.
        </p>

        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-lime text-black font-bold text-sm hover:bg-lime-hover shadow-[0_0_25px_rgba(198,242,33,0.35)] transition-all transform hover:-translate-y-0.5"
        >
          <span>Back to Home</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

