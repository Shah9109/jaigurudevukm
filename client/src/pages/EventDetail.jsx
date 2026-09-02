import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, Phone, Navigation, Share2, ChevronLeft, AlertCircle } from 'lucide-react';
import api from '../services/api';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

export const EventDetail = () => {
  const { slugOrId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/events/${slugOrId}`);
        if (res.success && res.data) {
          setEvent(res.data);
        }
      } catch (err) {
        console.error('Error fetching event details:', err);
      } finally {
        setLoading(false);
      }
    };
    if (slugOrId) fetchEvent();
  }, [slugOrId]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event?.title || 'Jaigurudev Ashram Event',
          text: event?.description,
          url: window.location.href,
        });
      } catch (e) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <LoadingSkeleton count={1} />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-md mx-auto my-20 text-center p-8 bg-white rounded-3xl border border-roseBlush-200">
        <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">Event Not Found</h3>
        <p className="text-sm text-stone-500 mb-6">The requested ashram event details are unavailable.</p>
        <Link to="/events" className="px-6 py-2.5 rounded-full bg-maroon-700 text-white text-xs font-semibold">
          Back to Events List
        </Link>
      </div>
    );
  }

  const startDate = new Date(event.startDate).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation & Share */}
        <div className="flex items-center justify-between">
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-maroon-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Events</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-roseBlush-200 text-maroon-800 hover:bg-roseBlush-50 text-xs font-semibold shadow-xs transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>{copied ? 'Link Copied!' : 'Share Event'}</span>
          </button>
        </div>

        {/* Main Event Article */}
        <article className="bg-white rounded-3xl border border-roseBlush-200 overflow-hidden shadow-soft">
          {/* Banner Image */}
          {event.bannerImage && (
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img src={event.bannerImage} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          )}

          <div className="p-6 sm:p-10 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-maroon-100 text-maroon-800 uppercase tracking-wider">
                {event.status || 'Upcoming Event'}
              </span>
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
                {event.title}
              </h1>
            </div>

            {/* Event Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6 rounded-2xl bg-roseBlush-50/70 border border-roseBlush-100 text-stone-700">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-maroon-700 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">दिनांक / Date</span>
                  <span className="text-sm font-semibold text-stone-900">{startDate}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-maroon-700 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">समय / Timings</span>
                  <span className="text-sm font-semibold text-stone-900">{event.startTime || '06:00 AM'} {event.endTime ? `to ${event.endTime}` : ''}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-maroon-700 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">आयोजक / Organizer</span>
                  <span className="text-sm font-semibold text-stone-900">{event.organizer || 'Jaigurudev Sanstha'}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Event Description & Schedule
              </h3>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Location & Map */}
            <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-4">
              <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-maroon-700" />
                <span>स्थान एवं पता (Venue)</span>
              </h3>

              <div className="space-y-1 text-sm text-stone-700">
                <p className="font-bold text-stone-900">{event.location}</p>
                {event.address && <p className="font-light">{event.address}</p>}
                <p className="font-medium text-maroon-800">{event.city}, {event.state}</p>
              </div>

              <a
                href={event.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${event.location} ${event.city}`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-maroon-700 text-white text-xs font-semibold hover:bg-maroon-800 transition-colors shadow-xs"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default EventDetail;
