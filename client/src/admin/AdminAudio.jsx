import React, { useState, useEffect } from 'react';
import { Music, Plus, Edit2, Trash2, Search, X } from 'lucide-react';
import api from '../services/api';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

export const AdminAudio = () => {
  const [audioList, setAudioList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    audioUrl: '',
    category: 'Bhajan',
    speaker: 'Ashram Mandali',
    duration: '15:00',
    lyrics: '',
  });

  const fetchAudio = async () => {
    setLoading(true);
    try {
      const res = await api.get('/audio?limit=100');
      if (res.success && res.data) {
        setAudioList(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudio();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      audioUrl: '',
      category: 'Bhajan',
      speaker: 'Ashram Mandali',
      duration: '15:00',
      lyrics: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || '',
      audioUrl: item.audioUrl || '',
      category: item.category || 'Bhajan',
      speaker: item.speaker || 'Ashram Mandali',
      duration: item.duration || '15:00',
      lyrics: item.lyrics || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/audio/${editingId}`, formData);
      } else {
        await api.post('/admin/audio', formData);
      }
      setModalOpen(false);
      fetchAudio();
    } catch (err) {
      alert(err.message || 'Action failed');
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete audio track: "${title}"?`)) {
      try {
        await api.delete(`/admin/audio/${id}`);
        fetchAudio();
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
            Audio & Bhajan Library Manager
          </h2>
          <p className="text-xs text-stone-500">Manage audio bhajans, naam dhun tracks, and morning prayers.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-xs shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Audio Track</span>
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
                  <th className="p-4">Title & Speaker</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {audioList.map((item) => (
                  <tr key={item._id} className="hover:bg-roseBlush-50/40 transition-colors">
                    <td className="p-4">
                      <span className="font-serif font-bold text-stone-900 block">{item.title}</span>
                      <span className="text-[11px] text-stone-500">{item.speaker}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-roseBlush-100 text-maroon-800">
                        {item.category}
                      </span>
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
                {editingId ? 'Edit Audio Track' : 'Add Audio Track'}
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
                <label className="block text-xs font-semibold text-stone-700 mb-1">Audio File URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://.../bhajan.mp3"
                  value={formData.audioUrl}
                  onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                  >
                    <option value="Bhajan">Bhajan</option>
                    <option value="Naam Dhun">Naam Dhun</option>
                    <option value="Morning Prayer">Morning Prayer</option>
                    <option value="Discourse">Discourse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Speaker / Singer</label>
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

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Lyrics / Text (Optional)</label>
                <textarea
                  rows={3}
                  value={formData.lyrics}
                  onChange={(e) => setFormData({ ...formData, lyrics: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden resize-none"
                />
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
                  {editingId ? 'Save Changes' : 'Add Track'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAudio;
