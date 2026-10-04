import { BaseRepository } from './BaseRepository.js';

export const DUMMY_NOTICES = [
  {
    id: '64f1a2b3c4d5e6f7a8b9c101',
    _id: '64f1a2b3c4d5e6f7a8b9c101',
    title: 'आश्रम में आगामी पावन भंडारा महोत्सव पर आवास एवं भोजन व्यवस्था संबंधी निर्देश',
    content: 'उज्जैन आश्रम में पधारने वाले समस्त भक्तजनों एवं संगत को सूचित किया जाता है कि आश्रम में निशुल्क आवास, गर्म पानी, प्राथमिक चिकित्सा एवं अखंड गुरु के लंगर की समुचित व्यवस्था की गई है। कृपया अनुशासन व सादगी बनाए रखें।',
    category: 'Ashram Directive',
    priority: 'Emergency',
    publishDate: new Date().toISOString(),
    status: 'active',
    isPopup: true,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c102',
    _id: '64f1a2b3c4d5e6f7a8b9c102',
    title: 'अमृत वेला में प्रातः 3:00 से 5:00 बजे तक सामूहिक नाम-सिमरन का विशेष नियम',
    content: 'परम पूज्य बाबा उमाकान्त जी महाराज के पावन आदेशानुसार सभी सत्संगी भाई-बहन नित्य प्रातः अमृत वेला में कम से कम 2 घंटे सुरत-शब्द योग नाम ध्यान का अभ्यास अवश्य करें। यह समय प्रभु कृपा का सबसे पावन काल है।',
    category: 'Sadhana Alert',
    priority: 'Very Important',
    publishDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    isPopup: false,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

class NoticeRepository extends BaseRepository {
  constructor() {
    super('notices', {}, DUMMY_NOTICES);
  }

  hydrate(row) {
    const doc = super.hydrate(row);
    if (!doc) return null;
    if (doc.isPopup !== undefined) doc.isPopup = Boolean(doc.isPopup);
    if (doc.featured !== undefined) doc.featured = Boolean(doc.featured);
    return doc;
  }
}

export const Notice = new NoticeRepository();
