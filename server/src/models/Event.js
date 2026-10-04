import { BaseRepository } from './BaseRepository.js';

export const DUMMY_EVENTS = [
  {
    id: '64f1a2b3c4d5e6f7a8b9c201',
    _id: '64f1a2b3c4d5e6f7a8b9c201',
    slug: 'annual-bhandara-mahotsav-ujjain',
    title: 'वार्षिक पावन भंडारा महोत्सव एवं विशाल संत समागम — उज्जैन',
    description: 'उज्जैन आश्रम में आयोजित होने वाला देश-विदेश के लाखों श्रद्धालुओं का भव्य त्रिदिवसीय संत समागम। निरंतर गुरु का अखंड लंगर, अमृत वाणी, नामदान एवं आध्यात्मिक प्रश्नोत्तरी सत्र।',
    startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
    startTime: '06:00 AM',
    endTime: '09:00 PM',
    location: 'बाबा जयगुरुदेव आश्रम, मक्सी रोड, उज्जैन (म.प्र.)',
    city: 'उज्जैन (Ujjain)',
    state: 'मध्य प्रदेश (Madhya Pradesh)',
    status: 'upcoming',
    expectedAttendees: '2,50,000+ श्रद्धालु',
    bannerImage: '/images/sant_vanshavali.jpg',
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c202',
    _id: '64f1a2b3c4d5e6f7a8b9c202',
    slug: 'guru-purnima-mahotsav-jaipur',
    title: 'पावन गुरु पूर्णिमा महा-महोत्सव — जयपुर आश्रम',
    description: 'सतगुरु के चरणों में कृतज्ञता ज्ञापन, पावन गुरु वंदना, नाम-साधना दिशा-निर्देश एवं राजस्थान संगत का भव्य एकत्रीकरण।',
    startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 47 * 24 * 60 * 60 * 1000).toISOString(),
    startTime: '08:00 AM',
    endTime: '08:00 PM',
    location: 'जयगुरुदेव आश्रम, ठीकरिया, जयपुर',
    city: 'जयपुर (Jaipur)',
    state: 'राजस्थान (Rajasthan)',
    status: 'upcoming',
    expectedAttendees: '1,50,000+ श्रद्धालु',
    bannerImage: '/images/sant_vanshavali.jpg',
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

class EventRepository extends BaseRepository {
  constructor() {
    super('events', {}, DUMMY_EVENTS);
  }

  hydrate(row) {
    const doc = super.hydrate(row);
    if (!doc) return null;
    if (doc.isFeatured !== undefined) doc.isFeatured = Boolean(doc.isFeatured);
    return doc;
  }

  async create(data) {
    const eventData = { ...data };
    if (!eventData.slug && eventData.title) {
      eventData.slug =
        eventData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') +
        '-' +
        Date.now();
    }
    return super.create(eventData);
  }
}

export const Event = new EventRepository();
