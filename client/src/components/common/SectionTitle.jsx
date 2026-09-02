import React from 'react';

export const SectionTitle = ({
  title,
  hindiSubtitle,
  subtitle,
  centered = true,
  className = '',
}) => {
  return (
    <div className={`mb-10 sm:mb-14 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      {hindiSubtitle && (
        <span className="font-devanagari text-maroon-700 font-bold text-sm sm:text-base tracking-wider uppercase inline-block mb-1.5 px-3 py-1 bg-roseBlush-100/70 rounded-full">
          {hindiSubtitle}
        </span>
      )}
      <h2 className="text-2xl sm:text-3.5xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
        {title}
      </h2>
      
      {/* Decorative Lotus Divider */}
      <div className={`flex items-center gap-2 mt-3 ${centered ? 'justify-center' : 'justify-start'}`}>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-sacredGold-400 rounded-full" />
        <div className="w-2 h-2 rounded-full bg-sacredGold-500 shadow-xs" />
        <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-sacredGold-400 rounded-full" />
      </div>

      {subtitle && (
        <p className={`mt-3 text-stone-600 text-sm sm:text-base max-w-2xl font-light ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
