-- ==============================================================================
-- JAIGURUDEV SPIRITUAL PLATFORM — MYSQL / MARIADB RELATIONAL DATABASE SCHEMA
-- Compatible with: MySQL 5.7+, MySQL 8.0+, MariaDB 10.3+, phpMyAdmin, Hostinger
-- Collation: utf8mb4_unicode_ci (Full multilingual Hindi & Unicode support)
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------------------------
-- 1. Table: admins
-- Stores admin accounts and superadmin credentials
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admins` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('superadmin', 'admin', 'editor') NOT NULL DEFAULT 'admin',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `last_login` DATETIME NULL DEFAULT NULL,
  `password_changed_at` DATETIME NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_admins_email` (`email`),
  KEY `idx_admins_role` (`role`),
  KEY `idx_admins_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 2. Table: site_settings
-- System configurations, helpline numbers, social links, and app metadata
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` VARCHAR(36) NOT NULL DEFAULT 'default',
  `organization_name` VARCHAR(255) NOT NULL DEFAULT 'जयगुरुदेव धर्म प्रचारक संस्था (Jaigurudev Sanstha)',
  `tagline` VARCHAR(255) NOT NULL DEFAULT 'सत्य, दया, धर्म और नाम-साधना का पावन मार्ग',
  `logo_url` VARCHAR(500) NOT NULL DEFAULT '/logo.svg',
  `announcement_bar_enabled` TINYINT(1) NOT NULL DEFAULT 1,
  `announcement_bar_text` TEXT NULL,
  `announcement_bar_link` VARCHAR(500) NULL DEFAULT '/satsang',
  `announcement_bar_is_emergency` TINYINT(1) NOT NULL DEFAULT 0,
  `contact_phone` VARCHAR(50) NULL DEFAULT '+91-9754700200',
  `contact_emergency_phone` VARCHAR(50) NULL DEFAULT '+91-9575600700',
  `contact_email` VARCHAR(191) NULL DEFAULT 'contact@jaigurudev.org',
  `contact_address` TEXT NULL,
  `contact_city` VARCHAR(100) NULL DEFAULT 'Ujjain',
  `contact_state` VARCHAR(100) NULL DEFAULT 'Madhya Pradesh',
  `contact_pincode` VARCHAR(20) NULL DEFAULT '456001',
  `contact_maps_embed_url` TEXT NULL,
  `contact_office_hours` VARCHAR(100) NULL DEFAULT 'Daily 06:00 AM – 08:00 PM',
  `social_youtube` VARCHAR(500) NULL DEFAULT 'https://www.youtube.com/c/jaigurudevukm',
  `social_facebook` VARCHAR(500) NULL DEFAULT 'https://facebook.com',
  `social_instagram` VARCHAR(500) NULL DEFAULT 'https://instagram.com',
  `social_twitter` VARCHAR(500) NULL DEFAULT 'https://x.com',
  `social_telegram` VARCHAR(500) NULL DEFAULT 'https://telegram.org',
  `social_whatsapp` VARCHAR(500) NULL DEFAULT 'https://whatsapp.com/channel/0029VaAcAA40QeadmEmp9y3c',
  `footer_about_short` TEXT NULL,
  `footer_disclaimer` TEXT NULL,
  `footer_copyright_text` VARCHAR(255) NULL DEFAULT '© 2026 Jaigurudev Sanstha. All rights reserved.',
  `homepage_sections` JSON NULL,
  `app_android_apk_url` VARCHAR(500) NULL DEFAULT '/downloads/jaigurudev-sadhana.apk',
  `app_apk_version` VARCHAR(50) NULL DEFAULT '1.0.0',
  `app_promo_title` VARCHAR(255) NULL DEFAULT 'Download Jaigurudev Sadhana App',
  `app_promo_subtitle` TEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 3. Table: hero_banners
