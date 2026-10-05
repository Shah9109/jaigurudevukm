import React, { useState, useEffect } from 'react';
import { Search, Image as ImageIcon, Calendar, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';
import SectionTitle from '../components/common/SectionTitle';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';

const CATEGORIES = [
  'All',
  'Ashram Darshan',
  'Bhandara & Utsav',
  'Satsang Samagam',
  'Seva & Charity',
];

const DEFAULT_SAMPLE_PHOTOS = [
  {
    id: 'sample-001',
    url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
    caption: 'बाबा जयगुरुदेव आश्रम उज्जैन प्रांगण दर्शन',
    title: 'बाबा जयगुरुदेव आश्रम उज्जैन प्रांगण दर्शन',
    category: 'Ashram Darshan',
    eventDate: '2026-08-15',
    description: 'उज्जैन मुख्य आश्रम का पावन एवं भव्य दृश्य।',
  },
  {
    id: 'sample-002',
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    caption: 'वार्षिक पावन भंडारा संत समागम',
    title: 'वार्षिक पावन भंडारा संत समागम',
    category: 'Bhandara & Utsav',
    eventDate: '2026-07-21',
    description: 'देश-विदेश से पधारे लाखों श्रद्धालुओं का अखंड लंगर एवं भंडारा प्रसाद।',
  },
  {
    id: 'sample-003',
    url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    caption: 'प्रातः कालीन नाम-साधना एवं आरती',
    title: 'प्रातः कालीन नाम-साधना एवं आरती',
    category: 'Satsang Samagam',
    eventDate: '2026-09-01',
    description: 'संत वचनों के श्रवण एवं ध्यान-भजन में लीन साधक संगत।',
  },
  {
    id: 'sample-004',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
    caption: 'जीव दया एवं शाकाहार रथ यात्रा',
    title: 'जीव दया एवं शाकाहार रथ यात्रा',
    category: 'Seva & Charity',
    eventDate: '2026-06-10',
    description: 'जन-जन में शाकाहार और नशामुक्ति का पावन संदेश फैलाने वाली रथ यात्रा।',
  },
  {
    id: 'sample-005',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    caption: 'शांति निकेतन ध्यान कक्ष',
    title: 'शांति निकेतन ध्यान कक्ष',
    category: 'Ashram Darshan',
    eventDate: '2026-05-18',
    description: 'सुरत-शब्द योग नाम-साधना का अत्यंत शांत एवं पवित्र ध्यान कक्ष।',
  },
  {
    id: 'sample-006',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    caption: 'विशाल जनसमूह अमृत सत्संग श्रवण',
    title: 'विशाल जनसमूह अमृत सत्संग श्रवण',
    category: 'Satsang Samagam',
    eventDate: '2026-04-12',
    description: 'पूज्य महाराज जी के अमृत वचनों को एकाग्रचित्त होकर सुनते श्रद्धालु।',
  },
];

export const PhotoGallery = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const res = await api.get('/gallery?limit=100');
        if (isMounted) {
          if (res.success && Array.isArray(res.data) && res.data.length > 0) {
            setAlbums(res.data);
          } else {
            setAlbums(DEFAULT_SAMPLE_PHOTOS);
          }
        }
      } catch (err) {
        if (isMounted) setAlbums(DEFAULT_SAMPLE_PHOTOS);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchGallery();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPhotos = albums.filter((photo) => {
    const titleText = photo.caption || photo.title || '';
    const descText = photo.description || '';
    const matchesSearch =
      !searchTerm ||
      titleText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      descText.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || photo.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handlePrev = (e) => {
    e.stopPropagation();
    if (selectedIndex !== null && filteredPhotos.length > 0) {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredPhotos.length - 1));
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (selectedIndex !== null && filteredPhotos.length > 0) {
      setSelectedIndex((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0));
    }
  };

  const currentPhoto = selectedIndex !== null ? filteredPhotos[selectedIndex] : null;

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-cream-50">
      <SEO
        title="पावन चित्र दीर्घा (Photo Gallery) — जयगुरुदेव आश्रम उज्जैन"
        description="Explore sacred photo gallery, ashram darshan, annual bhandara festivals, and humanitarian seva glimpses of Jaigurudev Sanstha."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionTitle
          hindiSubtitle="पावन चित्र दीर्घा एवं आश्रम दर्शन"
          title="Sacred Photo Gallery & Darshan"
          subtitle="Glimpses of sacred festivals, annual bhandaras, satsang gatherings, and humanitarian seva under the divine guidance of Satguru."
        />

        {/* Search & Category Filter Toolbar */}
        <div className="bg-white p-3 sm:p-4 rounded-3xl border border-roseBlush-200 shadow-soft flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search gallery photos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-2xl border border-roseBlush-100 bg-roseBlush-50/50 text-stone-800 placeholder-stone-400 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-maroon-700 to-roseBlush-700 text-white shadow-xs'
                    : 'bg-roseBlush-50 hover:bg-roseBlush-100 text-stone-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Photos Grid */}
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, idx) => {
              const photoUrl = photo.url || photo.coverImage;
              const photoTitle = photo.caption || photo.title;

              return (
                <div
                  key={photo.id || photo._id || idx}
                  onClick={() => setSelectedIndex(idx)}
                  className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden cursor-pointer shadow-soft hover:shadow-sacred transition-all duration-300 border border-roseBlush-100 hover:-translate-y-1 bg-stone-900"
                >
                  <img
                    src={photoUrl}
                    alt={photoTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-sacredGold-300 uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-950/70 border border-sacredGold-400/30">
                        {photo.category || 'Ashram Darshan'}
                      </span>
                      {photo.eventDate && (
                        <span className="text-[10px] text-stone-300 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-sacredGold-400" />
                          <span>
                            {new Date(photo.eventDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-white line-clamp-2 leading-snug">
                      {photoTitle}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="No photos found"
            description="There are currently no photos matching your search or category."
          />
        )}

        {/* Lightbox Preview Modal */}
        {currentPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Box */}
            <div
              className="max-w-4xl max-h-[85vh] flex flex-col items-center z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[70vh] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-black shadow-2xl border border-sacredGold-400/40">
                <img
                  src={currentPhoto.url || currentPhoto.coverImage}
                  alt={currentPhoto.caption || currentPhoto.title}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>
              <div className="mt-4 text-center space-y-1">
                <span className="text-[11px] font-bold text-sacredGold-400 uppercase tracking-wider block">
                  {currentPhoto.category || 'Ashram Darshan'}
                </span>
                <p className="text-white text-base font-serif font-bold font-devanagari">
                  {currentPhoto.caption || currentPhoto.title}
                </p>
                {currentPhoto.description && (
                  <p className="text-xs text-stone-400 font-light max-w-lg">
                    {currentPhoto.description}
                  </p>
                )}
                <p className="text-[11px] text-stone-500 pt-1">
                  Photo {selectedIndex + 1} of {filteredPhotos.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
