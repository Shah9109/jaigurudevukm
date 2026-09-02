import React, { useState, useEffect } from 'react';
import { Search, Image as ImageIcon, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../services/api';
import SectionTitle from '../components/common/SectionTitle';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';

export const PhotoGallery = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Sample static photo fallback if albums collection is developing
  const samplePhotos = [
    { url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80', caption: 'मथुरा मुख्य आश्रम प्रांगण दर्शन', category: 'Ashram Darshan' },
    { url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80', caption: 'वार्षिक पावन भंडारा संत समागम', category: 'Bhandara & Utsav' },
    { url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80', caption: 'प्रातः कालीन नाम-साधना एवं आरती', category: 'Satsang Samagam' },
    { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80', caption: 'जीव दया एवं शाकाहार रथ यात्रा', category: 'Seva & Charity' },
    { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', caption: 'शांति निकेतन ध्यान कक्ष', category: 'Ashram Darshan' },
    { url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80', caption: 'विशाल जनसमूह अमृत सत्संग श्रवण', category: 'Satsang Samagam' },
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const res = await api.get('/gallery');
        if (res.success && res.data && res.data.length > 0) {
          setAlbums(res.data);
        } else {
          setAlbums(samplePhotos);
        }
      } catch (err) {
        setAlbums(samplePhotos);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionTitle
          hindiSubtitle="पावन चित्र दीर्घा"
          title="Photo Gallery & Ashram Darshan"
          subtitle="Glimpses of sacred festivals, annual bhandaras, satsang gatherings, and humanitarian seva."
        />

        {/* Photos Grid */}
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : albums.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {albums.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden cursor-pointer shadow-soft hover:shadow-sacred transition-all duration-300 border border-roseBlush-100 hover:-translate-y-1 bg-stone-100"
              >
                <img
                  src={photo.url || photo.coverImage}
                  alt={photo.caption || photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-5">
                  <span className="text-[10px] font-bold text-sacredGold-300 uppercase tracking-wider mb-1">
                    {photo.category || 'Darshan'}
                  </span>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-white line-clamp-2">
                    {photo.caption || photo.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="No photos found" />
        )}

        {/* Lightbox Preview Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
              <img
                src={selectedPhoto.url || selectedPhoto.coverImage}
                alt={selectedPhoto.caption || selectedPhoto.title}
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
              />
              <p className="mt-4 text-white text-center text-sm font-serif font-medium font-devanagari">
                {selectedPhoto.caption || selectedPhoto.title}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
