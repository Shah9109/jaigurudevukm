import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BaseRepository } from './BaseRepository.js';
import { query, isDbConnected } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SETTINGS_CACHE_PATH = path.join(__dirname, '../data/siteSettings.json');

const DEFAULT_SETTINGS = {
  id: 'default',
  _id: 'default',
  organizationName: 'जयगुरुदेव धर्म प्रचारक संस्था (Jaigurudev Sanstha)',
  tagline: 'सत्य, दया, धर्म और नाम-साधना का पावन मार्ग',
  logoUrl: '/logo.svg',
  announcementBar: {
    enabled: true,
    text: 'श्री कृष्ण जन्माष्टमी पावन सत्संग कार्यक्रम — आगरा (Agra) में 2 से 4 तक आयोजित।',
    link: '/satsang',
    isEmergency: false,
  },
  heroBanners: [
    {
      id: 'banner-001',
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
    phone: '+91-9754700200',
    emergencyPhone: '+91-9575600700',
    email: 'contact@jaigurudev.org',
    address: 'बाबा जयगुरुदेव आश्रम, पिंगलेश्वर रेलवे स्टेशन के सामने, मक्सी रोड',
    city: 'उज्जैन',
    state: 'मध्य प्रदेश',
    pincode: '456001',
    mapsEmbedUrl: 'https://maps.google.com',
    officeHours: 'Daily 06:00 AM – 08:00 PM',
  },
  socialLinks: {
    youtube: 'https://www.youtube.com/c/jaigurudevukm',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://x.com',
    telegram: 'https://telegram.org',
    whatsapp: 'https://whatsapp.com/channel/0029VaAcAA40QeadmEmp9y3c',
  },
  footer: {
    aboutShort: 'Jaigurudev Sanstha is dedicated to spiritual upliftment, humanitarian service, vegetarianism, and righteous living under the divine guidance of the Master.',
    disclaimer: 'Official informational portal of Jaigurudev Sanstha. No registration fee is charged for attending public Satsang.',
    copyrightText: '© 2026 Jaigurudev Sanstha. All rights reserved.',
  },
  homepageSections: {
    announcementBar: true,
    heroSlider: true,
    welcomeMessage: true,
    upcomingSatsang: true,
    upcomingEvents: true,
    importantNotices: true,
    ashramAdhesh: true,
    featuredVideos: true,
    audioPlayer: false,
    photoGallery: true,
    appPromotion: true,
    contactSection: true,
  },
  appConfig: {
    androidApkUrl: '/downloads/jaigurudev-sadhana.apk',
    apkVersion: '1.0.0',
    appPromoTitle: 'Download Jaigurudev Sadhana App',
    appPromoSubtitle: 'Your daily companion for Naam-Dhyan, spiritual alarms, timer, and daily reports.',
  },
};

const loadCachedSettings = () => {
  try {
    if (fs.existsSync(SETTINGS_CACHE_PATH)) {
      const raw = fs.readFileSync(SETTINGS_CACHE_PATH, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          announcementBar: {
            ...DEFAULT_SETTINGS.announcementBar,
            ...(parsed.announcementBar || {}),
          },
          contactInfo: {
            ...DEFAULT_SETTINGS.contactInfo,
            ...(parsed.contactInfo || {}),
          },
          homepageSections: {
            ...DEFAULT_SETTINGS.homepageSections,
            ...(parsed.homepageSections || {}),
          },
        };
      }
    }
  } catch (e) {
    console.warn('[SiteSettings] Failed to load cached settings:', e.message);
  }
  return { ...DEFAULT_SETTINGS };
};

