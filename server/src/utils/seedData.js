import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import {
  Admin,
  Post,
  Notice,
  Event,
  Satsang,
  Video,
  Audio,
  Gallery,
  Document,
  Adhesh,
  FAQ,
  ChatbotKnowledge,
  SiteSettings,
} from '../models/index.js';
import { connectDB } from '../config/db.js';

export const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB to populate initial Jaigurudev Sanstha data...');
    await connectDB();

    // 1. Create Default Super Admin if not existing
    const adminEmail = (process.env.ADMIN_DEFAULT_EMAIL || 'admin@jaigurudev.org').toLowerCase();
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await Admin.create({
        name: 'Jaigurudev Super Admin',
        email: adminEmail,
        password: process.env.ADMIN_DEFAULT_PASSWORD || 'JaigurudevAdmin@2026',
        role: 'superadmin',
        isActive: true,
      });
      console.log(`[Seed] Super Admin created: ${adminEmail}`);
    }

    // 2. Initialize SiteSettings
    const existingSettings = await SiteSettings.findOne();
    if (!existingSettings) {
      await SiteSettings.create({
        organizationName: 'जयगुरुदेव धर्म प्रचारक संस्था (Jaigurudev Sanstha)',
        tagline: 'सत्य, दया, धर्म और नाम-साधना का पावन मार्ग',
        logoUrl: '/logo.svg',
        announcementBar: {
          enabled: true,
          text: 'पवित्र नाम-दान एवं सत्संग कार्यक्रम मथुरा आश्रम में प्रत्येक रविवार प्रातः 8:00 बजे।',
          link: '/satsang',
          isEmergency: false,
        },
        heroBanners: [
          {
            title: 'सत्य, दया, धर्म और नाम-साधना का पावन मार्ग',
            subtitle: 'Welcome to the Official Spiritual Portal of Jaigurudev Sanstha. Join our daily satsang, explore divine teachings, and immerse in spiritual upliftment.',
            imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1600&q=80',
            ctaText: 'Upcoming Satsang',
            ctaLink: '/satsang',
            order: 1,
            active: true,
          },
        ],
        contactInfo: {
          phone: '+91-9876543210',
          emergencyPhone: '+91-9876543211',
          email: 'contact@jaigurudev.org',
          address: 'जयगुरुदेव आश्रम, मथुरा-दिल्ली राष्ट्रीय राजमार्ग',
          city: 'मथुरा (Mathura)',
          state: 'उत्तर प्रदेश (Uttar Pradesh)',
          pincode: '281001',
          mapsEmbedUrl: 'https://maps.google.com',
          officeHours: 'प्रातः 06:00 बजे से सायं 08:00 बजे तक',
        },
        socialLinks: {
          youtube: 'https://youtube.com',
          facebook: 'https://facebook.com',
          instagram: 'https://instagram.com',
          twitter: 'https://x.com',
          telegram: 'https://telegram.org',
          whatsapp: 'https://whatsapp.com',
        },
      });
      console.log('[Seed] SiteSettings initialized.');
    }

    // 3. Seed Satsang Programs if empty
    const satsangCount = await Satsang.countDocuments();
    if (satsangCount === 0) {
      await Satsang.insertMany([
        {
          title: 'साप्ताहिक महा-सत्संग एवं नाम-दान कार्यक्रम',
          description: 'मथुरा मुख्य आश्रम में पूज्य महाराज जी के सानिध्य में पवित्र नाम-साधना और सत्संग वचन।',
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          startTime: '08:00 AM',
          endTime: '11:30 AM',
          location: 'मुख्य सत्संग भवन, जयगुरुदेव आश्रम',
          address: 'मथुरा-दिल्ली हाईवे',
          city: 'मथुरा (Mathura)',
          state: 'उत्तर प्रदेश',
          speaker: 'पूज्य महाराज जी',
          contactNumber: '+91-9876543210',
          isDaily: false,
          isFeatured: true,
          status: 'upcoming',
        },
        {
          title: 'नित्य प्रातः कालीन ध्यान एवं भजन',
          description: 'आश्रम के समस्त साधकों एवं दर्शनार्थियों के लिए दैनिक सुरत-शब्द योग अभ्यास।',
          date: new Date(),
          startTime: '05:00 AM',
          endTime: '07:00 AM',
          location: 'साधना कक्ष, आश्रम परिसर',
          city: 'मथुरा',
          state: 'उत्तर प्रदेश',
          speaker: 'आश्रम साधक मंडल',
          isDaily: true,
          isFeatured: true,
          status: 'upcoming',
        },
        {
          title: 'विशेष प्रांतीय सत्संग समागम (आगरा)',
          description: 'आगरा परिक्षेत्र के प्रेमियों के लिए एक दिवसीय विशाल आध्यात्मिक सत्संग एवं भंडारा।',
          date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
          startTime: '10:00 AM',
          endTime: '02:00 PM',
          location: 'जयगुरुदेव सत्संग स्थल, कोठी मीना बाजार',
          city: 'आगरा (Agra)',
          state: 'उत्तर प्रदेश',
          speaker: 'वरिष्ठ प्रचारक महात्मा जी',
          contactNumber: '+91-9876543222',
          isDaily: false,
          isFeatured: true,
          status: 'upcoming',
        },
      ]);
      console.log('[Seed] Sample Satsang schedules inserted.');
    }

    // 4. Seed Notices
    const noticeCount = await Notice.countDocuments();
    if (noticeCount === 0) {
      await Notice.insertMany([
        {
          title: 'वार्षिक गुरु पूर्णिमा महा-महोत्सव सूचना एवं दिशा-निर्देश',
          content: 'आगामी गुरु पूर्णिमा के पावन अवसर पर आश्रम में 3 दिवसीय अखंड नाम-संकीर्तन, भंडारा एवं सत्संग आयोजित होगा। समस्त सत्संगी भाई-बहन कृपया निर्धारित नियमों का पालन करें।',
          category: 'Ashram Announcement',
          priority: 'Very Important',
          publishDate: new Date(),
          isPopup: true,
          featured: true,
          status: 'active',
        },
        {
          title: 'आश्रम दर्शन एवं आवास व्यवस्था संबंधी आवश्यक निर्देश',
          content: 'दूर-दराज से आने वाले सभी श्रद्धालुओं के लिए आवास और भोजन की निशुल्क व्यवस्था आश्रम द्वारा की गई है। कृपया पहचान पत्र साथ लाएं।',
          category: 'General Notice',
          priority: 'Important',
          publishDate: new Date(),
          featured: true,
          status: 'active',
        },
        {
          title: 'शाकाहार एवं नशामुक्ति प्रचार रथ यात्रा कार्यक्रम',
          content: 'समाज में सदाचार, अहिंसा एवं शाकाहार के प्रचार हेतु विशेष वाहन यात्रा विभिन्न जनपदों से होकर गुजरेगी।',
          category: 'Important Notice',
          priority: 'Normal',
          publishDate: new Date(),
          featured: false,
          status: 'active',
        },
      ]);
      console.log('[Seed] Sample Notices inserted.');
    }

    // 5. Seed Ashram Adhesh (Official Directives)
    const adheshCount = await Adhesh.countDocuments();
    if (adheshCount === 0) {
      await Adhesh.insertMany([
        {
          title: 'आश्रम अनुशासन, सेवा एवं साधना संबंधी आधिकारिक आदेश',
          referenceNumber: 'JGD/ADM/2026/01',
          issueDate: new Date(),
          description: 'आश्रम परिसर की पवित्रता, सेवादारों के आचरण और नित्य साधना नियमों से संबंधित आधिकारिक आदेश पत्र।',
          category: 'Ashram Order',
          priority: 'Very Important',
          signatory: 'केंद्रीय व्यवस्थापक, जयगुरुदेव आश्रम',
          isPublished: true,
        },
        {
          title: 'आगामी विशाल भंडारा सेवा प्रभारियों की नियुक्ति निर्देश',
          referenceNumber: 'JGD/BHAN/2026/04',
          issueDate: new Date(),
          description: 'भंडारा व्यवस्था, जल सेवा, चिकित्सा शिविर और स्वच्छता दल के प्रभारियों के दायित्व एवं निर्देश।',
          category: 'Administrative Directive',
          priority: 'Important',
          signatory: 'संस्था सचिव',
          isPublished: true,
        },
      ]);
      console.log('[Seed] Sample Ashram Adhesh inserted.');
    }

    // 6. Seed Events
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      await Event.insertMany([
        {
          title: 'वार्षिक पावन भंडारा एवं संत समागम',
          slug: 'annual-bhandara-samagam-2026',
          description: 'लाखों श्रद्धालुओं की उपस्थिति में तीन दिवसीय विशाल भंडारा, निशुल्क भोजन प्रसाद, चिकित्सा शिविर एवं अखंड सत्संग प्रवाह।',
          startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
          startTime: '06:00 AM',
          endTime: '09:00 PM',
          location: 'जयगुरुदेव आश्रम परिसर',
          city: 'मथुरा (Mathura)',
          state: 'उत्तर प्रदेश',
          organizer: 'जयगुरुदेव धर्म प्रचारक संस्था',
          status: 'upcoming',
          isFeatured: true,
        },
        {
          title: 'शाकाहार संकल्प एवं नशामुक्ति जन-जागरण सम्मेलन',
          slug: 'vegetarianism-and-deaddiction-camp',
          description: 'युवाओं और परिवारों में नैतिक मूल्यों, दया भाव और जीव रक्षा का संदेश देने हेतु विशेष संगोष्ठी।',
          startDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
          startTime: '09:00 AM',
          endTime: '01:00 PM',
          location: 'कम्युनिटी हॉल, मथुरा',
          city: 'मथुरा',
          state: 'उत्तर प्रदेश',
          organizer: 'जयगुरुदेव युवा मंडल',
          status: 'upcoming',
          isFeatured: true,
        },
      ]);
      console.log('[Seed] Sample Events inserted.');
    }

    // 7. Seed Videos
    const videoCount = await Video.countDocuments();
    if (videoCount === 0) {
      await Video.insertMany([
        {
          title: 'मानव जीवन का वास्तविक उद्देश्य और नाम की महिमा — पूज्य महाराज जी',
          description: 'इस दुर्लभ मानव चोले में आत्मा के कल्याण और प्रभु प्राप्ति का सबसे सरल साधन क्या है? जानिए अमृत वचन।',
          videoType: 'youtube',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          youtubeId: 'dQw4w9WgXcQ',
          thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
          duration: '38:45',
          category: 'Satsang Discourse',
          speaker: 'पूज्य महाराज जी',
          isFeatured: true,
        },
        {
          title: 'सुरत-शब्द योग (नाम-साधना) कैसे करें — महत्वपूर्ण निर्देश',
          description: 'मन को एकाग्र कर अंतर्मुखी होने की सरल विधि और साधक के आवश्यक नियम।',
          videoType: 'youtube',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          youtubeId: 'dQw4w9WgXcQ',
          thumbnailUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
          duration: '26:10',
          category: 'Sadhana Guidance',
          speaker: 'पूज्य महाराज जी',
          isFeatured: true,
        },
        {
          title: 'शाकाहार ही मनुष्य का स्वाभाविक भोजन है — ऐतिहासिक संदेश',
          description: 'जीव दया, अहिंसा और स्वास्थ्य के लिए शाकाहारी जीवन शैली अपनाने का प्रेरणादायक उद्बोधन।',
          videoType: 'youtube',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          youtubeId: 'dQw4w9WgXcQ',
          thumbnailUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
          duration: '42:15',
          category: 'Social Reform',
          speaker: 'पूज्य महाराज जी',
          isFeatured: true,
        },
      ]);
      console.log('[Seed] Sample Videos inserted.');
    }

    // 8. Seed Audio Tracks
    const audioCount = await Audio.countDocuments();
    if (audioCount === 0) {
      await Audio.insertMany([
        {
          title: 'जयगुरुदेव नाम धुन (अखंड सिमरन)',
          description: 'मन को शांत और एकाग्र करने वाली पावन नाम-धुन।',
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          duration: '15:30',
          category: 'Naam Dhun',
          speaker: 'आश्रम मंडली',
          isFeatured: true,
        },
        {
          title: 'प्रातः कालीन वंदना एवं आरती',
          description: 'आश्रम में नित्य प्रातः होने वाली पावन प्रार्थना।',
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
          duration: '11:20',
          category: 'Morning Prayer',
          speaker: 'आश्रम साधक',
          isFeatured: true,
        },
      ]);
      console.log('[Seed] Sample Audio tracks inserted.');
    }

    // 9. Seed Chatbot Knowledge Base
    const kbCount = await ChatbotKnowledge.countDocuments();
    if (kbCount === 0) {
      await ChatbotKnowledge.insertMany([
        {
          question: 'जयगुरुदेव संस्था क्या है?',
          answer: 'जयगुरुदेव धर्म प्रचारक संस्था एक पावन आध्यात्मिक और मानव सेवा संगठन है, जिसका मुख्यालय मथुरा (उत्तर प्रदेश) में स्थित है। यह संस्था जीवों पर दया, शाकाहार, नशामुक्ति, और सुरत-शब्द योग (नाम साधना) के प्रचार-प्रसार के लिए समर्पित है।',
          category: 'About Sanstha',
          keywords: ['jaigurudev', 'sanstha', 'kya hai', 'about', 'parichay', 'mission'],
          source: 'आधिकारिक संस्था विवरण',
          priority: 10,
          isOfficial: true,
          isPublished: true,
        },
        {
          question: 'सत्संग कब और कहाँ होता है?',
          answer: 'मथुरा मुख्य आश्रम में प्रत्येक रविवार प्रातः 08:00 बजे साप्ताहिक महा-सत्संग एवं नाम-दान का कार्यक्रम होता है। इसके अतिरिक्त दैनिक प्रातः 05:00 बजे एवं सायं 06:00 बजे नियमित ध्यान-भजन कार्यक्रम आयोजित होता है।',
          category: 'Satsang Info',
          keywords: ['satsang', 'kab hota hai', 'timing', 'samay', 'location', 'sunday', 'mathura'],
          source: 'सत्संग समय सारिणी',
          priority: 9,
          isOfficial: true,
          isPublished: true,
        },
        {
          question: 'मथुरा आश्रम का पता (Address) क्या है और संपर्क कैसे करें?',
          answer: 'जयगुरुदेव आश्रम, मथुरा-दिल्ली राष्ट्रीय राजमार्ग (NH-19), मथुरा, उत्तर प्रदेश - 281001 पर स्थित है। आप कार्यालय दूरभाष +91-9876543210 या ईमेल contact@jaigurudev.org पर संपर्क कर सकते हैं।',
          category: 'Contact & Location',
          keywords: ['address', 'pata', 'location', 'phone', 'contact', 'kahan hai', 'mathura ashram'],
          source: 'कार्यालय संपर्क विवरण',
          priority: 9,
          isOfficial: true,
          isPublished: true,
        },
        {
          question: 'नाम-दान (दीक्षा) लेने के क्या नियम हैं?',
          answer: 'नाम-दान लेने के लिए मुख्य नियम हैं: 1. आजीवन पूर्ण शाकाहारी रहना (मांसाहार, अंडा आदि का पूर्ण त्याग), 2. किसी भी प्रकार के नशे (शराब, तंबाकू आदि) से दूर रहना, 3. सदाचारी व परोपकारी जीवन व्यतीत करना, और 4. प्रतिदिन नित्य नाम-साधना (ध्यान-भजन) करना।',
          category: 'Sadhana & Practice',
          keywords: ['naam daan', 'deeksha', 'rules', 'niyam', 'shakahar', 'sadhana'],
          source: 'नाम-दान दिशा-निर्देश',
          priority: 8,
          isOfficial: true,
          isPublished: true,
        },
      ]);
      console.log('[Seed] Chatbot Knowledge Base populated with verified answers.');
    }

    console.log('[Seed] Database initialization and seeding completed successfully! ✨');
  } catch (error) {
    console.error('[Seed Error] Seeding failed:', error.message);
  }
};

// Run directly if invoked from command line
if (process.argv[1]?.endsWith('seedData.js')) {
  seedDatabase().then(() => process.exit(0));
}
