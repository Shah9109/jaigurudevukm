import { BaseRepository } from './BaseRepository.js';

export const DUMMY_ADHESH = [
  {
    id: '64f1a2b3c4d5e6f7a8b9c301',
    _id: '64f1a2b3c4d5e6f7a8b9c301',
    title: 'आश्रम आदेश सं. JGD/2026/08: आश्रम में आने वाले समस्त दर्शनार्थियों के लिए निशुल्क भंडारा एवं अनुशासन व्यवस्था',
    referenceNumber: 'JGD/2026/08',
    description: 'उज्जैन आश्रम केंद्रीय कार्यालय द्वारा जारी आधिकारिक निर्देश: आश्रम में सभी भक्तों के लिए 24 घंटे निशुल्क लंगर एवं आवास की पूर्ण व्यवस्था है। किसी भी सेवादार को कोई शुल्क नहीं देना है।',
    issueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    issuedBy: 'केंद्रीय आश्रम कार्यालय, उज्जैन (म.प्र.)',
    category: 'Ashram Order',
    priority: 'Very Important',
    attachmentUrl: '/downloads/ashram_adhesh_aug2026.pdf',
    isPublished: true,
    isExternalLink: false,
    signatory: 'केंद्रीय आश्रम कार्यालय, उज्जैन (म.प्र.)',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c302',
    _id: '64f1a2b3c4d5e6f7a8b9c302',
    title: 'आश्रम आदेश सं. JGD/2026/07: प्रत्येक जिले में शाकाहार प्रचार एवं गुलाबी झंडी वाहन रैलियों के संबंध में दिशा-निर्देश',
    referenceNumber: 'JGD/2026/07',
    description: 'सभी प्रांतीय एवं जिला कमेटियों को निर्देशित किया जाता है कि शाकाहार प्रचार हेतु गुलाबी झंडी लगाकर शांतिपूर्ण वाहन यात्राएं व जनसंपर्क अभियान चलाएं।',
    issueDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    issuedBy: 'परम पूज्य बाबा उमाकान्त जी महाराज के आदेशानुसार',
    category: 'Administrative Directive',
    priority: 'Important',
    attachmentUrl: '/downloads/shakahar_nirdesh.pdf',
    isPublished: true,
    isExternalLink: false,
    signatory: 'परम पूज्य बाबा उमाकान्त जी महाराज के आदेशानुसार',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

class AdheshRepository extends BaseRepository {
  constructor() {
    super('adhesh', {}, DUMMY_ADHESH);
  }

  hydrate(row) {
    const doc = super.hydrate(row);
    if (!doc) return null;
    if (doc.isPublished !== undefined) doc.isPublished = Boolean(doc.isPublished);
    if (doc.isExternalLink !== undefined) doc.isExternalLink = Boolean(doc.isExternalLink);
    return doc;
  }
}

export const Adhesh = new AdheshRepository();
