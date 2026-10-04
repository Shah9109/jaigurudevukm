/**
 * ==============================================================================
 * JAIGURUDEV SPIRITUAL PLATFORM — MONGODB TO MYSQL DATA MIGRATION SCRIPT
 * Preserves all original IDs, password hashes, relationships, and timestamps.
 * Does NOT delete any data from MongoDB.
 * ==============================================================================
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import mysql from 'mysql2/promise';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load server environment variables
dotenv.config({ path: path.join(__dirname, '../server/.env') });

const stats = {
  admins: 0,
  siteSettings: 0,
  heroBanners: 0,
  satsangs: 0,
  notices: 0,
  events: 0,
  adhesh: 0,
  videos: 0,
  audios: 0,
  galleries: 0,
  galleryPhotos: 0,
  documents: 0,
  posts: 0,
  postGalleryImages: 0,
  faqs: 0,
  chatbotKnowledge: 0,
  contactEnquiries: 0,
  activityLogs: 0,
  errors: 0,
};

function formatDate(date) {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 19).replace('T', ' ');
}

async function runMigration() {
  console.log('====================================================');
  console.log('  STARTING MONGODB TO MYSQL RELATIONAL MIGRATION');
  console.log('====================================================\n');

  // 1. Connect to MySQL
  const mysqlConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : '',
    database: process.env.DB_NAME || 'jaigurudev_db',
    charset: 'utf8mb4',
    dateStrings: true,
  };

  let mysqlConn = null;
  try {
    mysqlConn = await mysql.createConnection(mysqlConfig);
    console.log(`[MySQL] Connected to ${mysqlConfig.host}:${mysqlConfig.port}/${mysqlConfig.database}`);
  } catch (err) {
    console.error(`[MySQL Error] Could not connect to MySQL:`, err.message);
    console.log('Please ensure MySQL is running and database is created using database/schema.sql.');
    process.exit(1);
  }

  // 2. Connect to MongoDB
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('[MongoDB Error] MONGODB_URI is not defined in server/.env');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log(`[MongoDB] Connected to ${mongoose.connection.host}`);
  } catch (err) {
    console.error(`[MongoDB Error] Could not connect to MongoDB:`, err.message);
    process.exit(1);
  }

  const db = mongoose.connection.db;

  try {
    await mysqlConn.query('SET FOREIGN_KEY_CHECKS = 0');

    // --------------------------------------------------------------------------
    // 1. Migrate Admins
    // --------------------------------------------------------------------------
    console.log('[Migrating] Admins...');
    const adminDocs = await db.collection('admins').find({}).toArray();
    for (const doc of adminDocs) {
      try {
        const id = doc._id.toString();
        await mysqlConn.execute(
          `INSERT INTO \`admins\` (\`id\`, \`name\`, \`email\`, \`password\`, \`role\`, \`is_active\`, \`last_login\`, \`password_changed_at\`, \`created_at\`, \`updated_at\`)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE \`name\` = VALUES(\`name\`), \`role\` = VALUES(\`role\`), \`is_active\` = VALUES(\`is_active\`)`,
          [
            id,
            doc.name || 'Admin',
            (doc.email || '').toLowerCase().trim(),
            doc.password || '',
            doc.role || 'admin',
            doc.isActive !== false ? 1 : 0,
            formatDate(doc.lastLogin),
            formatDate(doc.passwordChangedAt),
            formatDate(doc.createdAt) || formatDate(new Date()),
            formatDate(doc.updatedAt) || formatDate(new Date()),
          ]
        );
        stats.admins++;
      } catch (e) {
        console.error(`Error migrating admin ${doc.email}:`, e.message);
        stats.errors++;
      }
    }

    // --------------------------------------------------------------------------
    // 2. Migrate Site Settings & Hero Banners
    // --------------------------------------------------------------------------
    console.log('[Migrating] Site Settings & Hero Banners...');
    const settingDocs = await db.collection('sitesettings').find({}).toArray();
    for (const doc of settingDocs) {
      try {
        const id = 'default';
        const contactInfo = doc.contactInfo || {};
        const socialLinks = doc.socialLinks || {};
        const footer = doc.footer || {};
        const appConfig = doc.appConfig || {};
        const annBar = doc.announcementBar || {};

        await mysqlConn.execute(
          `INSERT INTO \`site_settings\` (
            \`id\`, \`organization_name\`, \`tagline\`, \`logo_url\`,
            \`announcement_bar_enabled\`, \`announcement_bar_text\`, \`announcement_bar_link\`, \`announcement_bar_is_emergency\`,
            \`contact_phone\`, \`contact_emergency_phone\`, \`contact_email\`, \`contact_address\`, \`contact_city\`, \`contact_state\`, \`contact_pincode\`, \`contact_maps_embed_url\`, \`contact_office_hours\`,
            \`social_youtube\`, \`social_facebook\`, \`social_instagram\`, \`social_twitter\`, \`social_telegram\`, \`social_whatsapp\`,
            \`footer_about_short\`, \`footer_disclaimer\`, \`footer_copyright_text\`,
            \`homepage_sections\`,
            \`app_android_apk_url\`, \`app_apk_version\`, \`app_promo_title\`, \`app_promo_subtitle\`,
            \`created_at\`, \`updated_at\`
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE \`organization_name\` = VALUES(\`organization_name\`)`,
          [
            id,
            doc.organizationName || 'जयगुरुदेव धर्म प्रचारक संस्था (Jaigurudev Sanstha)',
            doc.tagline || 'सत्य, दया, धर्म और नाम-साधना का पावन मार्ग',
            doc.logoUrl || '/logo.svg',
            annBar.enabled !== false ? 1 : 0,
            annBar.text || '',
            annBar.link || '/satsang',
            annBar.isEmergency ? 1 : 0,
            contactInfo.phone || '+91-9754700200',
            contactInfo.emergencyPhone || '+91-9575600700',
            contactInfo.email || 'contact@jaigurudev.org',
            contactInfo.address || '',
            contactInfo.city || 'Ujjain',
            contactInfo.state || 'Madhya Pradesh',
            contactInfo.pincode || '456001',
            contactInfo.mapsEmbedUrl || '',
            contactInfo.officeHours || 'Daily 06:00 AM – 08:00 PM',
            socialLinks.youtube || 'https://www.youtube.com/c/jaigurudevukm',
            socialLinks.facebook || '',
            socialLinks.instagram || '',
            socialLinks.twitter || '',
            socialLinks.telegram || '',
            socialLinks.whatsapp || '',
            footer.aboutShort || '',
            footer.disclaimer || '',
            footer.copyrightText || '© 2026 Jaigurudev Sanstha. All rights reserved.',
            JSON.stringify(doc.homepageSections || {}),
            appConfig.androidApkUrl || '/downloads/jaigurudev-sadhana.apk',
            appConfig.apkVersion || '1.0.0',
            appConfig.appPromoTitle || 'Download Jaigurudev Sadhana App',
            appConfig.appPromoSubtitle || '',
            formatDate(doc.createdAt) || formatDate(new Date()),
            formatDate(doc.updatedAt) || formatDate(new Date()),
          ]
        );
        stats.siteSettings++;

        // Migrate heroBanners child array
        if (Array.isArray(doc.heroBanners)) {
          for (let i = 0; i < doc.heroBanners.length; i++) {
            const b = doc.heroBanners[i];
            const bannerId = b._id ? b._id.toString() : `banner-${i + 1}`;
            await mysqlConn.execute(
              `INSERT INTO \`hero_banners\` (\`id\`, \`settings_id\`, \`title\`, \`subtitle\`, \`image_url\`, \`cta_text\`, \`cta_link\`, \`display_order\`, \`is_active\`)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
               ON DUPLICATE KEY UPDATE \`title\` = VALUES(\`title\`)`,
              [
                bannerId,
                id,
                b.title || 'Welcome',
                b.subtitle || '',
                b.imageUrl || '',
                b.ctaText || 'Learn More',
                b.ctaLink || '/about',
                b.order !== undefined ? Number(b.order) : i,
                b.active !== false ? 1 : 0,
              ]
            );
            stats.heroBanners++;
          }
        }
      } catch (e) {
        console.error('Error migrating site settings:', e.message);
        stats.errors++;
      }
    }

    // --------------------------------------------------------------------------
    // 3. Migrate Satsangs
    // --------------------------------------------------------------------------
    console.log('[Migrating] Satsang discourses...');
    const satsangDocs = await db.collection('satsangs').find({}).toArray();
    for (const doc of satsangDocs) {
      try {
        const id = doc._id.toString();
        await mysqlConn.execute(
          `INSERT INTO \`satsangs\` (
            \`id\`, \`title\`, \`description\`, \`date\`, \`start_time\`, \`end_time\`,
            \`location\`, \`address\`, \`city\`, \`state\`, \`pincode\`, \`speaker\`,
            \`poster_image\`, \`map_url\`, \`contact_number\`, \`organizer\`, \`special_instructions\`,
            \`status\`, \`is_daily\`, \`is_featured\`, \`media_url\`, \`display_mode\`,
            \`expected_attendees\`, \`contact_person_name\`, \`contact_person_phone\`, \`google_maps_link\`,
            \`created_at\`, \`updated_at\`
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE \`title\` = VALUES(\`title\`), \`date\` = VALUES(\`date\`)`,
          [
            id,
            doc.title || '',
            doc.description || '',
            formatDate(doc.date) || formatDate(new Date()),
            doc.startTime || '07:00 AM',
            doc.endTime || '09:00 AM',
            doc.location || '',
            doc.address || '',
            doc.city || 'Mathura',
            doc.state || 'Uttar Pradesh',
            doc.pincode || '',
            doc.speaker || 'Pujya Maharaj Ji',
            doc.posterImage || '',
            doc.mapUrl || '',
            doc.contactNumber || '',
            doc.organizer || 'Jaigurudev Sanstha',
            doc.specialInstructions || '',
            doc.status || 'upcoming',
            doc.isDaily ? 1 : 0,
            doc.isFeatured ? 1 : 0,
            doc.mediaUrl || '',
            doc.displayMode || 'full',
            doc.expectedAttendees || '',
            doc.contactPerson?.name || '',
            doc.contactPerson?.phone || '',
            doc.googleMapsLink || '',
            formatDate(doc.createdAt) || formatDate(new Date()),
            formatDate(doc.updatedAt) || formatDate(new Date()),
          ]
        );
        stats.satsangs++;
      } catch (e) {
        console.error(`Error migrating satsang ${doc.title}:`, e.message);
        stats.errors++;
      }
    }

    // --------------------------------------------------------------------------
    // 4. Migrate Notices
    // --------------------------------------------------------------------------
    console.log('[Migrating] Notices...');
    const noticeDocs = await db.collection('notices').find({}).toArray();
    for (const doc of noticeDocs) {
      try {
        const id = doc._id.toString();
        await mysqlConn.execute(
          `INSERT INTO \`notices\` (
            \`id\`, \`title\`, \`content\`, \`category\`, \`priority\`, \`publish_date\`, \`expiry_date\`,
            \`attachment_url\`, \`attachment_name\`, \`is_popup\`, \`status\`, \`featured\`,
            \`reference_number\`, \`media_url\`, \`display_mode\`, \`created_at\`, \`updated_at\`
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE \`title\` = VALUES(\`title\`)`,
          [
            id,
            doc.title || '',
            doc.content || '',
            doc.category || 'General Notice',
            doc.priority || 'Normal',
            formatDate(doc.publishDate) || formatDate(new Date()),
            formatDate(doc.expiryDate),
            doc.attachmentUrl || '',
            doc.attachmentName || '',
            doc.isPopup ? 1 : 0,
            doc.status || 'active',
            doc.featured ? 1 : 0,
            doc.referenceNumber || '',
            doc.mediaUrl || '',
            doc.displayMode || 'full',
            formatDate(doc.createdAt) || formatDate(new Date()),
            formatDate(doc.updatedAt) || formatDate(new Date()),
          ]
        );
        stats.notices++;
      } catch (e) {
        console.error(`Error migrating notice ${doc.title}:`, e.message);
        stats.errors++;
      }
    }

    // --------------------------------------------------------------------------
    // 5. Migrate Events
    // --------------------------------------------------------------------------
    console.log('[Migrating] Events...');
    const eventDocs = await db.collection('events').find({}).toArray();
    for (const doc of eventDocs) {
      try {
        const id = doc._id.toString();
        await mysqlConn.execute(
          `INSERT INTO \`events\` (
            \`id\`, \`title\`, \`slug\`, \`description\`, \`banner_image\`, \`start_date\`, \`end_date\`,
            \`start_time\`, \`end_time\`, \`location\`, \`address\`, \`city\`, \`state\`, \`pincode\`,
            \`map_url\`, \`contact_number\`, \`organizer\`, \`registration_url\`, \`instructions\`,
            \`status\`, \`is_featured\`, \`created_at\`, \`updated_at\`
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE \`title\` = VALUES(\`title\`)`,
          [
            id,
            doc.title || '',
            doc.slug || `event-${id}`,
            doc.description || '',
            doc.bannerImage || '',
            formatDate(doc.startDate) || formatDate(new Date()),
            formatDate(doc.endDate),
            doc.startTime || '',
            doc.endTime || '',
            doc.location || '',
            doc.address || '',
            doc.city || '',
            doc.state || 'Uttar Pradesh',
            doc.pincode || '',
            doc.mapUrl || '',
            doc.contactNumber || '',
            doc.organizer || 'Jaigurudev Ashram',
            doc.registrationUrl || '',
            doc.instructions || '',
            doc.status || 'upcoming',
            doc.isFeatured ? 1 : 0,
            formatDate(doc.createdAt) || formatDate(new Date()),
            formatDate(doc.updatedAt) || formatDate(new Date()),
          ]
        );
        stats.events++;
      } catch (e) {
        console.error(`Error migrating event ${doc.title}:`, e.message);
        stats.errors++;
      }
    }

    // --------------------------------------------------------------------------
    // 6. Migrate Ashram Adhesh
    // --------------------------------------------------------------------------
    console.log('[Migrating] Ashram Adhesh...');
    const adheshDocs = await db.collection('adheshes').find({}).toArray();
    for (const doc of adheshDocs) {
      try {
        const id = doc._id.toString();
        await mysqlConn.execute(
          `INSERT INTO \`adhesh\` (
            \`id\`, \`title\`, \`reference_number\`, \`issue_date\`, \`description\`, \`category\`,
            \`priority\`, \`document_url\`, \`is_external_link\`, \`external_url\`, \`signatory\`,
            \`is_published\`, \`media_url\`, \`display_mode\`, \`created_at\`, \`updated_at\`
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE \`title\` = VALUES(\`title\`)`,
          [
            id,
            doc.title || '',
            doc.referenceNumber || `REF-${id}`,
            formatDate(doc.issueDate) || formatDate(new Date()),
            doc.description || '',
            doc.category || 'Ashram Order',
            doc.priority || 'Important',
            doc.documentUrl || '',
            doc.isExternalLink ? 1 : 0,
            doc.externalUrl || '',
            doc.signatory || 'Pujya Maharaj Ji',
            doc.isPublished !== false ? 1 : 0,
            doc.mediaUrl || '',
            doc.displayMode || 'full',
            formatDate(doc.createdAt) || formatDate(new Date()),
            formatDate(doc.updatedAt) || formatDate(new Date()),
          ]
        );
        stats.adhesh++;
      } catch (e) {
        console.error(`Error migrating adhesh ${doc.title}:`, e.message);
        stats.errors++;
      }
    }

    // --------------------------------------------------------------------------
    // 7. Migrate Videos
    // --------------------------------------------------------------------------
    console.log('[Migrating] Videos...');
    const videoDocs = await db.collection('videos').find({}).toArray();
    for (const doc of videoDocs) {
      try {
        const id = doc._id.toString();
        await mysqlConn.execute(
          `INSERT INTO \`videos\` (
            \`id\`, \`title\`, \`description\`, \`video_type\`, \`video_url\`, \`youtube_id\`,
            \`thumbnail_url\`, \`duration\`, \`category\`, \`speaker\`, \`published_at\`,
            \`is_featured\`, \`created_at\`, \`updated_at\`
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE \`title\` = VALUES(\`title\`)`,
          [
            id,
            doc.title || '',
            doc.description || '',
            doc.videoType || 'youtube',
            doc.videoUrl || '',
            doc.youtubeId || '',
            doc.thumbnailUrl || '',
            doc.duration || '',
            doc.category || 'Satsang Discourse',
            doc.speaker || 'Pujya Maharaj Ji',
            formatDate(doc.publishedAt) || formatDate(new Date()),
            doc.isFeatured ? 1 : 0,
            formatDate(doc.createdAt) || formatDate(new Date()),
            formatDate(doc.updatedAt) || formatDate(new Date()),
          ]
        );
        stats.videos++;
      } catch (e) {
        console.error(`Error migrating video ${doc.title}:`, e.message);
        stats.errors++;
      }
    }

    // --------------------------------------------------------------------------
    // 8. Migrate Audios
    // --------------------------------------------------------------------------
    console.log('[Migrating] Audios...');
    const audioDocs = await db.collection('audios').find({}).toArray();
    for (const doc of audioDocs) {
      try {
        const id = doc._id.toString();
        await mysqlConn.execute(
          `INSERT INTO \`audios\` (
            \`id\`, \`title\`, \`description\`, \`audio_url\`, \`duration\`, \`category\`,
            \`speaker\`, \`cover_image_url\`, \`lyrics\`, \`date\`, \`is_featured\`,
            \`created_at\`, \`updated_at\`
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE \`title\` = VALUES(\`title\`)`,
          [
            id,
            doc.title || '',
            doc.description || '',
            doc.audioUrl || '',
            doc.duration || '00:00',
            doc.category || 'Bhajan',
            doc.speaker || 'Ashram Mandali',
            doc.coverImageUrl || '',
            doc.lyrics || '',
            formatDate(doc.date) || formatDate(new Date()),
            doc.isFeatured ? 1 : 0,
            formatDate(doc.createdAt) || formatDate(new Date()),
            formatDate(doc.updatedAt) || formatDate(new Date()),
          ]
        );
        stats.audios++;
      } catch (e) {
        console.error(`Error migrating audio ${doc.title}:`, e.message);
        stats.errors++;
      }
    }

    // --------------------------------------------------------------------------
    // 9. Migrate Galleries & Child Photos
    // --------------------------------------------------------------------------
    console.log('[Migrating] Photo Galleries & Photos...');
    const galleryDocs = await db.collection('galleries').find({}).toArray();
    for (const doc of galleryDocs) {
      try {
        const id = doc._id.toString();
        await mysqlConn.execute(
          `INSERT INTO \`galleries\` (
            \`id\`, \`title\`, \`slug\`, \`description\`, \`cover_image\`, \`category\`,
            \`event_date\`, \`is_featured\`, \`created_at\`, \`updated_at\`
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE \`title\` = VALUES(\`title\`)`,
          [
            id,
            doc.title || '',
            doc.slug || `gallery-${id}`,
            doc.description || '',
            doc.coverImage || '',
            doc.category || 'Ashram Darshan',
            formatDate(doc.eventDate) || formatDate(new Date()),
            doc.isFeatured ? 1 : 0,
            formatDate(doc.createdAt) || formatDate(new Date()),
            formatDate(doc.updatedAt) || formatDate(new Date()),
          ]
        );
        stats.galleries++;

        if (Array.isArray(doc.photos)) {
          for (let pIdx = 0; pIdx < doc.photos.length; pIdx++) {
            const photo = doc.photos[pIdx];
            const photoId = photo._id ? photo._id.toString() : `photo-${id}-${pIdx}`;
            await mysqlConn.execute(
              `INSERT INTO \`gallery_photos\` (\`id\`, \`gallery_id\`, \`url\`, \`thumbnail_url\`, \`caption\`, \`uploaded_at\`)
               VALUES (?, ?, ?, ?, ?, ?)
               ON DUPLICATE KEY UPDATE \`url\` = VALUES(\`url\`)`,
              [
                photoId,
                id,
                photo.url || '',
                photo.thumbnailUrl || photo.url || '',
                photo.caption || '',
                formatDate(photo.uploadedAt) || formatDate(new Date()),
              ]
            );
            stats.galleryPhotos++;
          }
        }
      } catch (e) {
        console.error(`Error migrating gallery ${doc.title}:`, e.message);
        stats.errors++;
      }
    }

    // --------------------------------------------------------------------------
    // 10. Migrate Documents / Publications
    // --------------------------------------------------------------------------
    console.log('[Migrating] Documents & Publications...');
    const docItems = await db.collection('documents').find({}).toArray();
    for (const doc of docItems) {
      try {
        const id = doc._id.toString();
        await mysqlConn.execute(
          `INSERT INTO \`documents\` (
            \`id\`, \`title\`, \`description\`, \`file_url\`, \`file_type\`, \`file_size\`,
            \`category\`, \`reference_number\`, \`author_or_publisher\`, \`publish_date\`,
            \`downloads_count\`, \`is_downloadable\`, \`is_featured\`, \`created_at\`, \`updated_at\`
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE \`title\` = VALUES(\`title\`)`,
          [
            id,
            doc.title || '',
            doc.description || '',
            doc.fileUrl || '',
            doc.fileType || 'pdf',
            doc.fileSize || '',
            doc.category || 'Publication',
            doc.referenceNumber || '',
            doc.authorOrPublisher || 'Jaigurudev Ashram',
            formatDate(doc.publishDate) || formatDate(new Date()),
            Number(doc.downloadsCount) || 0,
            doc.isDownloadable !== false ? 1 : 0,
            doc.isFeatured ? 1 : 0,
            formatDate(doc.createdAt) || formatDate(new Date()),
            formatDate(doc.updatedAt) || formatDate(new Date()),
          ]
        );
        stats.documents++;
      } catch (e) {
        console.error(`Error migrating document ${doc.title}:`, e.message);
        stats.errors++;
      }
    }

    // --------------------------------------------------------------------------
    // 11. Migrate Posts
    // --------------------------------------------------------------------------
    console.log('[Migrating] Posts...');
    const postDocs = await db.collection('posts').find({}).toArray();
    for (const doc of postDocs) {
      try {
        const id = doc._id.toString();
        const seo = doc.seo || {};
        await mysqlConn.execute(
          `INSERT INTO \`posts\` (
            \`id\`, \`title\`, \`slug\`, \`short_description\`, \`content\`, \`featured_image\`,
            \`category\`, \`author\`, \`status\`, \`published_at\`, \`is_external_link\`,
            \`external_url\`, \`featured\`, \`views_count\`, \`seo_title\`, \`seo_description\`,
            \`seo_keywords\`, \`seo_canonical_url\`, \`seo_og_image\`, \`created_at\`, \`updated_at\`
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE \`title\` = VALUES(\`title\`)`,
          [
            id,
            doc.title || '',
            doc.slug || `post-${id}`,
            doc.shortDescription || '',
            doc.content || '',
            doc.featuredImage || '',
            doc.category || 'General',
            doc.author || 'Jaigurudev Ashram',
            doc.status || 'draft',
            formatDate(doc.publishedAt) || formatDate(new Date()),
            doc.isExternalLink ? 1 : 0,
            doc.externalUrl || '',
            doc.featured ? 1 : 0,
            Number(doc.viewsCount) || 0,
            seo.title || doc.title || '',
            seo.description || doc.shortDescription || '',
            Array.isArray(seo.keywords) ? seo.keywords.join(',') : '',
            seo.canonicalUrl || '',
            seo.ogImage || '',
            formatDate(doc.createdAt) || formatDate(new Date()),
            formatDate(doc.updatedAt) || formatDate(new Date()),
          ]
        );
        stats.posts++;

        if (Array.isArray(doc.gallery)) {
          for (let gIdx = 0; gIdx < doc.gallery.length; gIdx++) {
            const g = doc.gallery[gIdx];
            await mysqlConn.execute(
              `INSERT INTO \`post_gallery_images\` (\`id\`, \`post_id\`, \`url\`, \`caption\`, \`display_order\`)
               VALUES (?, ?, ?, ?, ?)
               ON DUPLICATE KEY UPDATE \`url\` = VALUES(\`url\`)`,
              [
                `post-img-${id}-${gIdx}`,
                id,
                g.url || '',
                g.caption || '',
                gIdx,
              ]
            );
            stats.postGalleryImages++;
          }
        }
      } catch (e) {
        console.error(`Error migrating post ${doc.title}:`, e.message);
        stats.errors++;
      }
    }

    // --------------------------------------------------------------------------
    // 12. Migrate FAQs
    // --------------------------------------------------------------------------
    console.log('[Migrating] FAQs...');
    const faqDocs = await db.collection('faqs').find({}).toArray();
    for (const doc of faqDocs) {
      try {
        const id = doc._id.toString();
        await mysqlConn.execute(
          `INSERT INTO \`faqs\` (\`id\`, \`question\`, \`answer\`, \`category\`, \`display_order\`, \`is_published\`, \`created_at\`, \`updated_at\`)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE \`question\` = VALUES(\`question\`)`,
          [
            id,
            doc.question || '',
            doc.answer || '',
            doc.category || 'About Sanstha',
            Number(doc.order) || 0,
            doc.isPublished !== false ? 1 : 0,
            formatDate(doc.createdAt) || formatDate(new Date()),
            formatDate(doc.updatedAt) || formatDate(new Date()),
          ]
        );
        stats.faqs++;
      } catch (e) {
        console.error(`Error migrating FAQ:`, e.message);
        stats.errors++;
      }
    }

    // --------------------------------------------------------------------------
    // 13. Migrate Chatbot Knowledge Base
    // --------------------------------------------------------------------------
    console.log('[Migrating] Chatbot Knowledge Base...');
    const kbDocs = await db.collection('chatbotknowledges').find({}).toArray();
    for (const doc of kbDocs) {
      try {
        const id = doc._id.toString();
        const kw = Array.isArray(doc.keywords) ? doc.keywords.join(', ') : (doc.keywords || '');
        await mysqlConn.execute(
          `INSERT INTO \`chatbot_knowledge\` (
            \`id\`, \`question\`, \`answer\`, \`category\`, \`keywords\`, \`source\`,
            \`priority\`, \`is_official\`, \`is_published\`, \`usage_count\`, \`created_at\`, \`updated_at\`
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE \`question\` = VALUES(\`question\`)`,
          [
            id,
            doc.question || '',
            doc.answer || '',
            doc.category || 'About Sanstha',
            kw,
            doc.source || 'Official Sanstha Guidelines',
            Number(doc.priority) || 1,
            doc.isOfficial !== false ? 1 : 0,
            doc.isPublished !== false ? 1 : 0,
            Number(doc.usageCount) || 0,
            formatDate(doc.createdAt) || formatDate(new Date()),
            formatDate(doc.updatedAt) || formatDate(new Date()),
          ]
        );
        stats.chatbotKnowledge++;
      } catch (e) {
        console.error(`Error migrating chatbot knowledge:`, e.message);
        stats.errors++;
      }
    }

    // --------------------------------------------------------------------------
    // 14. Migrate Contact Enquiries
    // --------------------------------------------------------------------------
    console.log('[Migrating] Contact Enquiries...');
    const enquiryDocs = await db.collection('contactenquiries').find({}).toArray();
    for (const doc of enquiryDocs) {
      try {
        const id = doc._id.toString();
        await mysqlConn.execute(
          `INSERT INTO \`contact_enquiries\` (
            \`id\`, \`name\`, \`email\`, \`phone\`, \`subject\`, \`message\`,
            \`is_read\`, \`status\`, \`admin_notes\`, \`ip_address\`, \`created_at\`, \`updated_at\`
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE \`status\` = VALUES(\`status\`)`,
          [
            id,
            doc.name || '',
            doc.email || '',
            doc.phone || '',
            doc.subject || 'General Enquiry',
            doc.message || '',
            doc.isRead ? 1 : 0,
            doc.status || 'new',
            doc.adminNotes || '',
            doc.ipAddress || '',
            formatDate(doc.createdAt) || formatDate(new Date()),
            formatDate(doc.updatedAt) || formatDate(new Date()),
          ]
        );
        stats.contactEnquiries++;
      } catch (e) {
        console.error(`Error migrating enquiry ${doc.name}:`, e.message);
        stats.errors++;
      }
    }

    // --------------------------------------------------------------------------
    // 15. Migrate Activity Logs
    // --------------------------------------------------------------------------
    console.log('[Migrating] Activity Logs...');
    const logDocs = await db.collection('activitylogs').find({}).toArray();
    for (const doc of logDocs) {
      try {
        const id = doc._id.toString();
        await mysqlConn.execute(
          `INSERT INTO \`activity_logs\` (\`id\`, \`admin_id\`, \`admin_email\`, \`action\`, \`resource\`, \`resource_id\`, \`details\`, \`ip_address\`, \`created_at\`)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE \`details\` = VALUES(\`details\`)`,
          [
            id,
            doc.adminId ? doc.adminId.toString() : null,
            doc.adminEmail || 'system',
            doc.action || 'CREATE',
            doc.resource || 'GENERAL',
            doc.resourceId || '',
            doc.details || '',
            doc.ipAddress || '',
            formatDate(doc.createdAt) || formatDate(new Date()),
          ]
        );
        stats.activityLogs++;
      } catch (e) {
        console.error(`Error migrating activity log:`, e.message);
        stats.errors++;
      }
    }

    await mysqlConn.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('\n====================================================');
    console.log('       MONGODB TO MYSQL MIGRATION SUMMARY');
    console.log('====================================================');
    console.log(`Admins migrated:            ${stats.admins}`);
    console.log(`Site Settings migrated:     ${stats.siteSettings}`);
    console.log(`Hero Banners migrated:      ${stats.heroBanners}`);
    console.log(`Satsangs migrated:          ${stats.satsangs}`);
    console.log(`Notices migrated:           ${stats.notices}`);
    console.log(`Events migrated:            ${stats.events}`);
    console.log(`Ashram Adhesh migrated:     ${stats.adhesh}`);
    console.log(`Videos migrated:            ${stats.videos}`);
    console.log(`Audios migrated:            ${stats.audios}`);
    console.log(`Galleries migrated:         ${stats.galleries}`);
    console.log(`Gallery Photos migrated:    ${stats.galleryPhotos}`);
    console.log(`Documents migrated:         ${stats.documents}`);
    console.log(`Posts migrated:             ${stats.posts}`);
    console.log(`Post Gallery Images:        ${stats.postGalleryImages}`);
    console.log(`FAQs migrated:              ${stats.faqs}`);
    console.log(`Chatbot Knowledge migrated: ${stats.chatbotKnowledge}`);
    console.log(`Contact Enquiries migrated: ${stats.contactEnquiries}`);
    console.log(`Activity Logs migrated:     ${stats.activityLogs}`);
    console.log(`Errors:                     ${stats.errors}`);
    console.log('====================================================\n');
    console.log('✅ Migration process completed successfully without modifying MongoDB data.');
  } finally {
    if (mysqlConn) await mysqlConn.end();
    await mongoose.disconnect();
  }
}

runMigration().catch((err) => {
  console.error('[Fatal Migration Error]:', err);
  process.exit(1);
});
