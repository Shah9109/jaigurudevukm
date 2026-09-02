import React, { useState, useEffect, useRef } from 'react';
import { Search, Music, Play, Pause, Download, Volume2, Clock, Sparkles, FileText, X } from 'lucide-react';
import api from '../services/api';
import SectionTitle from '../components/common/SectionTitle';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';

export const AudioLibrary = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTrack, setActiveTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [lyricsOpen, setLyricsOpen] = useState(false);
  
  const audioRef = useRef(null);

  const categories = [
    { label: 'All Audio', value: 'all' },
    { label: 'Naam Dhun', value: 'Naam Dhun' },
    { label: 'Bhajans', value: 'Bhajan' },
    { label: 'Morning Prayers', value: 'Morning Prayer' },
    { label: 'Discourses', value: 'Discourse' },
  ];

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      try {
        const query = categoryFilter === 'all' ? '' : `?category=${encodeURIComponent(categoryFilter)}`;
        const res = await api.get(`/audio${query}`);
        if (res.success && res.data) {
          setTracks(res.data);
          if (res.data.length > 0 && !activeTrack) {
            setActiveTrack(res.data[0]);
          }
        }
      } catch (err) {
        console.error('Error loading audio:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTracks();
  }, [categoryFilter]);

  const togglePlay = (track) => {
    if (activeTrack?._id === track._id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setActiveTrack(track);
      setIsPlaying(true);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      }, 50);
    }
  };

  const filteredTracks = tracks.filter((t) =>
    !searchTerm ||
    t.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.speaker?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionTitle
          hindiSubtitle="भजन, नाम-धुन एवं प्रार्थना"
          title="Devotional Audio Library"
          subtitle="Immerse yourself in soul-stirring Bhajans, continuous Naam Dhun, and sacred morning prayers."
        />

        {/* Global Active Player Bar */}
        {activeTrack && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#380E15] via-[#5C1622] to-[#380E15] text-white shadow-2xl border border-sacredGold-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button
                  onClick={() => togglePlay(activeTrack)}
                  className="w-14 h-14 rounded-full bg-sacredGold-400 hover:bg-sacredGold-300 text-maroon-950 flex items-center justify-center shrink-0 shadow-lg transition-transform hover:scale-105"
                  aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                </button>
                <div className="overflow-hidden">
                  <span className="text-xs font-semibold text-sacredGold-300 uppercase tracking-wider block">
                    Now Playing • {activeTrack.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white truncate max-w-md">
                    {activeTrack.title}
                  </h3>
                  <span className="text-xs text-roseBlush-200/80">{activeTrack.speaker || 'Ashram Mandali'}</span>
                </div>
              </div>

              {/* Native Audio Element with controls */}
              <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
                <audio
                  ref={audioRef}
                  src={activeTrack.audioUrl}
                  controls
                  className="w-full sm:w-80 h-10 accent-sacredGold-400"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                
                {activeTrack.lyrics && (
                  <button
                    onClick={() => setLyricsOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Lyrics</span>
                  </button>
                )}

                <a
                  href={activeTrack.audioUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Download audio track"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white p-3 rounded-3xl border border-roseBlush-200 shadow-soft flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by bhajan title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-roseBlush-50/50 text-stone-800 placeholder-stone-400 text-sm focus:outline-hidden"
            />
          </div>

          <div className="flex bg-roseBlush-50 p-1 rounded-2xl border border-roseBlush-100 text-xs flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategoryFilter(cat.value)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                  categoryFilter === cat.value
                    ? 'bg-white text-maroon-800 font-bold shadow-xs'
                    : 'text-stone-600 hover:text-maroon-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Track List */}
        {loading ? (
          <LoadingSkeleton count={4} />
        ) : filteredTracks.length > 0 ? (
          <div className="bg-white rounded-3xl border border-roseBlush-200 overflow-hidden shadow-soft divide-y divide-roseBlush-100">
            {filteredTracks.map((track, idx) => {
              const isCurrent = activeTrack?._id === track._id;
              return (
                <div
                  key={track._id || track.id}
                  onClick={() => togglePlay(track)}
                  className={`p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                    isCurrent ? 'bg-roseBlush-50/90' : 'hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-4 overflow-hidden">
                    <button
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                        isCurrent && isPlaying
                          ? 'bg-maroon-700 text-white'
                          : 'bg-roseBlush-100 text-maroon-700 hover:scale-105'
                      }`}
                      aria-label="Play track"
                    >
                      {isCurrent && isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>

                    <div className="overflow-hidden">
                      <h4 className={`font-serif font-bold text-sm sm:text-base truncate ${
                        isCurrent ? 'text-maroon-800' : 'text-stone-900'
                      }`}>
                        {track.title}
                      </h4>
                      <span className="text-xs text-stone-500">{track.speaker || 'Ashram Mandali'} • {track.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 text-xs text-stone-400">
                    <div className="hidden sm:flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{track.duration}</span>
                    </div>
                    <a
                      href={track.audioUrl}
                      download
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 text-stone-400 hover:text-maroon-700"
                      aria-label="Download"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="No audio tracks found"
            description="There are currently no audio tracks matching your filter."
            actionText="View All Tracks"
            actionLink="/audio"
          />
        )}

        {/* Lyrics Modal */}
        {lyricsOpen && activeTrack && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto space-y-4 border border-roseBlush-200">
              <div className="flex items-center justify-between pb-3 border-b border-roseBlush-100">
                <h3 className="font-serif font-bold text-lg text-stone-900">{activeTrack.title} — Lyrics</h3>
                <button onClick={() => setLyricsOpen(false)} className="p-1 text-stone-400 hover:text-stone-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-stone-700 whitespace-pre-line leading-relaxed font-light font-devanagari">
                {activeTrack.lyrics || 'Lyrics will be uploaded soon.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioLibrary;
