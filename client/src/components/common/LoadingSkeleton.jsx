import React from 'react';

export const LoadingSkeleton = ({ count = 3, type = 'card' }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="bg-white rounded-2xl border border-roseBlush-100 p-5 space-y-4">
          <div className="h-40 bg-roseBlush-100/60 rounded-xl w-full" />
          <div className="h-5 bg-roseBlush-100/80 rounded-md w-3/4" />
          <div className="space-y-2">
            <div className="h-3.5 bg-roseBlush-50 rounded-md w-full" />
            <div className="h-3.5 bg-roseBlush-50 rounded-md w-5/6" />
          </div>
          <div className="h-8 bg-roseBlush-100/50 rounded-lg w-1/3 pt-2" />
        </div>
      ))}
    </div>
  );
};

export const EmptyState = ({
  title = 'No items found',
  description = 'There are no active records in this section currently.',
  actionText = 'Back to Home',
  actionLink = '/',
}) => {
  return (
    <div className="text-center py-16 px-4 bg-white/70 rounded-3xl border border-roseBlush-100 max-w-md mx-auto my-8">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-roseBlush-100 text-maroon-700 flex items-center justify-center font-devanagari text-2xl font-bold">
        ॐ
      </div>
      <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-stone-500 mb-6 font-light">{description}</p>
      {actionLink && (
        <a
          href={actionLink}
          className="inline-flex items-center px-5 py-2.5 rounded-full bg-maroon-700 text-white text-xs font-semibold hover:bg-maroon-800 transition-colors shadow-xs"
        >
          {actionText}
        </a>
      )}
    </div>
  );
};

export default LoadingSkeleton;
