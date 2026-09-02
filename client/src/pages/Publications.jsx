import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Download, FileText, Smartphone } from 'lucide-react';
import api from '../services/api';
import SectionTitle from '../components/common/SectionTitle';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

export const Publications = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample literature fallback
  const sampleDocs = [
    { title: 'संत मत एवं सुरत-शब्द योग परिचय (Book)', category: 'Spiritual Literature', authorOrPublisher: 'जयगुरुदेव आश्रम प्रकाशन', fileUrl: '#', fileSize: '4.8 MB' },
    { title: 'शाकाहार ही मनुष्य का प्राकृतिक आहार (Magazine)', category: 'Publication', authorOrPublisher: 'जयगुरुदेव आश्रम', fileUrl: '#', fileSize: '2.4 MB' },
    { title: 'नित्य प्रार्थना, वंदना एवं आरती संकलन (PDF)', category: 'Literature', authorOrPublisher: 'आश्रम साधक मंडल', fileUrl: '#', fileSize: '1.2 MB' },
    { title: 'आश्रम दर्शन एवं सेवा नियम पुस्तिका', category: 'General', authorOrPublisher: 'केंद्रीय कार्यालय', fileUrl: '#', fileSize: '3.1 MB' },
  ];

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      try {
        const res = await api.get('/documents');
        if (res.success && res.data && res.data.length > 0) {
          setDocuments(res.data);
        } else {
          setDocuments(sampleDocs);
        }
      } catch (e) {
        setDocuments(sampleDocs);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  return (
    <div className="min-h-screen py-10 sm:py-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionTitle
          hindiSubtitle="आध्यात्मिक साहित्य एवं ई-पुस्तकालय"
          title="Digital Library & Publications"
          subtitle="Download spiritual books, magazines, prayer collections, and official ashram literature."
        />

        {/* Mobile App Download Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-maroon-800 to-roseBlush-800 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-sacredGold-300 uppercase tracking-wider">
              मोबाइल साधना ऐप • Official APK
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold">
              Jaigurudev Sadhana Companion App (Android)
            </h3>
            <p className="text-xs sm:text-sm text-roseBlush-100 font-light max-w-xl">
              Download the APK for daily Naam-Dhyan timer, morning/evening puja alarms, daily reports, and offline spiritual tracking.
            </p>
          </div>
          <a
            href="/downloads/jaigurudev-sadhana.apk"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-sacredGold-400 hover:bg-sacredGold-300 text-maroon-950 font-bold text-sm shadow-md transition-all shrink-0"
          >
            <Smartphone className="w-4 h-4" />
            <span>Download APK (v1.0.0)</span>
          </a>
        </div>

        {/* Document Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-roseBlush-200 shadow-soft flex items-start justify-between gap-4 hover:shadow-sacred transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-roseBlush-100 text-maroon-700 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-sacredGold-700 uppercase tracking-wider block mb-1">
                    {doc.category}
                  </span>
                  <h4 className="font-serif font-bold text-base text-stone-900 mb-1">
                    {doc.title}
                  </h4>
                  <span className="text-xs text-stone-500 block">
                    प्रकाशक: {doc.authorOrPublisher || 'Jaigurudev Ashram'} • {doc.fileSize || 'PDF'}
                  </span>
                </div>
              </div>

              <a
                href={doc.fileUrl || '#'}
                download
                className="p-3 rounded-2xl bg-roseBlush-50 hover:bg-roseBlush-100 text-maroon-700 transition-colors shrink-0"
                aria-label="Download document"
              >
                <Download className="w-5 h-5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Publications;
