import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Download, ShieldCheck, Calendar, User, ExternalLink, ArrowRight } from 'lucide-react';
import api from '../services/api';
import SectionTitle from '../components/common/SectionTitle';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';

export const AdheshList = () => {
  const [adheshList, setAdheshList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAdhesh = async () => {
      setLoading(true);
      try {
        const res = await api.get('/adhesh');
        if (res.success && res.data) {
          setAdheshList(res.data);
        }
      } catch (err) {
        console.error('Error fetching adhesh:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdhesh();
  }, []);

  const filtered = adheshList.filter((a) =>
    !searchTerm ||
    a.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.referenceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionTitle
          hindiSubtitle="आधिकारिक आश्रम आदेश"
          title="Ashram Adhesh (Official Directives & Orders)"
          subtitle="Official directives, administrative guidelines, and organizational circulars issued by Jaigurudev Sanstha."
        />

        {/* Search */}
        <div className="bg-white p-3 rounded-3xl border border-roseBlush-200 shadow-soft flex items-center max-w-2xl mx-auto">
          <Search className="w-5 h-5 text-stone-400 ml-2 shrink-0" />
          <input
            type="text"
            placeholder="Search by order title or reference no (e.g. JGD/2026)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 text-sm text-stone-800 focus:outline-hidden bg-transparent"
          />
        </div>

        {/* Adhesh List */}
        {loading ? (
          <LoadingSkeleton count={3} />
        ) : filtered.length > 0 ? (
          <div className="space-y-4 max-w-4xl mx-auto">
            {filtered.map((item) => (
              <div
                key={item._id || item.id}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-roseBlush-200 shadow-soft hover:shadow-sacred transition-all space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-roseBlush-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-md bg-roseBlush-100 text-maroon-800 border border-roseBlush-200">
                      Ref: {item.referenceNumber}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sacredGold-50 text-sacredGold-800 border border-sacredGold-200">
                      {item.category || 'Ashram Order'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-stone-400 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(item.issueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light whitespace-pre-line">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-roseBlush-100 text-xs">
                  <span className="text-stone-500 font-medium">
                    हस्ताक्षर / Signatory: <b className="text-stone-800">{item.signatory || 'Sanstha Sachiv'}</b>
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/adhesh/${item._id || item.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-xs shadow-xs transition-all hover:scale-105"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Document (आदेश पढ़ें)</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>

                    {item.documentUrl && (
                      <a
                        href={item.documentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 p-2 rounded-full bg-stone-100 hover:bg-roseBlush-100 text-stone-700 hover:text-maroon-800 transition-colors"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No orders found"
            description="There are no official directives matching your query."
            actionText="View All Orders"
            actionLink="/adhesh"
          />
        )}
      </div>
    </div>
  );
};

export default AdheshList;
