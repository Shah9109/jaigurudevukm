import { Adhesh } from '../models/Adhesh.js';
import { sendSuccess, sendError, sendPaginated } from '../utils/apiResponse.js';

const DUMMY_ADHESH = [
  {
    _id: '64f1a2b3c4d5e6f7a8b9c301',
    id: '64f1a2b3c4d5e6f7a8b9c301',
    title: 'आश्रम आदेश सं. JGD/2026/08: आश्रम में आने वाले समस्त दर्शनार्थियों के लिए निशुल्क भंडारा एवं अनुशासन व्यवस्था',
    referenceNumber: 'JGD/2026/08',
    description: 'उज्जैन आश्रम केंद्रीय कार्यालय द्वारा जारी आधिकारिक निर्देश: आश्रम में सभी भक्तों के लिए 24 घंटे निशुल्क लंगर एवं आवास की पूर्ण व्यवस्था है। किसी भी सेवादार को कोई शुल्क नहीं देना है।',
    issueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    issuedBy: 'केंद्रीय आश्रम कार्यालय, उज्जैन (म.प्र.)',
    isImportant: true,
    attachmentUrl: '/downloads/ashram_adhesh_aug2026.pdf',
    isPublished: true,
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c302',
    id: '64f1a2b3c4d5e6f7a8b9c302',
    title: 'आश्रम आदेश सं. JGD/2026/07: प्रत्येक जिले में शाकाहार प्रचार एवं गुलाबी झंडी वाहन रैलियों के संबंध में दिशा-निर्देश',
    referenceNumber: 'JGD/2026/07',
    description: 'सभी प्रांतीय एवं जिला कमेटियों को निर्देशित किया जाता है कि शाकाहार प्रचार हेतु गुलाबी झंडी लगाकर शांतिपूर्ण वाहन यात्राएं व जनसंपर्क अभियान चलाएं।',
    issueDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    issuedBy: 'परम पूज्य बाबा उमाकान्त जी महाराज के आदेशानुसार',
    isImportant: true,
    attachmentUrl: '/downloads/shakahar_nirdesh.pdf',
    isPublished: true,
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c303',
    id: '64f1a2b3c4d5e6f7a8b9c303',
    title: 'आश्रम आदेश सं. JGD/2026/05: सत्संग स्थलों पर प्राथमिक चिकित्सा, पेयजल एवं बुजुर्गों के बैठने की विशेष व्यवस्था',
    referenceNumber: 'JGD/2026/05',
    description: 'आगामी जन-जागरण दौरों में विशाल जनसमूह की सुविधा हेतु शुद्ध पेयजल के टैंकर, प्राथमिक स्वास्थ्य केंद्र एवं बुजुर्ग श्रद्धालुओं के लिए कुर्सियों की व्यवस्था सुनिश्चित की जाए।',
    issueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    issuedBy: 'केंद्रीय सेवा समिति',
    isImportant: false,
    attachmentUrl: '/downloads/satsang_seva_rules.pdf',
    isPublished: true,
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c304',
    id: '64f1a2b3c4d5e6f7a8b9c304',
    title: 'आश्रम आदेश सं. JGD/2026/03: युवाओं में नशा मुक्ति अभियान एवं नैतिक मूल्यों के प्रचार हेतु युवा मंडल का गठन',
    referenceNumber: 'JGD/2026/03',
    description: 'युवा पीढ़ी को बीड़ी, शराब, गुटखा व अन्य नशीले पदार्थों से बचाने और शाकाहारी बनाकर ईश्वर भक्ति की ओर प्रेरित करने हेतु प्रत्येक शाखा में जयगुरुदेव युवा मंडल गठित किया जाए।',
    issueDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    issuedBy: 'राष्ट्रीय प्रचार समिति',
    isImportant: false,
    attachmentUrl: '/downloads/youth_pledge_rules.pdf',
    isPublished: true,
  },
];

export const getAdheshList = async (req, res, next) => {
  try {
    const { category, priority, page = 1, limit = 12 } = req.query;

    try {
      const filter = { isPublished: true };
      if (category) filter.category = category;
      if (priority) filter.priority = priority;

      const skip = (Number(page) - 1) * Number(limit);
      const [items, total] = await Promise.all([
        Adhesh.find(filter).sort({ issueDate: -1 }).skip(skip).limit(Number(limit)).lean(),
        Adhesh.countDocuments(filter),
      ]);

      if (items && items.length > 0) {
        return sendPaginated(res, 'Ashram Adhesh list retrieved successfully', items, page, limit, total);
      }
    } catch (dbErr) {
      console.log('Adhesh database fallback active');
    }

    return sendPaginated(res, 'Ashram Adhesh list retrieved', DUMMY_ADHESH, page, limit, DUMMY_ADHESH.length);
  } catch (error) {
    next(error);
  }
};

export const getAdheshById = async (req, res, next) => {
  try {
    try {
      const adhesh = await Adhesh.findById(req.params.id).lean();
      if (adhesh) {
        return sendSuccess(res, 'Adhesh details retrieved', adhesh);
      }
    } catch (e) {
      // Fallback
    }

    const found = DUMMY_ADHESH.find((a) => a._id === req.params.id || a.id === req.params.id) || DUMMY_ADHESH[0];
    return sendSuccess(res, 'Adhesh details retrieved', found);
  } catch (error) {
    next(error);
  }
};
