import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, List, Search, MapPin, Clock, User, Filter, ChevronLeft, ChevronRight, Share2, Navigation } from 'lucide-react';
import api from '../services/api';
import SectionTitle from '../components/common/SectionTitle';
import SatsangCard from '../components/cards/SatsangCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';

export const SatsangList = () => {
  const [satsangs, setSatsangs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'daily' | 'special'
  
  // Calendar state
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchSatsangs = async () => {
      setLoading(true);
      try {
        const res = await api.get('/satsang?limit=50');
        if (res.success && res.data) {
          setSatsangs(res.data);
        }
      } catch (err) {
        console.error('Error fetching satsangs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSatsangs();
  }, []);

  // Filter satsangs
  const filteredSatsangs = satsangs.filter((item) => {
    const matchesSearch =
      !searchTerm ||
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.speaker?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === 'all' ||
      (filterType === 'daily' && item.isDaily) ||
      (filterType === 'special' && !item.isDaily);

    return matchesSearch && matchesType;
  });

  // Calendar helpers
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentMonthDate.toLocaleString('default', { month: 'long' });

  const prevMonth = () => setCurrentMonthDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonthDate(new Date(year, month + 1, 1));

  // Find satsangs for a specific calendar day
  const getSatsangsForDay = (day) => {
    return filteredSatsangs.filter((item) => {
      const d = new Date(item.date);
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
    });
  };

  const selectedDaySatsangs = selectedDate
    ? getSatsangsForDay(selectedDate)
    : [];

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <SectionTitle
            hindiSubtitle="पावन सत्संग समय सारिणी"
            title="Satsang Schedule & Spiritual Programs"
            subtitle="Join Pujya Maharaj Ji and Ashram preachers for divine discourses, Naam-Dhyan sessions, and annual spiritual samagams."
          />

          {/* Search and Filters Bar */}
          <div className="mt-8 bg-white p-3 rounded-3xl border border-roseBlush-200 shadow-soft flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by city, venue, or speaker (e.g. Mathura, Agra)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-roseBlush-50/50 text-stone-800 placeholder-stone-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-roseBlush-300"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-between sm:justify-end">
              {/* Type Filter */}
              <div className="flex bg-roseBlush-50 p-1 rounded-2xl border border-roseBlush-100 text-xs">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${filterType === 'all' ? 'bg-white text-maroon-800 font-bold shadow-xs' : 'text-stone-600'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('special')}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${filterType === 'special' ? 'bg-white text-maroon-800 font-bold shadow-xs' : 'text-stone-600'}`}
                >
                  Special
                </button>
                <button
                  onClick={() => setFilterType('daily')}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${filterType === 'daily' ? 'bg-white text-maroon-800 font-bold shadow-xs' : 'text-stone-600'}`}
                >
                  Daily
                </button>
              </div>

              {/* View Toggle */}
              <div className="flex bg-roseBlush-50 p-1 rounded-2xl border border-roseBlush-100 text-xs">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-xl transition-colors ${viewMode === 'list' ? 'bg-white text-maroon-800 shadow-xs' : 'text-stone-500'}`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`p-1.5 rounded-xl transition-colors ${viewMode === 'calendar' ? 'bg-white text-maroon-800 shadow-xs' : 'text-stone-500'}`}
                  aria-label="Calendar view"
                >
                  <CalendarIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT VIEW */}
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : viewMode === 'list' ? (
          /* 1. LIST VIEW */
          filteredSatsangs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSatsangs.map((item) => (
                <SatsangCard key={item._id || item.id} satsang={item} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Satsang programs found"
              description="Try adjusting your search criteria or view our regular daily programs."
              actionText="Reset Filters"
              actionLink="/satsang"
            />
          )
        ) : (
          /* 2. CALENDAR VIEW */
          <div className="bg-white rounded-3xl border border-roseBlush-200 p-6 sm:p-8 shadow-soft">
            {/* Month Selector Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-roseBlush-100">
              <div className="flex items-center gap-3">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  {monthName} {year}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-roseBlush-100 text-maroon-800 font-semibold">
                  {filteredSatsangs.length} Programs
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-xl border border-roseBlush-200 hover:bg-roseBlush-50 text-stone-700 transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-xl border border-roseBlush-200 hover:bg-roseBlush-50 text-stone-700 transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center py-4 text-xs font-bold text-stone-500 uppercase tracking-wider">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Month Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {Array.from({ length: firstDayIndex }).map((_, idx) => (
                <div key={`empty-${idx}`} className="h-20 sm:h-28 rounded-2xl bg-stone-50/50 p-1" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const day = idx + 1;
                const daySatsangs = getSatsangsForDay(day);
                const hasSatsang = daySatsangs.length > 0;
                const isSelected = selectedDate === day;

                return (
                  <div
                    key={`day-${day}`}
                    onClick={() => setSelectedDate(day)}
                    className={`h-20 sm:h-28 rounded-2xl p-2 sm:p-2.5 flex flex-col justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-maroon-700 text-white shadow-md scale-102 ring-2 ring-sacredGold-400'
                        : hasSatsang
                        ? 'bg-roseBlush-100/70 hover:bg-roseBlush-200 text-stone-900 border border-roseBlush-300/80'
                        : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-100'
                    }`}
                  >
                    <span className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                      {day}
                    </span>

                    {hasSatsang && (
                      <div className="space-y-1">
                        <div className={`text-[10px] sm:text-[11px] font-semibold truncate rounded px-1.5 py-0.5 ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-maroon-700 text-white'
                        }`}>
                          {daySatsangs[0].title}
                        </div>
                        {daySatsangs.length > 1 && (
                          <span className={`text-[9px] block ${isSelected ? 'text-roseBlush-200' : 'text-maroon-700 font-bold'}`}>
                            +{daySatsangs.length - 1} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Selected Day Details Panel */}
            {selectedDate && (
              <div className="mt-8 pt-6 border-t border-roseBlush-200 animate-in fade-in duration-300">
                <h4 className="text-lg font-serif font-bold text-stone-900 mb-4">
                  Satsang Programs on {monthName} {selectedDate}, {year}
                </h4>
                {selectedDaySatsangs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedDaySatsangs.map((item) => (
                      <SatsangCard key={item._id || item.id} satsang={item} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-stone-500 italic">No specific programs on this date. Daily morning and evening dhyan continues as regular.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SatsangList;
