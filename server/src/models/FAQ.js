import { BaseRepository } from './BaseRepository.js';

export const DUMMY_FAQS = [
  {
    id: 'faq-001',
    _id: 'faq-001',
    question: 'क्या सत्संग में शामिल होने के लिए कोई शुल्क देना होता है?',
    answer: 'नहीं, जयगुरुदेव संस्था द्वारा आयोजित सभी सत्संग, भंडारा एवं नामदान कार्यक्रम पूर्णतः निःशुल्क हैं। किसी भी व्यक्ति या सेवादार को कोई शुल्क नहीं देना है।',
    category: 'About Sanstha',
    order: 1,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'faq-002',
    _id: 'faq-002',
    question: 'आश्रम में रात्रि विश्राम और भोजन की क्या व्यवस्था है?',
    answer: 'आश्रम पधारने वाले समस्त दर्शनार्थियों एवं साधकों के लिए 24 घंटे निशुल्क लंगर (भोजन प्रसाद) और आवास (विश्राम) की समुचित व्यवस्था उपलब्ध है।',
    category: 'Ashram Visit',
    order: 2,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

class FAQRepository extends BaseRepository {
  constructor() {
    super('faqs', {}, DUMMY_FAQS);
  }

  hydrate(row) {
    const doc = super.hydrate(row);
    if (!doc) return null;
    if (doc.isPublished !== undefined) doc.isPublished = Boolean(doc.isPublished);
    if (doc.order === undefined && doc.displayOrder !== undefined) doc.order = doc.displayOrder;
    return doc;
  }
}

export const FAQ = new FAQRepository();
