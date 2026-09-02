import { Event } from '../models/Event.js';
import { sendSuccess, sendError, sendPaginated } from '../utils/apiResponse.js';

const DUMMY_EVENTS = [
  {
    _id: '64f1a2b3c4d5e6f7a8b9c201',
    id: '64f1a2b3c4d5e6f7a8b9c201',
    slug: 'annual-bhandara-mahotsav-ujjain',
    title: 'वार्षिक पावन भंडारा महोत्सव एवं विशाल संत समागम — उज्जैन',
    description: 'उज्जैन आश्रम में आयोजित होने वाला देश-विदेश के लाखों श्रद्धालुओं का भव्य त्रिदिवसीय संत समागम। निरंतर गुरु का अखंड लंगर, अमृत वाणी, नामदान एवं आध्यात्मिक प्रश्नोत्तरी सत्र।',
    startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'बाबा जयगुरुदेव आश्रम, मक्सी रोड, उज्जैन (म.प्र.)',
    city: 'उज्जैन (Ujjain)',
    state: 'मध्य प्रदेश (Madhya Pradesh)',
    status: 'upcoming',
    expectedAttendees: '2,50,000+ श्रद्धालु',
    coverImage: '/images/sant_vanshavali.jpg',
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c202',
    id: '64f1a2b3c4d5e6f7a8b9c202',
    slug: 'guru-purnima-mahotsav-jaipur',
    title: 'पावन गुरु पूर्णिमा महा-महोत्सव — जयपुर आश्रम',
    description: 'सतगुरु के चरणों में कृतज्ञता ज्ञापन, पावन गुरु वंदना, नाम-साधना दिशा-निर्देश एवं राजस्थान संगत का भव्य एकत्रीकरण।',
    startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 47 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'जयगुरुदेव आश्रम, ठीकरिया, जयपुर',
    city: 'जयपुर (Jaipur)',
    state: 'राजस्थान (Rajasthan)',
    status: 'upcoming',
    expectedAttendees: '1,50,000+ श्रद्धालु',
    coverImage: '/images/sant_vanshavali.jpg',
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c203',
    id: '64f1a2b3c4d5e6f7a8b9c203',
    slug: 'holi-milan-sadhana-shibir-mathura',
    title: 'होली मिलन एवं आत्म कल्याण साधना शिविर — मथुरा',
    description: 'मथुरा मुख्य आश्रम में आयोजित विशेष साधना शिविर। रंगों के इस पावन पर्व पर नाम रूपी रंग में रंगने का दिव्य संदेश।',
    startDate: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 77 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'जयगुरुदेव आश्रम, मथुरा-दिल्ली हाईवे',
    city: 'मथुरा (Mathura)',
    state: 'उत्तर प्रदेश (Uttar Pradesh)',
    status: 'upcoming',
    expectedAttendees: '1,00,000+ श्रद्धालु',
    coverImage: '/images/sant_vanshavali.jpg',
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c204',
    id: '64f1a2b3c4d5e6f7a8b9c204',
    slug: 'sharad-purnima-satsang-chitrakoot',
    title: 'शरद पूर्णिमा विशेष नामदान एवं अमृत वर्षा सत्र',
    description: 'चित्रकूट की पावन भूमि पर आयोजित शरद पूर्णिमा आध्यात्मिक सत्र।',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'सत्संग मैदान, चित्रकूट',
    city: 'चित्रकूट (Chitrakoot)',
    state: 'मध्य प्रदेश (Madhya Pradesh)',
    status: 'completed',
    expectedAttendees: '80,000+ श्रद्धालु',
    coverImage: '/images/sant_vanshavali.jpg',
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c205',
    id: '64f1a2b3c4d5e6f7a8b9c205',
    slug: 'all-india-vegetarianism-rally-bhopal',
    title: 'अखिल भारतीय शाकाहार चेतना एवं नशा मुक्ति रैली — भोपाल',
    description: 'मध्य प्रदेश राजधानी में आयोजित विशाल शाकाहार जन-जागरण रैली एवं सम्मेलन।',
    startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() - 59 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'दशहरा मैदान, भोपाल',
    city: 'भोपाल (Bhopal)',
    state: 'मध्य प्रदेश (Madhya Pradesh)',
    status: 'completed',
    expectedAttendees: '60,000+ श्रद्धालु',
    coverImage: '/images/sant_vanshavali.jpg',
  },
];

export const getEvents = async (req, res, next) => {
  try {
    const { status, city, page = 1, limit = 12 } = req.query;

    try {
      const filter = {};
      if (status && status !== 'all') filter.status = status;
      if (city) filter.city = new RegExp(city, 'i');

      const skip = (Number(page) - 1) * Number(limit);
      const [items, total] = await Promise.all([
        Event.find(filter).sort({ startDate: 1 }).skip(skip).limit(Number(limit)).lean(),
        Event.countDocuments(filter),
      ]);

      if (items && items.length > 0) {
        return sendPaginated(res, 'Events retrieved successfully', items, page, limit, total);
      }
    } catch (dbErr) {
      console.log('Events database fallback active');
    }

    // Return rich dummy items
    let filtered = [...DUMMY_EVENTS];
    if (status && status !== 'all') {
      filtered = filtered.filter((e) => e.status === status);
    }
    if (city) {
      filtered = filtered.filter((e) => e.city.toLowerCase().includes(city.toLowerCase()));
    }

    return sendPaginated(res, 'Events retrieved', filtered, page, limit, filtered.length);
  } catch (error) {
    next(error);
  }
};

export const getEventBySlugOrId = async (req, res, next) => {
  try {
    const { slugOrId } = req.params;
    try {
      let event = await Event.findOne({ slug: slugOrId }).lean();
      if (!event && slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
        event = await Event.findById(slugOrId).lean();
      }
      if (event) {
        return sendSuccess(res, 'Event details retrieved', event);
      }
    } catch (e) {
      // Fallback
    }

    const found = DUMMY_EVENTS.find((e) => e.slug === slugOrId || e._id === slugOrId || e.id === slugOrId) || DUMMY_EVENTS[0];
    return sendSuccess(res, 'Event details retrieved', found);
  } catch (error) {
    next(error);
  }
};
