import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        // Smooth random increment
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0b0e] flex flex-col items-center justify-center transition-opacity duration-500 select-none">
      <div className="text-center space-y-6 max-w-xs w-full px-6">
        {/* Brand Logo */}
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-white font-display">
          NISWANDI<span className="text-lime">.</span>
        </h1>

        <p className="text-xs font-mono tracking-widest text-gray-400 uppercase">
          Loading experience...
        </p>

        {/* Big percentage counter */}
        <div className="text-5xl sm:text-6xl font-black text-white tracking-tight font-display">
          {progress}<span className="text-lime text-3xl font-bold ml-1">%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-lime transition-all duration-150 ease-out shadow-[0_0_12px_rgba(198,242,33,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

