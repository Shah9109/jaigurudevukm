import React from 'react';
import { Link } from 'react-router-dom';

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
        <Link
          to={actionLink}
          className="inline-flex items-center px-5 py-2.5 rounded-full bg-maroon-700 text-white text-xs font-semibold hover:bg-maroon-800 transition-colors shadow-xs"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
