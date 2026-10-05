import React, { useState, useEffect } from 'react';
import {
  Video,
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  Play,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
} from 'lucide-react';
import api from '../services/api';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

const CATEGORIES = [
  'All',
  'Satsang Discourse',
  'Sadhana Guidance',
  'Social Reform',
  'Devotional Bhajan',
  'Documentary',
];

const extractYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export const AdminVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewVideoModal, setPreviewVideoModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    videoUrl: '',
    thumbnailUrl: '',
    category: 'Satsang Discourse',
    speaker: 'परम संत बाबा उमाकान्त जी महाराज',
    duration: '35:00',
    description: '',
    isFeatured: true,
  });

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await api.get('/videos?limit=100');
      if (res.success && res.data) {
        setVideos(Array.isArray(res.data) ? res.data : []);
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      videoUrl: '',
      thumbnailUrl: '',
      category: 'Satsang Discourse',
      speaker: 'परम संत बाबा उमाकान्त जी महाराज',
      duration: '35:00',
      description: '',
      isFeatured: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    const vId = item.id || item._id;
    setEditingId(vId);
    setFormData({
      title: item.title || '',
      videoUrl: item.videoUrl || item.url || (item.youtubeId ? `https://www.youtube.com/watch?v=${item.youtubeId}` : ''),
      thumbnailUrl: item.thumbnailUrl || item.thumbnail || '',
      category: item.category || 'Satsang Discourse',
      speaker: item.speaker || 'परम संत बाबा उमाकान्त जी महाराज',
      duration: item.duration || '35:00',
      description: item.description || '',
      isFeatured: Boolean(item.isFeatured),
    });
    setModalOpen(true);
  };

  const handleVideoUrlChange = (val) => {
    const ytId = extractYouTubeId(val);
    const autoThumb = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : formData.thumbnailUrl;
    setFormData({
      ...formData,
      videoUrl: val,
      thumbnailUrl: autoThumb || formData.thumbnailUrl,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.videoUrl.trim()) {
      alert('Please provide a video URL');
      return;
    }

    setSaving(true);
    try {
      const ytId = extractYouTubeId(formData.videoUrl);
      const payload = {
        ...formData,
        youtubeId: ytId || undefined,
        thumbnailUrl: formData.thumbnailUrl || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : ''),
      };

      if (editingId) {
        await api.put(`/admin/videos/${editingId}`, payload);
        setAlertMsg({ type: 'success', text: 'Video updated successfully!' });
      } else {
        await api.post('/admin/videos', payload);
        setAlertMsg({ type: 'success', text: 'New video added successfully!' });
      }
      setModalOpen(false);
      fetchVideos();
      setTimeout(() => setAlertMsg(null), 4000);
    } catch (err) {
      setAlertMsg({ type: 'error', text: err.message || 'Action failed' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete video: "${title || 'this video'}"?`)) {
      try {
        await api.delete(`/admin/videos/${id}`);
        setAlertMsg({ type: 'success', text: 'Video deleted successfully!' });
        fetchVideos();
        setTimeout(() => setAlertMsg(null), 4000);
      } catch (err) {
        setAlertMsg({ type: 'error', text: err.message || 'Delete failed' });
      }
    }
  };

  // Filtered videos
  const filteredVideos = videos.filter((v) => {
    const matchesSearch =
      !searchTerm ||
      (v.title && v.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (v.speaker && v.speaker.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (v.description && v.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || v.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-roseBlush-100 text-maroon-800 text-xs font-bold mb-1">
            <Video className="w-3.5 h-3.5" />
            <span>पावन वीडियो सत्संग प्रबंधक</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            Video Discourses & YouTube Manager
          </h2>
          <p className="text-xs text-stone-500">
            Control official YouTube satsang videos, spiritual guidance recordings, and discourse archives.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-xs shadow-md transition-all self-start sm:self-auto transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Video (नया वीडियो जोड़ें)</span>
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
            placeholder="Search videos by title, speaker..."
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

      {/* Videos Table & Cards */}
      {loading ? (
        <LoadingSkeleton count={3} />
      ) : filteredVideos.length > 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Thumbnail & Title</th>
                  <th className="p-4">Category & Speaker</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredVideos.map((item, idx) => {
                  const vId = item.id || item._id || item.videoId || `v-${idx}`;
                  const ytId = item.youtubeId || item.videoId || extractYouTubeId(item.videoUrl || item.url);
                  const thumb =
                    item.thumbnailUrl ||
                    item.thumbnail ||
                    (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : '/images/sant_vanshavali.jpg');

                  return (
                    <tr key={vId} className="hover:bg-roseBlush-50/40 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3.5">
                          <div
                            onClick={() => setPreviewVideoModal(item)}
                            className="w-20 h-12 rounded-xl bg-stone-900 overflow-hidden shrink-0 relative cursor-pointer group shadow-2xs"
                          >
                            <img
                              src={thumb}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/images/sant_vanshavali.jpg';
                              }}
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                              <Play className="w-4 h-4 text-white fill-current" />
                            </div>
                          </div>
                          <div>
                            <span className="font-serif font-bold text-stone-900 line-clamp-1 max-w-md block">
                              {item.title}
                            </span>
                            {item.description && (
                              <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="font-semibold text-stone-800 block text-xs">
                          {item.category || 'Satsang Discourse'}
                        </span>
                        <span className="text-[11px] text-stone-500">
                          {item.speaker || 'परम संत बाबा उमाकान्त जी महाराज'}
                        </span>
                      </td>
                      <td className="p-4 text-stone-600 whitespace-nowrap text-xs">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" />
                          <span>{item.duration || '35:00'}</span>
                        </span>
                      </td>
                      <td className="p-4 text-center whitespace-nowrap">
                        {item.isFeatured ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] border border-amber-300">
                            <Sparkles className="w-3 h-3 text-amber-600" />
                            <span>Featured</span>
                          </span>
                        ) : (
                          <span className="text-[10px] text-stone-400 font-medium">Standard</span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 text-stone-600 hover:text-maroon-700 rounded-lg hover:bg-stone-100 transition-colors"
                          title="Edit video"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(vId, item.title)}
                          className="p-1.5 text-stone-600 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete video"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-md mx-auto space-y-3">
          <Video className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="font-serif font-bold text-stone-800">No Videos Found</h3>
          <p className="text-xs text-stone-500">
            {searchTerm || selectedCategory !== 'All'
              ? 'No videos matched your filter criteria.'
              : 'Click "+ Add New Video" to add your first YouTube discourse.'}
          </p>
        </div>
      )}

      {/* Add / Edit Video Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-roseBlush-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-maroon-700" />
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {editingId ? 'Edit Video Discourse' : 'Add New Video Discourse'}
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
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Video Title (वीडियो शीर्षक) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. सेवा करने लग जाओगे तो सतसंग भी समझ आने लगेगा..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden focus:border-maroon-600 bg-stone-50/50"
                />
              </div>

              {/* YouTube / Video URL */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  YouTube or Video URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://www.youtube.com/watch?v=PGKVT_dwo1w or https://youtu.be/..."
                  value={formData.videoUrl}
                  onChange={(e) => handleVideoUrlChange(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden focus:border-maroon-600 bg-stone-50/50"
                />
              </div>

              {/* Live Preview Box */}
              {formData.videoUrl && (
                <div className="rounded-2xl border border-stone-200 overflow-hidden bg-stone-100 p-2.5">
                  <p className="text-[11px] font-bold text-stone-500 mb-1">Live Video Preview:</p>
                  {extractYouTubeId(formData.videoUrl) ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                      <iframe
                        src={`https://www.youtube.com/embed/${extractYouTubeId(formData.videoUrl)}`}
                        title="YouTube Video Preview"
                        className="w-full h-full border-none"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="p-4 bg-white rounded-xl text-center text-xs text-stone-500">
                      Standard video link entered
                    </div>
                  )}
                </div>
              )}

              {/* Category, Speaker, Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden bg-white"
                  >
                    <option value="Satsang Discourse">Satsang Discourse</option>
                    <option value="Sadhana Guidance">Sadhana Guidance</option>
                    <option value="Social Reform">Social Reform</option>
                    <option value="Devotional Bhajan">Devotional Bhajan</option>
                    <option value="Documentary">Documentary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Speaker
                  </label>
                  <input
                    type="text"
                    value={formData.speaker}
                    onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Duration (e.g. 35:00)
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-hidden bg-white"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Description (सत्संग विवरण)
                </label>
                <textarea
                  rows={3}
                  placeholder="वीडियो सत्संग का संक्षिप्त आध्यात्मिक संदेश..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden bg-stone-50/50"
                />
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="videoIsFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 rounded text-maroon-700 focus:ring-maroon-600 border-stone-300"
                />
                <label htmlFor="videoIsFeatured" className="text-xs font-semibold text-stone-800 cursor-pointer">
                  Feature on Homepage and Top Highlights
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
                  {saving ? 'Saving...' : editingId ? 'Update Video' : 'Save Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Lightbox Modal */}
      {previewVideoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewVideoModal(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-sacredGold-500/40"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewVideoModal(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${
                  previewVideoModal.youtubeId ||
                  previewVideoModal.videoId ||
                  extractYouTubeId(previewVideoModal.videoUrl || previewVideoModal.url)
                }?autoplay=1`}
                title={previewVideoModal.title}
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4 bg-stone-900 text-white">
              <span className="text-[10px] font-bold text-sacredGold-400 uppercase tracking-wider block mb-1">
                {previewVideoModal.category || 'Satsang Discourse'}
              </span>
              <h4 className="font-serif font-bold text-sm sm:text-base text-white">
                {previewVideoModal.title}
              </h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVideos;
