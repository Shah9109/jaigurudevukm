-- ==============================================================================
-- JAIGURUDEV SPIRITUAL PLATFORM — MYSQL / MARIADB SEED DATA
-- Default Superadmin, Site Configurations, and Spiritual Content
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------------------------
-- 1. Default Super Admin
-- Password: JaigurudevAdmin@2026
-- Hash: $2b$10$MT3Z10duCyqYVrMxT18iduHQ0u5gkU7qZykoBYycGRKrqsxDhNXve
-- ------------------------------------------------------------------------------
INSERT INTO `admins` (`id`, `name`, `email`, `password`, `role`, `is_active`, `created_at`, `updated_at`)
VALUES (
  'admin-root-id',
  'Jaigurudev Super Admin',
  'admin@jaigurudev.org',
  '$2b$10$MT3Z10duCyqYVrMxT18iduHQ0u5gkU7qZykoBYycGRKrqsxDhNXve',
  'superadmin',
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- ------------------------------------------------------------------------------
-- 2. Site Settings & Configuration
-- ------------------------------------------------------------------------------
INSERT INTO `site_settings` (
  `id`,
  `organization_name`,
  `tagline`,
  `logo_url`,
  `announcement_bar_enabled`,
  `announcement_bar_text`,
  `announcement_bar_link`,
  `announcement_bar_is_emergency`,
  `contact_phone`,
  `contact_emergency_phone`,
  `contact_email`,
  `contact_address`,
  `contact_city`,
  `contact_state`,
  `contact_pincode`,
  `contact_maps_embed_url`,
  `contact_office_hours`,
  `social_youtube`,
  `social_facebook`,
  `social_instagram`,
  `social_twitter`,
  `social_telegram`,
  `social_whatsapp`,
  `footer_about_short`,
  `footer_disclaimer`,
  `footer_copyright_text`,
  `homepage_sections`,
  `app_android_apk_url`,
  `app_apk_version`,
  `app_promo_title`,
  `app_promo_subtitle`,
  `created_at`,
  `updated_at`
) VALUES (
  'default',
  'जयगुरुदेव धर्म प्रचारक संस्था (Jaigurudev Sanstha)',
  'सत्य, दया, धर्म और नाम-साधना का पावन मार्ग',
  '/logo.svg',
  1,
  'श्री कृष्ण जन्माष्टमी पावन सत्संग कार्यक्रम — आगरा (Agra) में 2 से 4 तक आयोजित।',
  '/satsang',
  0,
  '+91-9754700200',
  '+91-9575600700',
  'contact@jaigurudev.org',
  'बाबा जयगुरुदेव आश्रम, पिंगलेश्वर रेलवे स्टेशन के सामने, मक्सी रोड',
  'उज्जैन (Ujjain)',
  'मध्य प्रदेश (Madhya Pradesh)',
  '456001',
  'https://maps.google.com',
  'प्रातः 06:00 से सायं 08:00 बजे तक',
  'https://www.youtube.com/c/jaigurudevukm',
  'https://facebook.com',
  'https://instagram.com',
  'https://x.com',
  'https://telegram.org',
  'https://whatsapp.com/channel/0029VaAcAA40QeadmEmp9y3c',
  'Jaigurudev Sanstha is dedicated to spiritual upliftment, humanitarian service, vegetarianism, and righteous living under the divine guidance of the Master.',
  'Official informational portal of Jaigurudev Sanstha. No registration fee is charged for attending public Satsang.',
  '© 2026 Jaigurudev Sanstha. All rights reserved.',
  JSON_OBJECT(
    'announcementBar', true,
    'heroSlider', true,
    'welcomeMessage', true,
    'upcomingSatsang', true,
    'upcomingEvents', true,
    'importantNotices', true,
    'ashramAdhesh', true,
    'featuredVideos', true,
    'audioPlayer', false,
    'photoGallery', true,
    'appPromotion', true,
    'contactSection', true
  ),
  '/downloads/jaigurudev-sadhana.apk',
  '1.0.0',
  'Download Jaigurudev Sadhana App',
  'Your daily companion for Naam-Dhyan, spiritual alarms, timer, and daily reports.',
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE `organization_name` = VALUES(`organization_name`);

-- ------------------------------------------------------------------------------
-- 3. Hero Banners
-- ------------------------------------------------------------------------------
INSERT INTO `hero_banners` (`id`, `settings_id`, `title`, `subtitle`, `image_url`, `cta_text`, `cta_link`, `display_order`, `is_active`)
VALUES
(
  'banner-001',
  'default',
  'सत्य, दया, धर्म और नाम-साधना का पावन मार्ग',
  'Welcome to the Official Spiritual Portal of Jaigurudev Sanstha. Join our daily satsang, explore divine teachings, and immerse in spiritual upliftment.',
  'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1600&q=80',
  'Upcoming Satsang',
  '/satsang',
  1,
  1
) ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- ------------------------------------------------------------------------------
-- 4. Sample Satsang Programs
-- ------------------------------------------------------------------------------
INSERT INTO `satsangs` (
  `id`, `title`, `description`, `date`, `start_time`, `end_time`, `location`, `address`,
  `city`, `state`, `pincode`, `speaker`, `poster_image`, `contact_number`, `organizer`,
  `status`, `is_daily`, `is_featured`, `display_mode`, `expected_attendees`, `created_at`, `updated_at`
) VALUES
(
  '64f1a2b3c4d5e6f7a8b9c000',
  'श्री कृष्ण जन्माष्टमी पावन सत्संग एवं नामदान समारोह — आगरा (Agra)',
  'आगरा में 2 से 4 तक आयोजित होने वाला भव्य श्री कृष्ण जन्माष्टमी सत्संग समारोह। पूज्य बाबा उमाकान्त जी महाराज के पावन अमृत वचन, नाम-दीक्षा एवं विशाल भंडारा।',
  DATE_ADD(NOW(), INTERVAL 2 DAY),
  '08:00 AM - 12:00 PM & 05:00 PM - 08:30 PM',
  '08:30 PM',
  'विशाल सत्संग मैदान, आगरा',
  'आगरा-मथुरा मार्ग, आगरा',
  'आगरा (Agra)',
  'उत्तर प्रदेश (Uttar Pradesh)',
  '282001',
  'परम पूज्य बाबा उमाकान्त जी महाराज',
  '/images/sant_vanshavali.jpg',
  '+91-9754700200',
  'आगरा सत्संग सेवा समिति',
  'upcoming',
  0,
  1,
  'full',
  '1,00,000+ श्रद्धालु',
  NOW(),
  NOW()
),
(
  '64f1a2b3c4d5e6f7a8b9c001',
  'साप्ताहिक विशाल महा-सत्संग एवं नामदान कार्यक्रम',
  'उज्जैन आश्रम में परम पूज्य बाबा उमाकान्त जी महाराज के पावन सानिध्य में अमृत प्रवचन, सुरत-शब्द योग नामदान एवं अखंड भंडारा।',
  DATE_ADD(NOW(), INTERVAL 4 DAY),
  '08:00 AM',
  '11:30 AM',
  'बाबा जयगुरुदेव आश्रम, मुख्य सत्संग पाण्डाल',
  'पिंगलेश्वर रेलवे स्टेशन के सामने, मक्सी रोड',
  'उज्जैन (Ujjain)',
  'मध्य प्रदेश (Madhya Pradesh)',
  '456001',
  'परम पूज्य बाबा उमाकान्त जी महाराज',
  '/images/sant_vanshavali.jpg',
  '+91-9754700200',
  'जयगुरुदेव संस्था, उज्जैन आश्रम',
  'upcoming',
  0,
  1,
  'full',
  '50,000+ श्रद्धालु',
  NOW(),
  NOW()
),
(
  '64f1a2b3c4d5e6f7a8b9c002',
  'नित्य प्रातः कालीन ध्यान एवं भजन',
  'आश्रम के समस्त साधकों एवं दर्शनार्थियों के लिए दैनिक सुरत-शब्द योग अभ्यास।',
  NOW(),
  '05:00 AM',
  '07:00 AM',
  'साधना कक्ष, आश्रम परिसर',
  'मथुरा-दिल्ली हाईवे',
  'मथुरा (Mathura)',
  'उत्तर प्रदेश',
  '281001',
  'आश्रम साधक मंडल',
  '',
  '+91-9876543210',
  'जयगुरुदेव आश्रम',
  'upcoming',
  1,
  1,
  'full',
  'दैनिक साधक',
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- ------------------------------------------------------------------------------
-- 5. Sample Notices
-- ------------------------------------------------------------------------------
INSERT INTO `notices` (
  `id`, `title`, `content`, `category`, `priority`, `publish_date`, `is_popup`, `status`, `featured`, `created_at`, `updated_at`
) VALUES
(
  '64f1a2b3c4d5e6f7a8b9c101',
  'वार्षिक गुरु पूर्णिमा महा-महोत्सव सूचना एवं दिशा-निर्देश',
  'आगामी गुरु पूर्णिमा के पावन अवसर पर आश्रम में 3 दिवसीय अखंड नाम-संकीर्तन, भंडारा एवं सत्संग आयोजित होगा। समस्त सत्संगी भाई-बहन कृपया निर्धारित नियमों का पालन करें।',
  'Ashram Announcement',
  'Very Important',
  NOW(),
  1,
  'active',
  1,
  NOW(),
  NOW()
),
(
  '64f1a2b3c4d5e6f7a8b9c102',
  'आश्रम दर्शन एवं आवास व्यवस्था संबंधी आवश्यक निर्देश',
  'दूर-दराज से आने वाले सभी श्रद्धालुओं के लिए आवास और भोजन की निशुल्क व्यवस्था आश्रम द्वारा की गई है। कृपया पहचान पत्र साथ लाएं।',
  'General Notice',
  'Important',
  NOW(),
  0,
  'active',
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- ------------------------------------------------------------------------------
-- 6. Sample Ashram Adhesh
-- ------------------------------------------------------------------------------
INSERT INTO `adhesh` (
  `id`, `title`, `reference_number`, `issue_date`, `description`, `category`, `priority`, `signatory`, `is_published`, `created_at`, `updated_at`
) VALUES
(
  '64f1a2b3c4d5e6f7a8b9c301',
  'आश्रम आदेश सं. JGD/2026/08: आश्रम में आने वाले समस्त दर्शनार्थियों के लिए निशुल्क भंडारा एवं अनुशासन व्यवस्था',
  'JGD/2026/08',
  NOW(),
  'उज्जैन आश्रम केंद्रीय कार्यालय द्वारा जारी आधिकारिक निर्देश: आश्रम में सभी भक्तों के लिए 24 घंटे निशुल्क लंगर एवं आवास की पूर्ण व्यवस्था है। किसी भी सेवादार को कोई शुल्क नहीं देना है।',
  'Ashram Order',
  'Very Important',
  'केंद्रीय आश्रम कार्यालय, उज्जैन (म.प्र.)',
  1,
  NOW(),
  NOW()
),
(
  '64f1a2b3c4d5e6f7a8b9c302',
  'आश्रम आदेश सं. JGD/2026/07: प्रत्येक जिले में शाकाहार प्रचार एवं गुलाबी झंडी वाहन रैलियों के संबंध में दिशा-निर्देश',
  'JGD/2026/07',
  NOW(),
  'सभी प्रांतीय एवं जिला कमेटियों को निर्देशित किया जाता है कि शाकाहार प्रचार हेतु गुलाबी झंडी लगाकर शांतिपूर्ण वाहन यात्राएं व जनसंपर्क अभियान चलाएं।',
  'Administrative Directive',
  'Important',
  'परम पूज्य बाबा उमाकान्त जी महाराज के आदेशानुसार',
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- ------------------------------------------------------------------------------
-- 7. Sample Events
-- ------------------------------------------------------------------------------
INSERT INTO `events` (
  `id`, `title`, `slug`, `description`, `banner_image`, `start_date`, `end_date`,
  `start_time`, `end_time`, `location`, `address`, `city`, `state`, `organizer`, `status`, `is_featured`, `created_at`, `updated_at`
) VALUES
(
  '64f1a2b3c4d5e6f7a8b9c201',
  'वार्षिक पावन भंडारा महोत्सव एवं विशाल संत समागम — उज्जैन',
  'annual-bhandara-mahotsav-ujjain',
  'उज्जैन आश्रम में आयोजित होने वाला देश-विदेश के लाखों श्रद्धालुओं का भव्य त्रिदिवसीय संत समागम। निरंतर गुरु का अखंड लंगर, अमृत वाणी, नामदान एवं आध्यात्मिक प्रश्नोत्तरी सत्र।',
  '/images/sant_vanshavali.jpg',
  DATE_ADD(NOW(), INTERVAL 15 DAY),
  DATE_ADD(NOW(), INTERVAL 18 DAY),
  '06:00 AM',
  '09:00 PM',
  'बाबा जयगुरुदेव आश्रम, मक्सी रोड, उज्जैन (म.प्र.)',
  'मक्सी रोड, पिंगलेश्वर',
  'उज्जैन (Ujjain)',
  'मध्य प्रदेश (Madhya Pradesh)',
  'जयगुरुदेव धर्म प्रचारक संस्था',
  'upcoming',
  1,
  NOW(),
  NOW()
),
(
  '64f1a2b3c4d5e6f7a8b9c202',
  'पावन गुरु पूर्णिमा महा-महोत्सव — जयपुर आश्रम',
  'guru-purnima-mahotsav-jaipur',
  'सतगुरु के चरणों में कृतज्ञता ज्ञापन, पावन गुरु वंदना, नाम-साधना दिशा-निर्देश एवं राजस्थान संगत का भव्य एकत्रीकरण।',
  '/images/sant_vanshavali.jpg',
  DATE_ADD(NOW(), INTERVAL 45 DAY),
  DATE_ADD(NOW(), INTERVAL 47 DAY),
  '08:00 AM',
  '08:00 PM',
  'जयगुरुदेव आश्रम, ठीकरिया, जयपुर',
  'अजमेर-जयपुर हाईवे',
  'जयपुर (Jaipur)',
  'राजस्थान (Rajasthan)',
  'जयगुरुदेव आश्रम जयपुर',
  'upcoming',
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- ------------------------------------------------------------------------------
-- 8. Sample Videos
-- ------------------------------------------------------------------------------
INSERT INTO `videos` (
  `id`, `title`, `description`, `video_type`, `video_url`, `youtube_id`, `thumbnail_url`,
  `duration`, `category`, `speaker`, `published_at`, `is_featured`, `created_at`, `updated_at`
) VALUES
(
  'vid-001',
  'मानव जीवन का वास्तविक उद्देश्य और नाम की महिमा — पूज्य महाराज जी',
  'इस दुर्लभ मानव चोले में आत्मा के कल्याण और प्रभु प्राप्ति का सबसे सरल साधन क्या है? जानिए अमृत वचन।',
  'youtube',
  'https://www.youtube.com/watch?v=4yhuGRpLSN4',
  '4yhuGRpLSN4',
  'https://i.ytimg.com/vi/4yhuGRpLSN4/maxresdefault.jpg',
  '38:45',
  'Satsang Discourse',
  'परम पूज्य बाबा उमाकान्त जी महाराज',
  NOW(),
  1,
  NOW(),
  NOW()
),
(
  'vid-002',
  'सुरत-शब्द योग (नाम-साधना) कैसे करें — महत्वपूर्ण निर्देश',
  'मन को एकाग्र कर अंतर्मुखी होने की सरल विधि और साधक के आवश्यक नियम।',
  'youtube',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'dQw4w9WgXcQ',
  'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
  '26:10',
  'Sadhana Guidance',
  'परम पूज्य बाबा उमाकान्त जी महाराज',
  NOW(),
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- ------------------------------------------------------------------------------
-- 9. Sample Audios
-- ------------------------------------------------------------------------------
INSERT INTO `audios` (
  `id`, `title`, `description`, `audio_url`, `duration`, `category`, `speaker`, `is_featured`, `date`, `created_at`, `updated_at`
) VALUES
(
  'aud-001',
  'जयगुरुदेव नाम धुन (अखंड सिमरन)',
  'मन को शांत और एकाग्र करने वाली पावन नाम-धुन।',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  '15:30',
  'Naam Dhun',
  'आश्रम मंडली',
  1,
  NOW(),
  NOW(),
  NOW()
),
(
  'aud-002',
  'प्रातः कालीन वंदना एवं आरती',
  'आश्रम में नित्य प्रातः होने वाली पावन प्रार्थना।',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  '11:20',
  'Morning Prayer',
  'आश्रम साधक',
  1,
  NOW(),
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- ------------------------------------------------------------------------------
-- 10. Sample Chatbot Knowledge Base
-- ------------------------------------------------------------------------------
INSERT INTO `chatbot_knowledge` (
  `id`, `question`, `answer`, `category`, `keywords`, `source`, `priority`, `is_official`, `is_published`, `created_at`, `updated_at`
) VALUES
(
  'kb-001',
  'जयगुरुदेव संस्था क्या है?',
  'जयगुरुदेव धर्म प्रचारक संस्था एक पावन आध्यात्मिक और मानव सेवा संगठन है, जिसका मुख्यालय मथुरा और उज्जैन में स्थित है। यह संस्था जीवों पर दया, शाकाहार, नशामुक्ति, और सुरत-शब्द योग (नाम साधना) के प्रचार-प्रसार के लिए समर्पित है।',
  'About Sanstha',
  'jaigurudev, sanstha, kya hai, about, parichay, mission, ujjain, mathura',
  'आधिकारिक संस्था विवरण',
  10,
  1,
  1,
  NOW(),
  NOW()
),
(
  'kb-002',
  'सत्संग कब और कहाँ होता है?',
  'उज्जैन एवं मथुरा मुख्य आश्रम में प्रत्येक रविवार प्रातः 08:00 बजे साप्ताहिक महा-सत्संग एवं नाम-दान का कार्यक्रम होता है। इसके अतिरिक्त दैनिक प्रातः 05:00 बजे एवं सायं 06:00 बजे नियमित ध्यान-भजन कार्यक्रम आयोजित होता है।',
  'Satsang Info',
  'satsang, kab hota hai, timing, samay, location, sunday, ujjain, mathura',
  'सत्संग समय सारिणी',
  9,
  1,
  1,
  NOW(),
  NOW()
),
(
  'kb-003',
  'आश्रम का पता (Address) क्या है और संपर्क कैसे करें?',
  'जयगुरुदेव आश्रम, पिंगलेश्वर रेलवे स्टेशन के सामने, मक्सी रोड, उज्जैन (म.प्र.) 456001 तथा मथुरा आश्रम, मथुरा-दिल्ली राष्ट्रीय राजमार्ग (NH-19), मथुरा (उ.प्र.) 281001। हेल्पलाइन: +91-9754700200 / +91-9575600700।',
  'Contact & Location',
  'address, pata, location, phone, contact, kahan hai, ujjain ashram, mathura ashram, helpline',
  'कार्यालय संपर्क विवरण',
  9,
  1,
  1,
  NOW(),
  NOW()
),
(
  'kb-004',
  'नाम-दान (दीक्षा) लेने के क्या नियम हैं?',
  'नाम-दान लेने के लिए मुख्य नियम हैं: 1. आजीवन पूर्ण शाकाहारी रहना (मांसाहार, अंडा आदि का पूर्ण त्याग), 2. किसी भी प्रकार के नशे (शराब, तंबाकू आदि) से दूर रहना, 3. सदाचारी व परोपकारी जीवन व्यतीत करना, और 4. प्रतिदिन नित्य नाम-साधना (ध्यान-भजन) करना।',
  'Sadhana & Practice',
  'naam daan, deeksha, rules, niyam, shakahar, sadhana, dhyan',
  'नाम-दान दिशा-निर्देश',
  8,
  1,
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE `question` = VALUES(`question`);

-- ------------------------------------------------------------------------------
-- 11. Sample FAQs
-- ------------------------------------------------------------------------------
INSERT INTO `faqs` (`id`, `question`, `answer`, `category`, `display_order`, `is_published`, `created_at`, `updated_at`)
VALUES
(
  'faq-001',
  'क्या सत्संग में शामिल होने के लिए कोई शुल्क देना होता है?',
  'नहीं, जयगुरुदेव संस्था द्वारा आयोजित सभी सत्संग, भंडारा एवं नामदान कार्यक्रम पूर्णतः निःशुल्क हैं। किसी भी व्यक्ति या सेवादार को कोई शुल्क नहीं देना है।',
  'About Sanstha',
  1,
  1,
  NOW(),
  NOW()
),
(
  'faq-002',
  'आश्रम में रात्रि विश्राम और भोजन की क्या व्यवस्था है?',
  'आश्रम पधारने वाले समस्त दर्शनार्थियों एवं साधकों के लिए 24 घंटे निशुल्क लंगर (भोजन प्रसाद) और आवास (विश्राम) की समुचित व्यवस्था उपलब्ध है।',
  'Ashram Visit',
  2,
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE `question` = VALUES(`question`);

-- ------------------------------------------------------------------------------
-- 12. Sample Documents
-- ------------------------------------------------------------------------------
INSERT INTO `documents` (
  `id`, `title`, `description`, `file_url`, `file_type`, `file_size`, `category`,
  `reference_number`, `author_or_publisher`, `publish_date`, `downloads_count`, `is_downloadable`, `is_featured`, `created_at`, `updated_at`
) VALUES
(
  'doc-001',
  'शाकाहार चेतना एवं मानव धर्म पत्रिका',
  'मानव जीवन के कल्याण, जीव दया और आध्यात्मिक साधना पर आधारित त्रैमासिक पावन पत्रिका।',
  '/downloads/shakahar_chetna_patrika.pdf',
  'pdf',
  '2.4 MB',
  'Publication',
  'PUB/2026/01',
  'जयगुरुदेव आश्रम प्रकाशन',
  NOW(),
  125,
  1,
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- ------------------------------------------------------------------------------
-- 13. Sample Gallery
-- ------------------------------------------------------------------------------
INSERT INTO `galleries` (
  `id`, `title`, `slug`, `description`, `cover_image`, `category`, `event_date`, `is_featured`, `created_at`, `updated_at`
) VALUES
(
  'gal-001',
  'पावन आश्रम दर्शन एवं आध्यात्मिक वातावरण',
  'ashram-darshan-divine-moments',
  'उज्जैन एवं मथुरा पावन आश्रम परिसर, सत्संग पाण्डाल, साधना कुटीर और दर्शन स्थल की अलौकिक झलकियां।',
  '/images/sant_vanshavali.jpg',
  'Ashram Darshan',
  NOW(),
  1,
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

INSERT INTO `gallery_photos` (`id`, `gallery_id`, `url`, `thumbnail_url`, `caption`, `uploaded_at`)
VALUES
(
  'photo-001',
  'gal-001',
  '/images/sant_vanshavali.jpg',
  '/images/sant_vanshavali.jpg',
  'परम संत वंशावली एवं दिव्य स्वरूप',
  NOW()
) ON DUPLICATE KEY UPDATE `caption` = VALUES(`caption`);

SET FOREIGN_KEY_CHECKS = 1;
