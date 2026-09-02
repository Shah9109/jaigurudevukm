import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

export const EventCard = ({ event }) => {
  if (!event) return null;

  const startDate = new Date(event.startDate || Date.now()).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="group bg-white rounded-2xl border border-roseBlush-100 shadow-soft hover:shadow-sacred transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1">
      {/* Event Banner Image or Sacred Placeholder */}
      <div className="relative h-44 sm:h-48 w-full bg-gradient-to-br from-roseBlush-100 to-roseBlush-200 overflow-hidden">
        {event.bannerImage ? (
          <img
            src={event.bannerImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-maroon-700 p-4 text-center">
            <Calendar className="w-10 h-10 mb-2 opacity-80" />
            <span className="font-devanagari text-lg font-bold">जयगुरुदेव सत्संग एवं भण्डारा</span>
          </div>
        )}
        <div className="absolute top-3 left-3 bg-maroon-800/90 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          {event.status || 'Upcoming'}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-sacredGold-700 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>{startDate}</span>
          </div>

          <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-maroon-700 transition-colors mb-2 line-clamp-2">
            {event.title}
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
            {event.description}
          </p>
        </div>

        <div className="pt-3 border-t border-roseBlush-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-stone-500 truncate max-w-[170px]">
            <MapPin className="w-3.5 h-3.5 text-maroon-600 shrink-0" />
            <span className="truncate">{event.location}, {event.city}</span>
          </div>

          <Link
            to={`/events/${event.slug || event._id || ''}`}
            className="inline-flex items-center gap-1 font-bold text-maroon-700 hover:text-maroon-900"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
