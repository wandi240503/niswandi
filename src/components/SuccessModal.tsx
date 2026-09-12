import React from 'react';
import { Check, ArrowUpRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#12151a] border border-white/10 rounded-3xl p-8 sm:p-10 text-center shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Checkmark Icon Circle */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-lime/15 border border-lime/40 flex items-center justify-center text-lime shadow-[0_0_25px_rgba(198,242,33,0.3)]">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight mb-2">
          Message Sent!
        </h3>

        {/* Body */}
        <p className="text-sm text-gray-400 mb-8">
          Thanks for reaching out. I'll get back to you as soon as possible.
        </p>

        {/* Action Button */}
        <Link
          to="/"
          onClick={onClose}
          className="inline-flex items-center justify-center space-x-2 w-full py-3.5 px-6 rounded-full bg-lime text-black font-bold text-sm hover:bg-lime-hover shadow-[0_0_20px_rgba(198,242,33,0.3)] transition-all"
        >
          <span>Back to Home</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

