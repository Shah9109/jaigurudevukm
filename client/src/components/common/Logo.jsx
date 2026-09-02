import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ size = 'default', light = false, showTagline = true, className = '' }) => {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 group transition-transform duration-300 hover:scale-[1.01] ${className}`} aria-label="Jaigurudev Sanstha Home">
      {/* Param Pujya Satgurus Composite Portrait Emblem */}
      <div className={`relative flex items-center justify-center shrink-0 rounded-2xl overflow-hidden ${
        isSmall ? 'w-10 h-10' : isLarge ? 'w-14 h-14' : 'w-12 h-12'
      } border-2 ${light ? 'border-sacredGold-400' : 'border-sacredGold-400'} shadow-md bg-stone-100 transition-transform duration-300 group-hover:scale-105`}>
        <img
          src="/images/app_logo.png"
          alt="Param Pujya Baba Jaigurudev Ji & Baba Umakant Ji Maharaj"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Typography */}
      <div className="flex flex-col text-left">
        <span className={`font-devanagari font-extrabold tracking-wide leading-none ${
          isSmall ? 'text-xl' : isLarge ? 'text-3xl' : 'text-2xl md:text-2.5xl'
        } ${light ? 'text-red-400' : 'text-red-600'} transition-colors`}>
          जय गुरु देव
        </span>
      </div>
    </Link>
  );
};
export default Logo;
