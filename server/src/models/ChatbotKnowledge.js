import { BaseRepository } from './BaseRepository.js';

export const DUMMY_KB = [
  {
    id: 'kb-001',
    _id: 'kb-001',
    question: 'जयगुरुदेव संस्था क्या है?',
    answer: 'जयगुरुदेव धर्म प्रचारक संस्था एक पावन आध्यात्मिक और मानव सेवा संगठन है, जिसका मुख्यालय मथुरा और उज्जैन में स्थित है। यह संस्था जीवों पर दया, शाकाहार, नशामुक्ति, और सुरत-शब्द योग (नाम साधना) के प्रचार-प्रसार के लिए समर्पित है।',
    category: 'About Sanstha',
    keywords: ['jaigurudev', 'sanstha', 'kya hai', 'about', 'parichay', 'mission', 'ujjain', 'mathura'],
    source: 'आधिकारिक संस्था विवरण',
    priority: 10,
    isOfficial: true,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'kb-002',
    _id: 'kb-002',
    question: 'सत्संग कब और कहाँ होता है?',
    answer: 'उज्जैन एवं मथुरा मुख्य आश्रम में प्रत्येक रविवार प्रातः 08:00 बजे साप्ताहिक महा-सत्संग एवं नाम-दान का कार्यक्रम होता है। इसके अतिरिक्त दैनिक प्रातः 05:00 बजे एवं सायं 06:00 बजे नियमित ध्यान-भजन कार्यक्रम आयोजित होता है।',
    category: 'Satsang Info',
    keywords: ['satsang', 'kab hota hai', 'timing', 'samay', 'location', 'sunday', 'ujjain', 'mathura'],
    source: 'सत्संग समय सारिणी',
    priority: 9,
    isOfficial: true,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

class ChatbotKnowledgeRepository extends BaseRepository {
  constructor() {
    super('chatbot_knowledge', {}, DUMMY_KB);
  }

  hydrate(row) {
    const doc = super.hydrate(row);
    if (!doc) return null;
    if (doc.isOfficial !== undefined) doc.isOfficial = Boolean(doc.isOfficial);
    if (doc.isPublished !== undefined) doc.isPublished = Boolean(doc.isPublished);

    if (typeof doc.keywords === 'string') {
      try {
        doc.keywords = JSON.parse(doc.keywords);
      } catch (e) {
        doc.keywords = doc.keywords.split(',').map((k) => k.trim()).filter(Boolean);
      }
    } else if (!Array.isArray(doc.keywords)) {
      doc.keywords = [];
    }

    return doc;
  }
}

export const ChatbotKnowledge = new ChatbotKnowledgeRepository();
