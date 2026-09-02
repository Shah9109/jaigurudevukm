import React, { useState, useEffect } from 'react';
import { Bot, Plus, Edit2, Trash2, Search, X, Sparkles, Send } from 'lucide-react';
import api from '../services/api';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

export const AdminKnowledge = () => {
  const [knowledgeList, setKnowledgeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'Sadhana & Teachings',
    keywords: '',
    priority: 10,
    isActive: true,
  });

  // Test Assistant State
  const [testQuery, setTestQuery] = useState('');
  const [testReply, setTestReply] = useState(null);
  const [testing, setTesting] = useState(false);

  const fetchKnowledge = async () => {
    setLoading(true);
    try {
      const res = await api.get('/chatbot/knowledge');
      if (res.success && res.data) {
        setKnowledgeList(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKnowledge();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      question: '',
      answer: '',
      category: 'Sadhana & Teachings',
      keywords: '',
      priority: 10,
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item._id);
    setFormData({
      question: item.question || '',
      answer: item.answer || '',
      category: item.category || 'Sadhana & Teachings',
      keywords: Array.isArray(item.keywords) ? item.keywords.join(', ') : item.keywords || '',
      priority: item.priority || 10,
      isActive: !!item.isActive,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      keywords: formData.keywords
        .split(',')
        .map((k) => k.trim().toLowerCase())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await api.put(`/chatbot/knowledge/${editingId}`, payload);
      } else {
        await api.post('/chatbot/knowledge', payload);
      }
      setModalOpen(false);
      fetchKnowledge();
    } catch (err) {
      alert(err.message || 'Action failed');
    }
  };

  const handleDelete = async (id, question) => {
    if (window.confirm(`Delete Q&A: "${question}"?`)) {
      try {
        await api.delete(`/chatbot/knowledge/${id}`);
        fetchKnowledge();
      } catch (err) {
        alert(err.message || 'Delete failed');
      }
    }
  };

  const handleTestChat = async (e) => {
    e.preventDefault();
    if (!testQuery.trim() || testing) return;
    setTesting(true);
    setTestReply(null);
    try {
      const res = await api.post('/chatbot/message', { message: testQuery });
      if (res.success && res.data) {
        setTestReply(res.data);
      }
    } catch (err) {
      setTestReply({ reply: 'Error testing query: ' + err.message });
    } finally {
      setTesting(false);
    }
  };

  const filtered = knowledgeList.filter((k) =>
    !searchTerm ||
    k.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.answer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            Knowledge AI Assistant & Q&A Bank
          </h2>
          <p className="text-xs text-stone-500">Train the digital assistant with authoritative answers on Ashram teachings and rules.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-xs shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Knowledge Q&A</span>
        </button>
      </div>

      {/* Live Test Sandbox */}
      <div className="bg-gradient-to-br from-roseBlush-100/70 via-cream-50 to-white p-6 rounded-3xl border border-roseBlush-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sacredGold-600" />
          <h3 className="font-serif font-bold text-sm text-stone-900">
            Live AI Response Simulator
          </h3>
        </div>
        <form onSubmit={handleTestChat} className="flex gap-2">
          <input
            type="text"
            placeholder="Type any test question (e.g. दीक्षा के नियम क्या हैं?)..."
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
            className="flex-1 px-4 py-2 text-xs sm:text-sm bg-white rounded-xl border border-roseBlush-200 focus:outline-hidden"
          />
          <button
            type="submit"
            disabled={testing || !testQuery.trim()}
            className="px-5 py-2 rounded-xl bg-maroon-700 hover:bg-maroon-800 text-white text-xs font-semibold shadow-xs disabled:opacity-50"
          >
            {testing ? 'Thinking...' : 'Test Answer'}
          </button>
        </form>

        {testReply && (
          <div className="p-4 bg-white rounded-2xl border border-roseBlush-200 text-xs sm:text-sm space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-stone-400">
              <span>Source: {testReply.source || 'General'}</span>
              <span className="text-maroon-700">{testReply.category}</span>
            </div>
            <p className="text-stone-800 font-light leading-relaxed whitespace-pre-line">
              {testReply.reply}
            </p>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="bg-white p-3 rounded-2xl border border-stone-200/80 shadow-xs flex items-center">
        <Search className="w-4 h-4 text-stone-400 ml-2" />
        <input
          type="text"
          placeholder="Search knowledge questions or answers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-1.5 text-xs sm:text-sm text-stone-800 bg-transparent focus:outline-hidden"
        />
      </div>

      {/* Table */}
      {loading ? (
        <LoadingSkeleton count={3} />
      ) : (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Category</th>
                  <th className="p-4">Question & Verified Answer</th>
                  <th className="p-4">Keywords</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-roseBlush-50/40 transition-colors">
                    <td className="p-4 whitespace-nowrap">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-roseBlush-100 text-maroon-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 max-w-lg">
                      <span className="font-serif font-bold text-stone-900 block mb-1">
                        {item.question}
                      </span>
                      <p className="text-xs text-stone-600 line-clamp-2 font-light">
                        {item.answer}
                      </p>
                    </td>
                    <td className="p-4">
                      <span className="text-[11px] text-stone-400">
                        {Array.isArray(item.keywords) ? item.keywords.join(', ') : item.keywords}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => openEditModal(item)} className="p-1.5 text-stone-600 hover:text-maroon-700">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(item._id, item.question)} className="p-1.5 text-stone-600 hover:text-red-700">
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
                {editingId ? 'Edit Knowledge Entry' : 'Add Knowledge Q&A'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Question / Query *</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. नाम-दान (दीक्षा) के क्या नियम हैं?"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Sadhana & Teachings"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Answer / Guidance *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Type the authoritative spiritual answer..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Keywords (Comma separated)</label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="दीक्षा, नाम दान, नियम, दीक्षा विधि"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
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
                  {editingId ? 'Save Changes' : 'Add to Knowledge Base'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminKnowledge;
