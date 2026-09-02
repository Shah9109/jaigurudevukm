import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, Filter } from 'lucide-react';
import api from '../services/api';
import SectionTitle from '../components/common/SectionTitle';
import EventCard from '../components/cards/EventCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';

export const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/events?status=${statusFilter === 'all' ? '' : statusFilter}`);
        if (res.success && res.data) {
          setEvents(res.data);
        }
      } catch (err) {
        console.error('Error loading events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [statusFilter]);

  const filteredEvents = events.filter((e) =>
    !searchTerm ||
    e.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionTitle
          hindiSubtitle="वार्षिक उत्सव एवं संत समागम"
          title="Ashram Events & Special Festivals"
          subtitle="Join thousands of devotees during our annual Bhandara, Guru Purnima Mahotsav, and spiritual gatherings."
        />

        {/* Filters and Search */}
        <div className="bg-white p-3 rounded-3xl border border-roseBlush-200 shadow-soft flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search events by name, city, or venue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-roseBlush-50/50 text-stone-800 placeholder-stone-400 text-sm focus:outline-hidden"
            />
          </div>

          <div className="flex bg-roseBlush-50 p-1 rounded-2xl border border-roseBlush-100 text-xs">
            <button
              onClick={() => setStatusFilter('upcoming')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${statusFilter === 'upcoming' ? 'bg-white text-maroon-800 font-bold shadow-xs' : 'text-stone-600'}`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${statusFilter === 'completed' ? 'bg-white text-maroon-800 font-bold shadow-xs' : 'text-stone-600'}`}
            >
              Past Events
            </button>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${statusFilter === 'all' ? 'bg-white text-maroon-800 font-bold shadow-xs' : 'text-stone-600'}`}
            >
              All
            </button>
          </div>
        </div>

        {/* Event Grid */}
        {loading ? (
          <LoadingSkeleton count={3} />
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event._id || event.id} event={event} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No events found"
            description="There are currently no events matching your selected criteria."
            actionText="View All Events"
            actionLink="/events"
          />
        )}
      </div>
    </div>
  );
};

export default EventsList;
