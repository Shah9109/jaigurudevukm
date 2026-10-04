import { BaseRepository } from './BaseRepository.js';

export const DUMMY_SATSANGS = [
  {
    id: '64f1a2b3c4d5e6f7a8b9c000',
    _id: '64f1a2b3c4d5e6f7a8b9c000',
    title: 'श्री कृष्ण जन्माष्टमी पावन सत्संग एवं नामदान समारोह — आगरा (Agra)',
    description: 'आगरा में 2 से 4 तक आयोजित होने वाला भव्य श्री कृष्ण जन्माष्टमी सत्संग समारोह। पूज्य बाबा उमाकान्त जी महाराज के पावन अमृत वचन, नाम-दीक्षा एवं विशाल भंडारा।',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    startTime: '08:00 AM - 12:00 PM & 05:00 PM - 08:30 PM',
    endTime: '08:30 PM',
    location: 'विशाल सत्संग मैदान, आगरा',
    address: 'विशाल सत्संग मैदान, आगरा',
    city: 'आगरा (Agra)',
    state: 'उत्तर प्रदेश (Uttar Pradesh)',
    pincode: '282001',
    speaker: 'परम पूज्य बाबा उमाकान्त जी महाराज',
    status: 'upcoming',
    isDaily: false,
    isFeatured: true,
    expectedAttendees: '1,00,000+ श्रद्धालु',
    contactPerson: {
      name: 'आगरा सत्संग सेवा समिति',
      phone: '+91-9754700200',
    },
    googleMapsLink: 'https://maps.google.com/?q=Agra',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c001',
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
    pincode: '456001',
    speaker: 'परम पूज्य बाबा उमाकान्त जी महाराज',
    status: 'upcoming',
    isDaily: false,
    isFeatured: true,
    expectedAttendees: '50,000+ श्रद्धालु',
    contactPerson: {
      name: 'आश्रम कार्यालय प्रबंधक',
      phone: '+91-9754700200',
    },
    googleMapsLink: 'https://maps.google.com/?q=Baba+Jaigurudev+Ashram+Ujjain',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c002',
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
    pincode: '485001',
    speaker: 'परम पूज्य बाबा उमाकान्त जी महाराज',
    status: 'upcoming',
    isDaily: false,
    isFeatured: false,
    expectedAttendees: '35,000+ श्रद्धालु',
    contactPerson: {
      name: 'सत्संग व्यवस्था समिति',
      phone: '+91-9575600700',
    },
    googleMapsLink: 'https://maps.google.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

class SatsangRepository extends BaseRepository {
  constructor() {
    super('satsangs', {}, DUMMY_SATSANGS);
  }

  hydrate(row) {
    const doc = super.hydrate(row);
    if (!doc) return null;

    if (!doc.contactPerson) {
      doc.contactPerson = {
        name: doc.contactPersonName || '',
        phone: doc.contactPersonPhone || '',
      };
    }

    if (doc.isDaily !== undefined) doc.isDaily = Boolean(doc.isDaily);
    if (doc.isFeatured !== undefined) doc.isFeatured = Boolean(doc.isFeatured);

    return doc;
  }
}

export const Satsang = new SatsangRepository();
