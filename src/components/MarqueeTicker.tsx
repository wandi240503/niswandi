import React from 'react';
import { MARQUEE_ITEMS } from '../data/portfolioData';

export const MarqueeTicker: React.FC = () => {
  // Duplicate array multiple times for seamless infinite loop
  const repeatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="w-full overflow-hidden border-y border-white/10 dark:border-white/10 light:border-gray-200 bg-[#0c0e12]/60 dark:bg-[#0c0e12]/60 light:bg-gray-50/80 py-4 my-12 relative select-none">
      <div className="flex w-max animate-marquee space-x-8 items-center">
        {repeatedItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-8 shrink-0">
            <span className="text-sm sm:text-base font-extrabold tracking-widest text-gray-300 dark:text-gray-300 light:text-gray-800 uppercase font-display">
              {item}
            </span>
            <span className="text-lime text-base drop-shadow-[0_0_8px_rgba(198,242,33,0.8)]">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

