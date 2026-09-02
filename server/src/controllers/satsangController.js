import { Satsang } from '../models/Satsang.js';
import { sendSuccess, sendError, sendPaginated } from '../utils/apiResponse.js';

const DUMMY_SATSANGS = [
  {
    _id: '64f1a2b3c4d5e6f7a8b9c000',
    id: '64f1a2b3c4d5e6f7a8b9c000',
    title: 'श्री कृष्ण जन्माष्टमी पावन सत्संग एवं नामदान समारोह — आगरा (Agra)',
    description: 'आगरा में 2 से 4 तक आयोजित होने वाला भव्य श्री कृष्ण जन्माष्टमी सत्संग समारोह। पूज्य बाबा उमाकान्त जी महाराज के पावन अमृत वचन, नाम-दीक्षा एवं विशाल भंडारा।',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    startTime: '08:00 AM - 12:00 PM & 05:00 PM - 08:30 PM',
    endTime: '08:30 PM',
    location: 'विशाल सत्संग मैदान, आगरा',
    address: 'आगरा-मथुरा मार्ग, आगरा',
    city: 'आगरा (Agra)',
    state: 'उत्तर प्रदेश (Uttar Pradesh)',
    pincode: '282001',
    speaker: 'परम पूज्य बाबा उमाकान्त जी महाराज',
    status: 'upcoming',
    isDaily: false,
    expectedAttendees: '1,00,000+ श्रद्धालु',
    contactPerson: {
      name: 'आगरा सत्संग सेवा समिति',
      phone: '+91-9754700200',
    },
    googleMapsLink: 'https://maps.google.com/?q=Agra',
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c001',
    id: '64f1a2b3c4d5e6f7a8b9c001',
    title: 'साप्ताहिक विशाल महा-सत्संग एवं नामदान कार्यक्रम',
    description: 'उज्जैन आश्रम में परम पूज्य बाबा उमाकान्त जी महाराज के पावन सानिध्य में अमृत प्रवचन, सुरत-शब्द योग नामदान एवं अखंड भंडारा।',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    startTime: '08:00 AM',
    endTime: '11:30 AM',
    location: 'बाबा जयगुरुदेव आश्रम, मुख्य सत्संग पाण्डाल',
    address: 'पिंगलेश्वर रेलवे स्टेशन के सामने, मक्सी रोड',
    city: 'उज्जैन (Ujjain)',
    state: 'मध्य प्रदेश (Madhya Pradesh)',
    pincode: '456001',
    speaker: 'परम पूज्य बाबा उमाकान्त जी महाराज',
    status: 'upcoming',
    isDaily: false,
    expectedAttendees: '50,000+ श्रद्धालु',
    contactPerson: {
      name: 'आश्रम कार्यालय प्रबंधक',
      phone: '+91-9754700200',
    },
    googleMapsLink: 'https://maps.google.com/?q=Baba+Jaigurudev+Ashram+Ujjain',
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c002',
    id: '64f1a2b3c4d5e6f7a8b9c002',
    title: 'सतना-चित्रकूट विशाल जन-जागरण सत्संग समारोह',
    description: 'सतना-चित्रकूट पावन भूमि पर पूज्य महाराज जी द्वारा मानव कल्याण, शाकाहार और प्रभु प्राप्ति की साधना का दिव्य उपदेश।',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    startTime: '05:00 AM & 06:00 PM',
    endTime: '08:30 PM',
    location: 'विशाल सत्संग मैदान, बाबुपुर',
    address: 'सतना-चित्रकूट मार्ग, अनसुइया मोड़ के पास',
    city: 'सतना (Satna)',
    state: 'मध्य प्रदेश (Madhya Pradesh)',
    pincode: '485001',
    speaker: 'परम पूज्य बाबा उमाकान्त जी महाराज',
    status: 'upcoming',
    isDaily: false,
    expectedAttendees: '35,000+ श्रद्धालु',
    contactPerson: {
      name: 'सत्संग व्यवस्था समिति',
      phone: '+91-9575600700',
    },
    googleMapsLink: 'https://maps.google.com',
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c003',
    id: '64f1a2b3c4d5e6f7a8b9c003',
    title: 'जयपुर पावन सत्संग एवं शाकाहार चेतना सम्मेलन',
    description: 'राजस्थान प्रदेश के श्रद्धालुओं के लिए विशेष आध्यात्मिक सत्संग सत्र, नाम-साधना दिशा-निर्देश एवं सत्संग वचन।',
    date: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
    startTime: '08:30 AM',
    endTime: '12:00 PM',
    location: 'जयगुरुदेव आश्रम, ठीकरिया',
    address: 'अजमेर-जयपुर राष्ट्रीय राजमार्ग, ठीकरिया मोड़',
    city: 'जयपुर (Jaipur)',
    state: 'राजस्थान (Rajasthan)',
    pincode: '302026',
    speaker: 'परम पूज्य बाबा उमाकान्त जी महाराज',
    status: 'upcoming',
    isDaily: false,
    expectedAttendees: '40,000+ श्रद्धालु',
    contactPerson: {
      name: 'जयपुर सेवा समिति',
      phone: '+91-9754700200',
    },
    googleMapsLink: 'https://maps.google.com',
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c004',
    id: '64f1a2b3c4d5e6f7a8b9c004',
    title: 'रीवा पावन सत्संग एवं अमृत वाणी उपदेश',
    description: 'विंध्य क्षेत्र के साधकों के लिए दिव्य सत्संग समारोह। मानव जन्म के अमूल्य समय को प्रभु भक्ति में लगाने का पावन आह्वान।',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    startTime: '09:00 AM',
    endTime: '12:30 PM',
    location: 'बांके बिहारी मैरिज गार्डन, शिवनगर',
    address: 'रताहरा चौराहा, रीवा',
    city: 'रीवा (Rewa)',
    state: 'मध्य प्रदेश (Madhya Pradesh)',
    pincode: '486001',
    speaker: 'परम पूज्य बाबा उमाकान्त जी महाराज',
    status: 'upcoming',
    isDaily: false,
    expectedAttendees: '25,000+ श्रद्धालु',
    contactPerson: {
      name: 'रीवा सत्संग प्रभारी',
      phone: '+91-9575600700',
    },
    googleMapsLink: 'https://maps.google.com',
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c005',
    id: '64f1a2b3c4d5e6f7a8b9c005',
    title: 'लखनऊ विशेष सत्संग एवं नाम-साधना शिविर',
    description: 'उत्तर प्रदेश राजधानी में आयोजित दो दिवसीय विशेष सत्संग समागम एवं निःशुल्क शाकाहार जागृति शिविर।',
    date: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000).toISOString(),
    startTime: '05:00 PM',
    endTime: '08:00 PM',
    location: 'जयगुरुदेव सत्संग भवन',
    address: 'आशियाना सेक्टर-एल, लखनऊ',
    city: 'लखनऊ (Lucknow)',
    state: 'उत्तर प्रदेश (Uttar Pradesh)',
    pincode: '226012',
    speaker: 'परम पूज्य बाबा उमाकान्त जी महाराज',
    status: 'upcoming',
    isDaily: false,
    expectedAttendees: '30,000+ श्रद्धालु',
    contactPerson: {
      name: 'लखनऊ जिला प्रभारी',
      phone: '+91-9754700200',
    },
    googleMapsLink: 'https://maps.google.com',
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c006',
    id: '64f1a2b3c4d5e6f7a8b9c006',
    title: 'नित्य प्रातः कालीन ध्यान एवं गुरु वंदना सत्र',
    description: 'दैनिक प्रातः काल 06:00 बजे से सभी आश्रमों एवं शाखाओं में सामूहिक ध्यान, सिमरन और वंदना का नियमित सत्र।',
    date: new Date().toISOString(),
    startTime: '06:00 AM',
    endTime: '08:00 AM',
    location: 'सर्व जयगुरुदेव आश्रम व शाखा सत्संग घर',
    address: 'उज्जैन, मथुरा, जयपुर एवं समस्त शाखाएं',
    city: 'उज्जैन (Ujjain)',
    state: 'मध्य प्रदेश (Madhya Pradesh)',
    pincode: '456001',
    speaker: 'वरिष्ठ प्रचारक व सत्संगी महात्मा',
    status: 'ongoing',
    isDaily: true,
    expectedAttendees: 'दैनिक साधक',
    contactPerson: {
      name: 'कार्यालय हेल्पलाइन',
      phone: '+91-9754700200',
    },
    googleMapsLink: 'https://maps.google.com',
  },
];