const saveCachedSettings = (settingsData) => {
  try {
    const dir = path.dirname(SETTINGS_CACHE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(SETTINGS_CACHE_PATH, JSON.stringify(settingsData, null, 2), 'utf8');
  } catch (e) {
    console.warn('[SiteSettings] Failed to save settings to disk:', e.message);
  }
};

class SiteSettingsRepository extends BaseRepository {
  constructor() {
    const initial = loadCachedSettings();
    super('site_settings', {}, [initial]);
  }

  hydrate(row) {
    if (!row) return null;
    const doc = super.hydrate(row);

    // Reconstruct nested structure
    let hpSections = doc.homepageSections || doc.homepage_sections;
    if (typeof hpSections === 'string') {
      try {
        hpSections = JSON.parse(hpSections);
      } catch (e) {
        hpSections = DEFAULT_SETTINGS.homepageSections;
      }
    }

    const existingAb = doc.announcementBar || {};
    doc.announcementBar = {
      enabled: doc.announcementBarEnabled !== undefined
        ? Boolean(doc.announcementBarEnabled)
        : (doc.announcement_bar_enabled !== undefined
            ? Boolean(doc.announcement_bar_enabled)
            : (existingAb.enabled !== undefined ? Boolean(existingAb.enabled) : DEFAULT_SETTINGS.announcementBar.enabled)),
      text: doc.announcementBarText || doc.announcement_bar_text || existingAb.text || DEFAULT_SETTINGS.announcementBar.text,
      link: doc.announcementBarLink || doc.announcement_bar_link || existingAb.link || DEFAULT_SETTINGS.announcementBar.link,
      isEmergency: doc.announcementBarIsEmergency !== undefined
        ? Boolean(doc.announcementBarIsEmergency)
        : (doc.announcement_bar_is_emergency !== undefined
            ? Boolean(doc.announcement_bar_is_emergency)
            : Boolean(existingAb.isEmergency)),
    };

    doc.contactInfo = doc.contactInfo || {
      phone: doc.contactPhone || DEFAULT_SETTINGS.contactInfo.phone,
      emergencyPhone: doc.contactEmergencyPhone || DEFAULT_SETTINGS.contactInfo.emergencyPhone,
      email: doc.contactEmail || DEFAULT_SETTINGS.contactInfo.email,
      address: doc.contactAddress || DEFAULT_SETTINGS.contactInfo.address,
      city: doc.contactCity || DEFAULT_SETTINGS.contactInfo.city,
      state: doc.contactState || DEFAULT_SETTINGS.contactInfo.state,
      pincode: doc.contactPincode || DEFAULT_SETTINGS.contactInfo.pincode,
      mapsEmbedUrl: doc.contactMapsEmbedUrl || DEFAULT_SETTINGS.contactInfo.mapsEmbedUrl,
      officeHours: doc.contactOfficeHours || DEFAULT_SETTINGS.contactInfo.officeHours,
    };

    doc.socialLinks = doc.socialLinks || {
      youtube: doc.socialYoutube || DEFAULT_SETTINGS.socialLinks.youtube,
      facebook: doc.socialFacebook || DEFAULT_SETTINGS.socialLinks.facebook,
      instagram: doc.socialInstagram || DEFAULT_SETTINGS.socialLinks.instagram,
      twitter: doc.socialTwitter || DEFAULT_SETTINGS.socialLinks.twitter,
      telegram: doc.socialTelegram || DEFAULT_SETTINGS.socialLinks.telegram,
      whatsapp: doc.socialWhatsapp || DEFAULT_SETTINGS.socialLinks.whatsapp,
    };

    doc.footer = doc.footer || {
      aboutShort: doc.footerAboutShort || DEFAULT_SETTINGS.footer.aboutShort,
      disclaimer: doc.footerDisclaimer || DEFAULT_SETTINGS.footer.disclaimer,
      copyrightText: doc.footerCopyrightText || DEFAULT_SETTINGS.footer.copyrightText,
    };

    doc.appConfig = doc.appConfig || {
      androidApkUrl: doc.appAndroidApkUrl || DEFAULT_SETTINGS.appConfig.androidApkUrl,
      apkVersion: doc.appApkVersion || DEFAULT_SETTINGS.appConfig.apkVersion,
      appPromoTitle: doc.appPromoTitle || DEFAULT_SETTINGS.appConfig.appPromoTitle,
      appPromoSubtitle: doc.appPromoSubtitle || DEFAULT_SETTINGS.appConfig.appPromoSubtitle,
    };

    doc.homepageSections = hpSections || DEFAULT_SETTINGS.homepageSections;
    doc.heroBanners = doc.heroBanners || DEFAULT_SETTINGS.heroBanners;

    return doc;
  }

  async findOne(filter = {}) {
    const doc = await super.findOne(filter);
    if (doc) {
      if (isDbConnected()) {
        try {
          const banners = await query(
            'SELECT * FROM `hero_banners` WHERE `settings_id` = ? ORDER BY `display_order` ASC',
            [doc.id || 'default']
          );
          if (banners && banners.length > 0) {
            doc.heroBanners = banners.map((b) => ({
              id: b.id,
              title: b.title,
              subtitle: b.subtitle,
              imageUrl: b.image_url,
              ctaText: b.cta_text,
              ctaLink: b.cta_link,
              order: b.display_order,
              active: Boolean(b.is_active),
            }));
          }
        } catch (e) {}
      }
      return doc;
    }
    return this.hydrate(loadCachedSettings());
  }

  async updateSettings(body) {
    let settings = await this.findOne();
    if (!settings) {
      settings = await this.create({ ...DEFAULT_SETTINGS, ...body, id: 'default' });
      saveCachedSettings(settings);
      return settings;
    }

    const updated = {
      ...settings,
      ...body,
      announcementBar: {
        ...(settings.announcementBar || DEFAULT_SETTINGS.announcementBar),
        ...(body.announcementBar || {}),
      },
      contactInfo: {
        ...(settings.contactInfo || DEFAULT_SETTINGS.contactInfo),
        ...(body.contactInfo || {}),
      },
      socialLinks: {
        ...(settings.socialLinks || DEFAULT_SETTINGS.socialLinks),
        ...(body.socialLinks || {}),
      },
      footer: {
        ...(settings.footer || DEFAULT_SETTINGS.footer),
        ...(body.footer || {}),
      },
      homepageSections: {
        ...(settings.homepageSections || DEFAULT_SETTINGS.homepageSections),
        ...(body.homepageSections || {}),
      },
      appConfig: {
        ...(settings.appConfig || DEFAULT_SETTINGS.appConfig),
        ...(body.appConfig || {}),
      },
    };

    if (isDbConnected()) {
      const flat = {};
      if (body.organizationName) flat.organization_name = body.organizationName;
      if (body.tagline) flat.tagline = body.tagline;
      if (body.logoUrl) flat.logo_url = body.logoUrl;

      if (body.announcementBar) {
        if (body.announcementBar.enabled !== undefined) flat.announcement_bar_enabled = body.announcementBar.enabled ? 1 : 0;
        if (body.announcementBar.text !== undefined) flat.announcement_bar_text = body.announcementBar.text;
        if (body.announcementBar.link !== undefined) flat.announcement_bar_link = body.announcementBar.link;
        if (body.announcementBar.isEmergency !== undefined) flat.announcement_bar_is_emergency = body.announcementBar.isEmergency ? 1 : 0;
      }

      if (body.contactInfo) {
        if (body.contactInfo.phone) flat.contact_phone = body.contactInfo.phone;
        if (body.contactInfo.emergencyPhone) flat.contact_emergency_phone = body.contactInfo.emergencyPhone;
        if (body.contactInfo.email) flat.contact_email = body.contactInfo.email;
        if (body.contactInfo.address) flat.contact_address = body.contactInfo.address;
        if (body.contactInfo.city) flat.contact_city = body.contactInfo.city;
        if (body.contactInfo.state) flat.contact_state = body.contactInfo.state;
        if (body.contactInfo.pincode) flat.contact_pincode = body.contactInfo.pincode;
        if (body.contactInfo.mapsEmbedUrl) flat.contact_maps_embed_url = body.contactInfo.mapsEmbedUrl;
        if (body.contactInfo.officeHours) flat.contact_office_hours = body.contactInfo.officeHours;
      }

      if (body.socialLinks) {
        if (body.socialLinks.youtube) flat.social_youtube = body.socialLinks.youtube;
        if (body.socialLinks.facebook) flat.social_facebook = body.socialLinks.facebook;
        if (body.socialLinks.instagram) flat.social_instagram = body.socialLinks.instagram;
        if (body.socialLinks.twitter) flat.social_twitter = body.socialLinks.twitter;
        if (body.socialLinks.telegram) flat.social_telegram = body.socialLinks.telegram;
        if (body.socialLinks.whatsapp) flat.social_whatsapp = body.socialLinks.whatsapp;
      }

      if (body.homepageSections) {
        flat.homepage_sections = JSON.stringify(body.homepageSections);
      }

      await this.findByIdAndUpdate(settings.id || 'default', flat);
    }

    // Update in-memory fallback
    const idx = this.fallbackItems.findIndex((i) => i.id === (settings.id || 'default') || i._id === (settings.id || 'default'));
    if (idx !== -1) {
      this.fallbackItems[idx] = updated;
    } else {
      this.fallbackItems.unshift(updated);
    }

    // Persist to disk
    saveCachedSettings(updated);

    return updated;
  }
}

export const SiteSettings = new SiteSettingsRepository();