-- Normalized child table for site_settings.heroBanners array
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `hero_banners` (
  `id` VARCHAR(36) NOT NULL,
  `settings_id` VARCHAR(36) NOT NULL DEFAULT 'default',
  `title` VARCHAR(255) NOT NULL,
  `subtitle` TEXT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `cta_text` VARCHAR(100) NULL DEFAULT 'Learn More',
  `cta_link` VARCHAR(500) NULL DEFAULT '/about',
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_hero_banners_settings_id` (`settings_id`),
  KEY `idx_hero_banners_order` (`display_order`),
  CONSTRAINT `fk_hero_banners_settings` FOREIGN KEY (`settings_id`) REFERENCES `site_settings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 4. Table: satsangs
-- Holy Satsang discourse schedules, venues, dates, and instructions
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `satsangs` (
  `id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT NULL,
  `date` DATETIME NOT NULL,
  `start_time` VARCHAR(50) NOT NULL DEFAULT '07:00 AM',
  `end_time` VARCHAR(50) NULL DEFAULT '09:00 AM',
  `location` VARCHAR(255) NOT NULL,
  `address` VARCHAR(500) NULL DEFAULT '',
  `city` VARCHAR(100) NOT NULL DEFAULT 'Ujjain',
  `state` VARCHAR(100) NOT NULL DEFAULT 'Madhya Pradesh',
  `pincode` VARCHAR(20) NULL DEFAULT '',
  `speaker` VARCHAR(150) NOT NULL DEFAULT 'Pujya Maharaj Ji',
  `poster_image` VARCHAR(500) NULL DEFAULT '',
  `map_url` VARCHAR(500) NULL DEFAULT '',
  `contact_number` VARCHAR(50) NULL DEFAULT '',
  `organizer` VARCHAR(200) NOT NULL DEFAULT 'Jaigurudev Sanstha',
  `special_instructions` TEXT NULL,
  `status` ENUM('upcoming', 'ongoing', 'completed', 'cancelled') NOT NULL DEFAULT 'upcoming',
  `is_daily` TINYINT(1) NOT NULL DEFAULT 0,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `media_url` VARCHAR(500) NULL DEFAULT '',
  `display_mode` ENUM('full', 'link_with_details', 'link_only') NOT NULL DEFAULT 'full',
  `expected_attendees` VARCHAR(100) NULL DEFAULT '',
  `contact_person_name` VARCHAR(100) NULL DEFAULT '',
  `contact_person_phone` VARCHAR(50) NULL DEFAULT '',
  `google_maps_link` VARCHAR(500) NULL DEFAULT '',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_satsangs_date` (`date`),
  KEY `idx_satsangs_status` (`status`),
  KEY `idx_satsangs_city` (`city`),
  KEY `idx_satsangs_is_featured` (`is_featured`),
  KEY `idx_satsangs_is_daily` (`is_daily`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 5. Table: notices
-- Ashram announcements, urgent alerts, and notifications
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `notices` (
  `id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'General Notice',
  `priority` ENUM('Emergency', 'Very Important', 'Important', 'Normal') NOT NULL DEFAULT 'Normal',
  `publish_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expiry_date` DATETIME NULL DEFAULT NULL,
  `attachment_url` VARCHAR(500) NULL DEFAULT '',
  `attachment_name` VARCHAR(255) NULL DEFAULT '',
  `is_popup` TINYINT(1) NOT NULL DEFAULT 0,
  `status` ENUM('active', 'archived') NOT NULL DEFAULT 'active',
  `featured` TINYINT(1) NOT NULL DEFAULT 0,
  `reference_number` VARCHAR(100) NULL DEFAULT '',
  `media_url` VARCHAR(500) NULL DEFAULT '',
  `display_mode` ENUM('full', 'link_with_details', 'link_only') NOT NULL DEFAULT 'full',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_notices_status` (`status`),
  KEY `idx_notices_priority` (`priority`),
  KEY `idx_notices_category` (`category`),
  KEY `idx_notices_publish_date` (`publish_date`),
  KEY `idx_notices_featured` (`featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 6. Table: events
-- Annual festivals, bhandaras, youth rallies, and camps
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `events` (
  `id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `banner_image` VARCHAR(500) NULL DEFAULT '',
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NULL DEFAULT NULL,
  `start_time` VARCHAR(50) NULL DEFAULT '',
  `end_time` VARCHAR(50) NULL DEFAULT '',
  `location` VARCHAR(255) NOT NULL,
  `address` VARCHAR(500) NULL DEFAULT '',
  `city` VARCHAR(100) NULL DEFAULT '',
  `state` VARCHAR(100) NOT NULL DEFAULT 'Uttar Pradesh',
  `pincode` VARCHAR(20) NULL DEFAULT '',
  `map_url` VARCHAR(500) NULL DEFAULT '',
  `contact_number` VARCHAR(50) NULL DEFAULT '',
  `organizer` VARCHAR(200) NOT NULL DEFAULT 'Jaigurudev Ashram',
  `registration_url` VARCHAR(500) NULL DEFAULT '',
  `instructions` TEXT NULL,
  `status` ENUM('upcoming', 'ongoing', 'completed', 'cancelled') NOT NULL DEFAULT 'upcoming',
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_events_slug` (`slug`),
  KEY `idx_events_start_date` (`start_date`),
  KEY `idx_events_status` (`status`),
  KEY `idx_events_city` (`city`),
  KEY `idx_events_is_featured` (`is_featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 7. Table: adhesh
-- Official Ashram orders, administrative directives, and decrees
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `adhesh` (
  `id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `reference_number` VARCHAR(100) NOT NULL,
  `issue_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` TEXT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'Ashram Order',
  `priority` ENUM('Emergency', 'Very Important', 'Important', 'Normal') NOT NULL DEFAULT 'Important',
  `document_url` VARCHAR(500) NULL DEFAULT '',
  `is_external_link` TINYINT(1) NOT NULL DEFAULT 0,
  `external_url` VARCHAR(500) NULL DEFAULT '',
  `signatory` VARCHAR(200) NOT NULL DEFAULT 'Pujya Maharaj Ji / Sanstha Sachiv',
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `media_url` VARCHAR(500) NULL DEFAULT '',
  `display_mode` ENUM('full', 'link_with_details', 'link_only') NOT NULL DEFAULT 'full',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_adhesh_reference_number` (`reference_number`),
  KEY `idx_adhesh_issue_date` (`issue_date`),
  KEY `idx_adhesh_category` (`category`),
  KEY `idx_adhesh_is_published` (`is_published`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 8. Table: videos
-- Video discourses, YouTube live streams, and recordings
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `videos` (
  `id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT NULL,
  `video_type` ENUM('youtube', 'external', 'upload') NOT NULL DEFAULT 'youtube',
  `video_url` VARCHAR(500) NOT NULL,
  `youtube_id` VARCHAR(50) NULL DEFAULT '',
  `thumbnail_url` VARCHAR(500) NULL DEFAULT '',
  `duration` VARCHAR(50) NULL DEFAULT '',
  `category` VARCHAR(100) NOT NULL DEFAULT 'Satsang Discourse',
  `speaker` VARCHAR(150) NOT NULL DEFAULT 'Pujya Maharaj Ji',
  `published_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_videos_category` (`category`),
  KEY `idx_videos_published_at` (`published_at`),
  KEY `idx_videos_is_featured` (`is_featured`),
  KEY `idx_videos_youtube_id` (`youtube_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 9. Table: audios
-- Devotional bhajans, naam dhun, prayers, and audio discourses
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `audios` (
  `id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT NULL,
  `audio_url` VARCHAR(500) NOT NULL,
  `duration` VARCHAR(50) NOT NULL DEFAULT '00:00',
  `category` VARCHAR(100) NOT NULL DEFAULT 'Bhajan',
  `speaker` VARCHAR(150) NOT NULL DEFAULT 'Ashram Mandali',
  `cover_image_url` VARCHAR(500) NULL DEFAULT '',
  `lyrics` LONGTEXT NULL,
  `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_audios_category` (`category`),
  KEY `idx_audios_is_featured` (`is_featured`),
  KEY `idx_audios_date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 10. Table: galleries
-- Photo albums, darshan galleries, and historical moments
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `galleries` (
  `id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `description` TEXT NULL,
  `cover_image` VARCHAR(500) NULL DEFAULT '',
  `category` VARCHAR(100) NOT NULL DEFAULT 'Ashram Darshan',
  `event_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_galleries_slug` (`slug`),
  KEY `idx_galleries_category` (`category`),
  KEY `idx_galleries_event_date` (`event_date`),
  KEY `idx_galleries_is_featured` (`is_featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 11. Table: gallery_photos
-- Normalized child table for gallery photo items
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `gallery_photos` (
  `id` VARCHAR(36) NOT NULL,
  `gallery_id` VARCHAR(36) NOT NULL,
  `url` VARCHAR(500) NOT NULL,
  `thumbnail_url` VARCHAR(500) NULL DEFAULT '',
  `caption` VARCHAR(255) NULL DEFAULT '',
  `uploaded_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_gallery_photos_gallery_id` (`gallery_id`),
  CONSTRAINT `fk_gallery_photos_gallery` FOREIGN KEY (`gallery_id`) REFERENCES `galleries` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 12. Table: documents
-- Digital publications, spiritual books, monthly magazines, and reports
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `documents` (
  `id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT NULL,
  `file_url` VARCHAR(500) NOT NULL,
  `file_type` ENUM('pdf', 'doc', 'image', 'audio', 'other') NOT NULL DEFAULT 'pdf',
  `file_size` VARCHAR(50) NULL DEFAULT '',
  `category` VARCHAR(100) NOT NULL DEFAULT 'Publication',
  `reference_number` VARCHAR(100) NULL DEFAULT '',
  `author_or_publisher` VARCHAR(200) NOT NULL DEFAULT 'Jaigurudev Ashram',
  `publish_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `downloads_count` INT NOT NULL DEFAULT 0,
  `is_downloadable` TINYINT(1) NOT NULL DEFAULT 1,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_documents_category` (`category`),
  KEY `idx_documents_publish_date` (`publish_date`),
  KEY `idx_documents_is_downloadable` (`is_downloadable`),
  KEY `idx_documents_is_featured` (`is_featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 13. Table: posts
-- News articles, spiritual blog posts, and press releases
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `posts` (
  `id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `short_description` VARCHAR(500) NULL,
  `content` LONGTEXT NULL,
  `featured_image` VARCHAR(500) NULL DEFAULT '',
  `category` VARCHAR(100) NOT NULL DEFAULT 'General',
  `author` VARCHAR(100) NOT NULL DEFAULT 'Jaigurudev Ashram',
  `status` ENUM('draft', 'published', 'scheduled', 'archived') NOT NULL DEFAULT 'draft',
  `published_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_external_link` TINYINT(1) NOT NULL DEFAULT 0,
  `external_url` VARCHAR(500) NULL DEFAULT '',
  `featured` TINYINT(1) NOT NULL DEFAULT 0,
  `views_count` INT NOT NULL DEFAULT 0,
  `seo_title` VARCHAR(255) NULL,
  `seo_description` TEXT NULL,
  `seo_keywords` TEXT NULL,
  `seo_canonical_url` VARCHAR(500) NULL,
  `seo_og_image` VARCHAR(500) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_posts_slug` (`slug`),
  KEY `idx_posts_category` (`category`),
  KEY `idx_posts_status` (`status`),
  KEY `idx_posts_published_at` (`published_at`),
  KEY `idx_posts_featured` (`featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 14. Table: post_gallery_images
-- Normalized child table for post gallery images
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `post_gallery_images` (
  `id` VARCHAR(36) NOT NULL,
  `post_id` VARCHAR(36) NOT NULL,
  `url` VARCHAR(500) NOT NULL,
  `caption` VARCHAR(255) NULL DEFAULT '',
  `display_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_post_gallery_images_post_id` (`post_id`),
  CONSTRAINT `fk_post_gallery_images_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 15. Table: faqs
-- Frequently asked questions and guidance for devotees
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `faqs` (
  `id` VARCHAR(36) NOT NULL,
  `question` TEXT NOT NULL,
  `answer` LONGTEXT NOT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'About Sanstha',
  `display_order` INT NOT NULL DEFAULT 0,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_faqs_category` (`category`),
  KEY `idx_faqs_display_order` (`display_order`),
  KEY `idx_faqs_is_published` (`is_published`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 16. Table: chatbot_knowledge
-- Verified spiritual knowledge base for chatbot AI queries & localized search
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `chatbot_knowledge` (
  `id` VARCHAR(36) NOT NULL,
  `question` TEXT NOT NULL,
  `answer` LONGTEXT NOT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'About Sanstha',
  `keywords` TEXT NULL,
  `source` VARCHAR(255) NOT NULL DEFAULT 'Official Sanstha Guidelines',
  `priority` INT NOT NULL DEFAULT 1,
  `is_official` TINYINT(1) NOT NULL DEFAULT 1,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `usage_count` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_chatbot_knowledge_category` (`category`),
  KEY `idx_chatbot_knowledge_is_published` (`is_published`),
  KEY `idx_chatbot_knowledge_priority` (`priority`),
  FULLTEXT KEY `ft_chatbot_knowledge` (`question`, `answer`, `keywords`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 17. Table: contact_enquiries
-- Devotee submitted queries, feedback, and helpdesk messages
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_enquiries` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(191) NULL DEFAULT '',
  `phone` VARCHAR(50) NULL DEFAULT '',
  `subject` VARCHAR(200) NOT NULL DEFAULT 'General Enquiry',
  `message` LONGTEXT NOT NULL,
  `is_read` TINYINT(1) NOT NULL DEFAULT 0,
  `status` ENUM('new', 'in_progress', 'resolved', 'archived') NOT NULL DEFAULT 'new',
  `admin_notes` TEXT NULL,
  `ip_address` VARCHAR(100) NULL DEFAULT '',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_contact_enquiries_status` (`status`),
  KEY `idx_contact_enquiries_is_read` (`is_read`),
  KEY `idx_contact_enquiries_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 18. Table: activity_logs
-- Audit log recording administrative actions across the platform
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `activity_logs` (
  `id` VARCHAR(36) NOT NULL,
  `admin_id` VARCHAR(36) NULL DEFAULT NULL,
  `admin_email` VARCHAR(191) NOT NULL DEFAULT 'system',
  `action` VARCHAR(50) NOT NULL,
  `resource` VARCHAR(50) NOT NULL,
  `resource_id` VARCHAR(100) NULL DEFAULT '',
  `details` TEXT NULL,
  `ip_address` VARCHAR(100) NULL DEFAULT '',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_activity_logs_action` (`action`),
  KEY `idx_activity_logs_resource` (`resource`),
  KEY `idx_activity_logs_admin_id` (`admin_id`),
  KEY `idx_activity_logs_created_at` (`created_at`),
  CONSTRAINT `fk_activity_logs_admin` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