export const getSatsangs = async (req, res, next) => {
  try {
    const { status, city, isDaily, search, page = 1, limit = 12 } = req.query;

    try {
      const filter = {};
      if (status) filter.status = status;
      if (city) filter.city = new RegExp(city, 'i');
      if (isDaily !== undefined) filter.isDaily = isDaily === 'true';
      if (search) {
        filter.$or = [
          { title: new RegExp(search, 'i') },
          { location: new RegExp(search, 'i') },
          { speaker: new RegExp(search, 'i') },
          { city: new RegExp(search, 'i') },
        ];
      }

      const skip = (Number(page) - 1) * Number(limit);
      const [items, total] = await Promise.all([
        Satsang.find(filter).sort({ date: 1 }).skip(skip).limit(Number(limit)).lean(),
        Satsang.countDocuments(filter),
      ]);

      if (items && items.length > 0) {
        return sendPaginated(res, 'Satsang programs retrieved successfully', items, page, limit, total);
      }
    } catch (dbErr) {
      console.log('Satsang database fallback active');
    }

    // Return rich dummy items
    let filtered = [...DUMMY_SATSANGS];
    if (city) {
      filtered = filtered.filter((s) => s.city.toLowerCase().includes(city.toLowerCase()));
    }
    if (search) {
      filtered = filtered.filter((s) =>
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.city.toLowerCase().includes(search.toLowerCase()) ||
        s.location.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (status && status !== 'all') {
      filtered = filtered.filter((s) => s.status === status);
    }

    return sendPaginated(res, 'Satsang programs retrieved', filtered, page, limit, filtered.length);
  } catch (error) {
    next(error);
  }
};

export const getSatsangById = async (req, res, next) => {
  try {
    try {
      const satsang = await Satsang.findById(req.params.id).lean();
      if (satsang) {
        return sendSuccess(res, 'Satsang details retrieved', satsang);
      }
    } catch (e) {
      // Fallback
    }

    const found = DUMMY_SATSANGS.find((s) => s._id === req.params.id || s.id === req.params.id) || DUMMY_SATSANGS[0];
    return sendSuccess(res, 'Satsang details retrieved', found);
  } catch (error) {
    next(error);
  }
};
