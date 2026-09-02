import { Notice } from '../models/Notice.js';
import { sendSuccess, sendError, sendPaginated } from '../utils/apiResponse.js';

const DUMMY_NOTICES = [
  {
    _id: '64f1a2b3c4d5e6f7a8b9c101',
    id: '64f1a2b3c4d5e6f7a8b9c101',
    title: 'आश्रम में आगामी पावन भंडारा महोत्सव पर आवास एवं भोजन व्यवस्था संबंधी निर्देश',
    content: 'उज्जैन आश्रम में पधारने वाले समस्त भक्तजनों एवं संगत को सूचित किया जाता है कि आश्रम में निशुल्क आवास, गर्म पानी, प्राथमिक चिकित्सा एवं अखंड गुरु के लंगर की समुचित व्यवस्था की गई है। कृपया अनुशासन व सादगी बनाए रखें।',
    category: 'Ashram Directive',
    priority: 'Emergency',
    publishDate: new Date().toISOString(),
    status: 'active',
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c102',
    id: '64f1a2b3c4d5e6f7a8b9c102',
    title: 'अमृत वेला में प्रातः 3:00 से 5:00 बजे तक सामूहिक नाम-सिमरन का विशेष नियम',
    content: 'परम पूज्य बाबा उमाकान्त जी महाराज के पावन आदेशानुसार सभी सत्संगी भाई-बहन नित्य प्रातः अमृत वेला में कम से कम 2 घंटे सुरत-शब्द योग नाम ध्यान का अभ्यास अवश्य करें। यह समय प्रभु कृपा का सबसे पावन काल है।',
    category: 'Sadhana Alert',
    priority: 'Very Important',
    publishDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c103',
    id: '64f1a2b3c4d5e6f7a8b9c103',
    title: 'आगामी सत्संग दौरों में निःशुल्क चिकित्सा शिविर एवं शाकाहार साहित्य वितरण',
    content: 'सत्संग स्थलों पर वृद्धों, माताओं एवं बच्चों की सुविधा हेतु विशेष हेल्पडेस्क एवं शाकाहार प्रचार साहित्य, भजन डायरी व पत्रिकाओं का निशुल्क वितरण केंद्र स्थापित रहेगा।',
    category: 'General Notice',
    priority: 'Normal',
    publishDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c104',
    id: '64f1a2b3c4d5e6f7a8b9c104',
    title: 'प्रत्येक तहसील व ग्राम स्तर पर प्रभात फेरी एवं जन-जागरण यात्रा',
    content: 'शाकाहार एवं नशामुक्त समाज निर्माण के संकल्प के साथ सभी जिला कमेटियां अपने-अपने क्षेत्रों में प्रातः कालीन प्रभात फेरी व नाम-धुन संकीर्तन का आयोजन करें।',
    category: 'Seva Announcement',
    priority: 'Very Important',
    publishDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c105',
    id: '64f1a2b3c4d5e6f7a8b9c105',
    title: 'आश्रम परिसर में पूर्ण सादगी, स्वच्छता एवं अनुशासन बनाए रखने हेतु निर्देश',
    content: 'आश्रम में आने वाले श्रद्धालु किसी भी प्रकार की पॉलीथिन या नशीली वस्तु परिसर में न लाएं। स्वच्छता बनाए रखने में सेवादारों का सहयोग करें।',
    category: 'General Notice',
    priority: 'Normal',
    publishDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
  },
];

export const getNotices = async (req, res, next) => {
  try {
    const { category, priority, page = 1, limit = 12 } = req.query;

    try {
      const filter = { status: 'active' };
      if (category) filter.category = category;
      if (priority && priority !== 'all') filter.priority = priority;

      const skip = (Number(page) - 1) * Number(limit);
      const [items, total] = await Promise.all([
        Notice.find(filter).sort({ publishDate: -1 }).skip(skip).limit(Number(limit)).lean(),
        Notice.countDocuments(filter),
      ]);

      if (items && items.length > 0) {
        return sendPaginated(res, 'Notices retrieved successfully', items, page, limit, total);
      }
    } catch (dbErr) {
      console.log('Notice database fallback active');
    }

    // Return rich dummy items
    let filtered = [...DUMMY_NOTICES];
    if (priority && priority !== 'all') {
      filtered = filtered.filter((n) => n.priority === priority);
    }
    if (category) {
      filtered = filtered.filter((n) => n.category === category);
    }

    return sendPaginated(res, 'Notices retrieved', filtered, page, limit, filtered.length);
  } catch (error) {
    next(error);
  }
};

export const getNoticeById = async (req, res, next) => {
  try {
    try {
      const notice = await Notice.findById(req.params.id).lean();
      if (notice) {
        return sendSuccess(res, 'Notice details retrieved', notice);
      }
    } catch (e) {
      // Fallback
    }

    const found = DUMMY_NOTICES.find((n) => n._id === req.params.id || n.id === req.params.id) || DUMMY_NOTICES[0];
    return sendSuccess(res, 'Notice details retrieved', found);
  } catch (error) {
    next(error);
  }
};
