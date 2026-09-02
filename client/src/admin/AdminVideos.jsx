import React, { useState, useEffect } from 'react';
import { Video, Plus, Edit2, Trash2, Search, X, Play, ExternalLink } from 'lucide-react';
import api from '../services/api';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

export const AdminVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    videoUrl: '',
    category: 'Satsang Discourse',
    speaker: 'Pujya Maharaj Ji',
    duration: '35:00',
    description: '',
  });

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await api.get('/videos?limit=100');
      if (res.success && res.data) {
        setVideos(res.data);
      }
    } catch (err) {
      console.error(err);
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
      category: 'Satsang Discourse',
      speaker: 'Pujya Maharaj Ji',
      duration: '35:00',
      description: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || '',
      videoUrl: item.videoUrl || '',
      category: item.category || 'Satsang Discourse',
      speaker: item.speaker || 'Pujya Maharaj Ji',
      duration: item.duration || '35:00',
      description: item.description || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/videos/${editingId}`, formData);
      } else {
        await api.post('/admin/videos', formData);
      }
      setModalOpen(false);
      fetchVideos();
    } catch (err) {
      alert(err.message || 'Action failed');
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete video: "${title}"?`)) {
      try {
        await api.delete(`/admin/videos/${id}`);
        fetchVideos();
      } catch (err) {
        alert(err.message || 'Delete failed');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            Video Discourses Manager
          </h2>
          <p className="text-xs text-stone-500">Manage YouTube discourses, sadhana guides, and video archive.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-xs shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Video</span>
        </button>
      </div>

      {loading ? (
        <LoadingSkeleton count={3} />
      ) : (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Thumbnail & Title</th>
                  <th className="p-4">Category & Speaker</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {videos.map((item) => (
                  <tr key={item._id} className="hover:bg-roseBlush-50/40 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-16 h-10 rounded-lg bg-stone-900 overflow-hidden shrink-0 relative">
                        <img
                          src={item.thumbnailUrl || `https://img.youtube.com/vi/${item.youtubeId || 'dQw4w9WgXcQ'}/default.jpg`}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-serif font-bold text-stone-900 line-clamp-1 max-w-sm">{item.title}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-stone-800 block">{item.category}</span>
                      <span className="text-[11px] text-stone-500">{item.speaker}</span>
                    </td>
                    <td className="p-4 text-stone-600">{item.duration}</td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => openEditModal(item)} className="p-1.5 text-stone-600 hover:text-maroon-700">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(item._id, item.title)} className="p-1.5 text-stone-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-roseBlush-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {editingId ? 'Edit Video' : 'Add New Video'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">YouTube or Video URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Speaker</label>
                  <input
                    type="text"
                    value={formData.speaker}
                    onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-xs font-semibold bg-maroon-700 hover:bg-maroon-800 text-white shadow-xs"
                >
                  {editingId ? 'Save Changes' : 'Add Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVideos;
