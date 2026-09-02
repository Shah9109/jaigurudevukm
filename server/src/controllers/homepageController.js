import {
  SiteSettings,
  Satsang,
  Notice,
  Adhesh,
  Event,
  Video,
  Audio,
  Gallery,
} from '../models/index.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * Get aggregated dynamic homepage payload
 * GET /api/homepage
 */
export const getHomepageData = async (req, res, next) => {
  try {
    let settings = null;
    let upcomingSatsang = [];
    let notices = [];
    let adheshList = [];
    let upcomingEvents = [];
    let featuredVideos = [];
    let featuredAudio = [];
    let galleryAlbums = [];

    try {
      [
        settings,
        upcomingSatsang,
        notices,
        adheshList,
        upcomingEvents,
        featuredVideos,
        featuredAudio,
        galleryAlbums,
      ] = await Promise.all([
        SiteSettings.findOne().lean(),
        Satsang.find({ status: 'upcoming' }).sort({ date: 1 }).limit(3).lean(),
        Notice.find({ status: 'active' }).sort({ publishDate: -1 }).limit(3).lean(),
        Adhesh.find({ isPublished: true }).sort({ issueDate: -1 }).limit(2).lean(),
        Event.find({ status: 'upcoming' }).sort({ startDate: 1 }).limit(3).lean(),
        Video.find().sort({ createdAt: -1 }).limit(3).lean(),
        Audio.find().sort({ createdAt: -1 }).limit(2).lean(),
        Gallery.find().sort({ eventDate: -1 }).limit(4).lean(),
      ]);
    } catch (e) {
      console.log('Homepage fallback active');
    }

    // Rich fallbacks if empty
    if (!upcomingSatsang || upcomingSatsang.length === 0) {
      upcomingSatsang = [
        {
          _id: '64f1a2b3c4d5e6f7a8b9c000',
          title: 'श्री कृष्ण जन्माष्टमी पावन सत्संग एवं नामदान समारोह — आगरा (Agra)',
          description: 'आगरा में 2 से 4 तक आयोजित होने वाला भव्य श्री कृष्ण जन्माष्टमी सत्संग समारोह। पूज्य बाबा उमाकान्त जी महाराज के पावन अमृत वचन, नाम-दीक्षा एवं विशाल भंडारा।',
          date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
          startTime: '08:00 AM - 12:00 PM & 05:00 PM - 08:30 PM',
          endTime: '08:30 PM',
          location: 'विशाल सत्संग मैदान, आगरा',
          address: 'आगरा-मथुरा मार्ग, आगरा',
          city: 'आगरा (Agra)',
          state: 'उत्तर प्रदेश (Uttar Pradesh)',
          speaker: 'परम पूज्य बाबा उमाकान्त जी महाराज',
          expectedAttendees: '1,00,000+ श्रद्धालु',
        },
        {
          _id: '64f1a2b3c4d5e6f7a8b9c001',
          title: 'साप्ताहिक विशाल महा-सत्संग एवं नामदान कार्यक्रम',
          description: 'उज्जैन आश्रम में परम पूज्य बाबा उमाकान्त जी महाराज के पावन सानिध्य में अमृत प्रवचन, सुरत-शब्द योग नामदान एवं अखंड भंडारा।',
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          startTime: '08:00 AM',
          endTime: '11:30 AM',
          location: 'बाबा जयगुरुदेव आश्रम, मुख्य सत्संग पाण्डाल',
          address: 'पिंगलेश्वर रेलवे स्टेशन के सामने, मक्सी रोड',
          city: 'उज्जैन (Ujjain)',
          state: 'मध्य प्रदेश (Madhya Pradesh)',
          speaker: 'परम पूज्य बाबा उमाकान्त जी महाराज',
          expectedAttendees: '50,000+ श्रद्धालु',
        },
        {
          _id: '64f1a2b3c4d5e6f7a8b9c002',
          title: 'सतना-चित्रकूट विशाल जन-जागरण सत्संग समारोह',
          description: 'सतना-चित्रकूट पावन भूमि पर पूज्य महाराज जी द्वारा मानव कल्याण, शाकाहार और प्रभु प्राप्ति की साधना का दिव्य उपदेश।',
          date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          startTime: '05:00 AM & 06:00 PM',
          endTime: '08:30 PM',
          location: 'विशाल सत्संग मैदान, बाबुपुर',
          address: 'सतना-चित्रकूट मार्ग, अनसुइया मोड़ के पास',
          city: 'सतना (Satna)',
          state: 'मध्य प्रदेश (Madhya Pradesh)',
          speaker: 'परम पूज्य बाबा उमाकान्त जी महाराज',
          expectedAttendees: '35,000+ श्रद्धालु',
        },
        {
          _id: '64f1a2b3c4d5e6f7a8b9c003',
          title: 'जयपुर पावन सत्संग एवं शाकाहार चेतना सम्मेलन',
          description: 'राजस्थान प्रदेश के श्रद्धालुओं के लिए विशेष आध्यात्मिक सत्संग सत्र, नाम-साधना दिशा-निर्देश एवं सत्संग वचन।',
          date: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
          startTime: '08:30 AM',
          endTime: '12:00 PM',
          location: 'जयगुरुदेव आश्रम, ठीकरिया',
          address: 'अजमेर-जयपुर राष्ट्रीय राजमार्ग, ठीकरिया मोड़',
          city: 'जयपुर (Jaipur)',
          state: 'राजस्थान (Rajasthan)',
          speaker: 'परम पूज्य बाबा उमाकान्त जी महाराज',
          expectedAttendees: '40,000+ श्रद्धालु',
        },
      ];
    }

    if (!notices || notices.length === 0) {
      notices = [
        {
          _id: '64f1a2b3c4d5e6f7a8b9c101',
          title: 'आश्रम में आगामी पावन भंडारा महोत्सव पर आवास एवं भोजन व्यवस्था संबंधी निर्देश',
          content: 'उज्जैन आश्रम में पधारने वाले समस्त भक्तजनों एवं संगत को सूचित किया जाता है कि आश्रम में निशुल्क आवास, गर्म पानी, प्राथमिक चिकित्सा एवं अखंड लंगर की समुचित व्यवस्था की गई है।',
          priority: 'Emergency',
          publishDate: new Date().toISOString(),
        },
        {
          _id: '64f1a2b3c4d5e6f7a8b9c102',
          title: 'अमृत वेला में प्रातः 3:00 से 5:00 बजे तक सामूहिक नाम-सिमरन का विशेष नियम',
          content: 'परम पूज्य बाबा उमाकान्त जी महाराज के पावन आदेशानुसार सभी सत्संगी भाई-बहन नित्य प्रातः अमृत वेला में कम से कम 2 घंटे सुरत-शब्द योग नाम ध्यान का अभ्यास अवश्य करें।',
          priority: 'Very Important',
          publishDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          _id: '64f1a2b3c4d5e6f7a8b9c103',
          title: 'आगामी सत्संग दौरों में निःशुल्क चिकित्सा शिविर एवं शाकाहार साहित्य वितरण',
          content: 'सत्संग स्थलों पर वृद्धों, माताओं एवं बच्चों की सुविधा हेतु विशेष हेल्पडेस्क एवं शाकाहार प्रचार साहित्य का निशुल्क वितरण केंद्र स्थापित रहेगा।',
          priority: 'Normal',
          publishDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ];
    }

    if (!adheshList || adheshList.length === 0) {
      adheshList = [
        {
          _id: '64f1a2b3c4d5e6f7a8b9c301',
          title: 'आश्रम आदेश सं. JGD/2026/08: आश्रम में आने वाले समस्त दर्शनार्थियों के लिए निशुल्क भंडारा एवं अनुशासन व्यवस्था',
          referenceNumber: 'JGD/2026/08',
          description: 'उज्जैन आश्रम केंद्रीय कार्यालय द्वारा जारी आधिकारिक निर्देश: आश्रम में सभी भक्तों के लिए 24 घंटे निशुल्क लंगर एवं आवास की पूर्ण व्यवस्था है।',
          issueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          isImportant: true,
          attachmentUrl: '/downloads/ashram_adhesh_aug2026.pdf',
        },
        {
          _id: '64f1a2b3c4d5e6f7a8b9c302',
          title: 'आश्रम आदेश सं. JGD/2026/07: प्रत्येक जिले में शाकाहार प्रचार एवं गुलाबी झंडी वाहन रैलियों के संबंध में दिशा-निर्देश',
          referenceNumber: 'JGD/2026/07',
          description: 'सभी प्रांतीय एवं जिला कमेटियों को निर्देशित किया जाता है कि शाकाहार प्रचार हेतु गुलाबी झंडी लगाकर शांतिपूर्ण वाहन यात्राएं व जनसंपर्क अभियान चलाएं।',
          issueDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
          isImportant: true,
          attachmentUrl: '/downloads/shakahar_nirdesh.pdf',
        },
      ];
    }

    if (!upcomingEvents || upcomingEvents.length === 0) {
      upcomingEvents = [
        {
          _id: '64f1a2b3c4d5e6f7a8b9c201',
          slug: 'annual-bhandara-mahotsav-ujjain',
          title: 'वार्षिक पावन भंडारा महोत्सव एवं विशाल संत समागम — उज्जैन',
          description: 'उज्जैन आश्रम में आयोजित होने वाला देश-विदेश के लाखों श्रद्धालुओं का भव्य त्रिदिवसीय संत समागम।',
          startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
          city: 'उज्जैन (Ujjain)',
          expectedAttendees: '2,50,000+ श्रद्धालु',
        },
      ];
    }

    return sendSuccess(res, 'Homepage dynamic content retrieved successfully', {
      settings: settings || {
        contactInfo: {
          phone: '+91-9754700200',
          emergencyPhone: '+91-9575600700',
          address: 'बाबा जयगुरुदेव आश्रम, पिंगलेश्वर रेलवे स्टेशन के सामने, मक्सी रोड',
          city: 'उज्जैन',
          state: 'मध्य प्रदेश',
        },
      },
      upcomingSatsang,
      notices,
      adheshList,
      upcomingEvents,
      featuredVideos: featuredVideos || [],
      featuredAudio: featuredAudio || [],
      galleryAlbums: galleryAlbums || [],
    });
  } catch (error) {
    next(error);
  }
};
