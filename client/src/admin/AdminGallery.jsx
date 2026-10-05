import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  ExternalLink,
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  Filter,
} from 'lucide-react';
import api from '../services/api';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

const CATEGORIES = [
  'All',
  'Ashram Darshan',
  'Bhandara & Utsav',
  'Satsang Samagam',
  'Seva & Charity',
];

export const AdminGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewModalPhoto, setPreviewModalPhoto] = useState(null);
  const [saving, setSaving] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: 'Ashram Darshan',
    eventDate: new Date().toISOString().split('T')[0],
    description: '',
    isFeatured: false,
  });

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const res = await api.get('/gallery?limit=100');
      if (res.success && res.data) {
        setPhotos(Array.isArray(res.data) ? res.data : []);
      }
    } catch (err) {
      console.error('Error fetching gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      url: '',
      category: 'Ashram Darshan',
      eventDate: new Date().toISOString().split('T')[0],
      description: '',
      isFeatured: false,
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id || item._id);
    setFormData({
      title: item.title || item.caption || '',
      url: item.url || item.coverImage || '',
      category: item.category || 'Ashram Darshan',
      eventDate: item.eventDate ? new Date(item.eventDate).toISOString().split('T')[0] : '',
      description: item.description || '',
      isFeatured: Boolean(item.isFeatured),
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.url.trim()) {
      alert('Please provide an image URL');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...formData,
        caption: formData.title,
        coverImage: formData.url,
      };

      if (editingId) {
        await api.put(`/admin/gallery/${editingId}`, payload);
        setAlertMsg({ type: 'success', text: 'Photo updated successfully!' });
      } else {
        await api.post('/admin/gallery', payload);
        setAlertMsg({ type: 'success', text: 'New photo added to gallery successfully!' });
      }
      setModalOpen(false);
      fetchPhotos();
      setTimeout(() => setAlertMsg(null), 4000);
    } catch (err) {
      setAlertMsg({ type: 'error', text: err.message || 'Action failed' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete photo: "${title || 'this image'}"?`)) {
      try {
        await api.delete(`/admin/gallery/${id}`);
        setAlertMsg({ type: 'success', text: 'Photo deleted successfully!' });
        fetchPhotos();
        setTimeout(() => setAlertMsg(null), 4000);
      } catch (err) {
        setAlertMsg({ type: 'error', text: err.message || 'Delete failed' });
      }
    }
  };

  // Filter photos
  const filteredPhotos = photos.filter((p) => {
    const matchesSearch =
      !searchTerm ||
      (p.title && p.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.caption && p.caption.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-roseBlush-100 text-maroon-800 text-xs font-bold mb-1">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>पावन चित्र दीर्घा प्रबंधक</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            Photo Gallery & Ashram Darshan CMS
          </h2>
          <p className="text-xs text-stone-500">
            Add, update, or remove sacred photos, festival bhandara glimpses, and ashram darshan imagery.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-xs shadow-md transition-all self-start sm:self-auto transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Photo (नया चित्र जोड़ें)</span>
        </button>
      </div>

      {alertMsg && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold ${
            alertMsg.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
              : 'bg-red-50 border border-red-200 text-red-900'
          }`}
        >
          {alertMsg.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{alertMsg.text}</span>
        </div>
      )}

      {/* Search & Category Filter Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search photos by title, caption..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden bg-stone-50/50"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-maroon-800 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-roseBlush-50 text-stone-600'
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredPhotos.map((item, idx) => {
            const photoId = item.id || item._id;
            const photoUrl = item.url || item.coverImage;
            const photoTitle = item.title || item.caption || 'Untitled Photo';

            return (
              <div
                key={photoId || idx}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-soft transition-all flex flex-col justify-between group"
              >
                {/* Photo Preview Container */}
                <div className="relative aspect-4/3 w-full bg-stone-900 overflow-hidden">
                  <img
                    src={photoUrl}
                    alt={photoTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  {/* Category Pill */}
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-stone-950/80 backdrop-blur-xs text-sacredGold-300 text-[10px] font-bold border border-sacredGold-400/40">
                    {item.category || 'Ashram Darshan'}
                  </div>

                  {item.isFeatured && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3 h-3" />
                      <span>Featured</span>
                    </div>
                  )}

                  {/* Zoom Overlay Trigger */}
                  <button
                    onClick={() => setPreviewModalPhoto(item)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                    title="Enlarge preview"
                  >
                    <div className="p-2.5 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-xs">
                      <Eye className="w-5 h-5" />
                    </div>
                  </button>
                </div>

                {/* Details & Actions */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-stone-900 line-clamp-1 group-hover:text-maroon-700 transition-colors">
                      {photoTitle}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-stone-500 line-clamp-2 mt-1 font-light leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    {item.eventDate && (
                      <div className="flex items-center gap-1 text-[11px] text-stone-400 mt-2">
                        <Calendar className="w-3 h-3 text-maroon-600" />
                        <span>
                          {new Date(item.eventDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                    <button
                      onClick={() => openEditModal(item)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-roseBlush-100 text-stone-700 hover:text-maroon-800 text-xs font-semibold transition-colors"
                      title="Edit photo details"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(photoId, photoTitle)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 text-xs font-semibold transition-colors"
                      title="Delete photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-md mx-auto space-y-3">
          <ImageIcon className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="font-serif font-bold text-stone-800">No Photos Found</h3>
          <p className="text-xs text-stone-500">
            {searchTerm || selectedCategory !== 'All'
              ? 'No photos matched your filter criteria.'
              : 'The gallery currently has no photos. Click "+ Add New Photo" to create your first album entry.'}
          </p>
        </div>
      )}

      {/* Add / Edit Photo Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-roseBlush-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-maroon-700" />
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {editingId ? 'Edit Photo Details' : 'Add New Photo to Gallery'}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title / Caption */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Photo Title / Caption (चित्र शीर्षक / विवरण) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. बाबा जयगुरुदेव आश्रम उज्जैन — भव्य दर्शन"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden focus:border-maroon-600 bg-stone-50/50"
                />
              </div>

              {/* Image URL with live preview */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Image URL / File Path (फोटो का लिंक / पाथ) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://images.unsplash.com/... or /images/gurus/..."
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden focus:border-maroon-600 bg-stone-50/50"
                />
              </div>

              {/* Live Preview Box */}
              {formData.url && (
                <div className="rounded-2xl border border-stone-200 overflow-hidden bg-stone-100 p-2">
                  <p className="text-[11px] font-bold text-stone-500 mb-1">Live Image Preview:</p>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-900">
                    <img
                      src={formData.url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Category & Event Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Category (श्रेणी)
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden bg-white"
                  >
                    <option value="Ashram Darshan">Ashram Darshan (आश्रम दर्शन)</option>
                    <option value="Bhandara & Utsav">Bhandara & Utsav (भंडारा एवं उत्सव)</option>
                    <option value="Satsang Samagam">Satsang Samagam (सत्संग समागम)</option>
                    <option value="Seva & Charity">Seva & Charity (सेवा एवं जीव दया)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Event Date (आयोजन तिथि)
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden bg-white"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Description (अतिरिक्त विवरण - वैकल्पिक)
                </label>
                <textarea
                  rows={3}
                  placeholder="पवित्र आयोजन का संक्षिप्त आध्यात्मिक विवरण..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden bg-stone-50/50"
                />
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 rounded text-maroon-700 focus:ring-maroon-600 border-stone-300"
                />
                <label htmlFor="isFeatured" className="text-xs font-semibold text-stone-800 cursor-pointer">
                  Mark as Featured Photo (मुख्य पृष्ठ एवं हाइलाइट्स में दिखाएं)
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl text-xs font-semibold bg-maroon-700 hover:bg-maroon-800 text-white shadow-md transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingId ? 'Update Photo' : 'Save Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Enlarged Image Modal */}
      {previewModalPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewModalPhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-sacredGold-400/40"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewModalPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[75vh] w-full flex items-center justify-center overflow-hidden bg-black">
              <img
                src={previewModalPhoto.url || previewModalPhoto.coverImage}
                alt={previewModalPhoto.title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            <div className="p-4 bg-stone-950 text-white">
              <span className="text-[10px] font-bold text-sacredGold-400 uppercase tracking-wider block mb-1">
                {previewModalPhoto.category || 'Ashram Darshan'}
              </span>
              <h4 className="font-serif font-bold text-base text-white">
                {previewModalPhoto.title || previewModalPhoto.caption}
              </h4>
              {previewModalPhoto.description && (
                <p className="text-xs text-stone-400 mt-1 font-light">
                  {previewModalPhoto.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
