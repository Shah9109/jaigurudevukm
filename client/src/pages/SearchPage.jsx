import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Calendar, FileText, Video, HelpCircle, ArrowRight } from 'lucide-react';
import api from '../services/api';
import SectionTitle from '../components/common/SectionTitle';
import SatsangCard from '../components/cards/SatsangCard';
import NoticeCard from '../components/cards/NoticeCard';
import EventCard from '../components/cards/EventCard';
import VideoCard from '../components/cards/VideoCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [searchInput, setSearchInput] = useState(query);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    setSearchInput(query);
    if (!query.trim()) return;

    const performSearch = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/search?q=${encodeURIComponent(query.trim())}`);
        if (res.success && res.data) {
          setResults(res.data);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  const satsangResults = results?.results?.satsang || [];
  const noticeResults = results?.results?.notices || [];
  const eventResults = results?.results?.events || [];
  const adheshResults = results?.results?.adhesh || [];
  const videoResults = results?.results?.videos || [];
  const faqResults = results?.results?.faqs || [];

  const totalMatches = results?.totalMatches || 0;

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionTitle
          hindiSubtitle="वैश्विक खोज"
          title="Search Jaigurudev Platform"
          subtitle="Instant multi-domain search across Satsang schedules, notices, events, video discourses, and FAQs."
        />

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto bg-white p-3 rounded-3xl border border-roseBlush-200 shadow-soft flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 ml-2 shrink-0" />
          <input
            type="text"
            placeholder="Search keywords (e.g. Satsang, Mathura, Bhandara, Adhesh)..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full text-sm sm:text-base text-stone-800 placeholder-stone-400 bg-transparent focus:outline-hidden"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-maroon-700 text-white text-xs font-semibold hover:bg-maroon-800 transition-colors shrink-0"
          >
            Search
          </button>
        </form>

        {query && (
          <div className="text-center text-sm text-stone-500 font-light">
            Showing results for <b className="text-stone-900 font-semibold">"{query}"</b> • {totalMatches} matches found
          </div>
        )}

        {/* Results View */}
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : query && totalMatches === 0 ? (
          <EmptyState
            title={`No results found for "${query}"`}
            description="Please check the spelling or try searching for another spiritual topic or city."
            actionText="Clear Search"
            actionLink="/search"
          />
        ) : results ? (
          <div className="space-y-12">
            {/* Satsang matches */}
            {satsangResults.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2 border-b border-roseBlush-100 pb-2">
                  <Calendar className="w-5 h-5 text-maroon-700" />
                  <span>Satsang Programs ({satsangResults.length})</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {satsangResults.map((item) => (
                    <SatsangCard key={item._id} satsang={item} />
                  ))}
                </div>
              </div>
            )}

            {/* Notice matches */}
            {noticeResults.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2 border-b border-roseBlush-100 pb-2">
                  <FileText className="w-5 h-5 text-maroon-700" />
                  <span>Notices & Announcements ({noticeResults.length})</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {noticeResults.map((item) => (
                    <NoticeCard key={item._id} notice={item} />
                  ))}
                </div>
              </div>
            )}

            {/* Video matches */}
            {videoResults.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2 border-b border-roseBlush-100 pb-2">
                  <Video className="w-5 h-5 text-maroon-700" />
                  <span>Video Discourses ({videoResults.length})</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videoResults.map((item) => (
                    <VideoCard key={item._id} video={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchPage;
