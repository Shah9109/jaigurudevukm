import mongoose from 'mongoose';

const bannerItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  imageUrl: { type: String, required: true },
  ctaText: { type: String, default: 'Learn More' },
  ctaLink: { type: String, default: '/about' },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
});

const siteSettingsSchema = new mongoose.Schema(
  {
    organizationName: {
      type: String,
      default: 'जयगुरुदेव धर्म प्रचारक संस्था (Jaigurudev Sanstha)',
    },
    tagline: {
      type: String,
      default: 'सत्य, दया, धर्म और नाम-साधना का पावन मार्ग',
    },
    logoUrl: {
      type: String,
      default: '/logo.svg',
    },
    announcementBar: {
      enabled: { type: Boolean, default: true },
      text: { type: String, default: 'श्री कृष्ण जन्माष्टमी पावन सत्संग कार्यक्रम — आगरा (Agra) में 2 से 4 तक आयोजित।' },
      link: { type: String, default: '/satsang' },
      isEmergency: { type: Boolean, default: false },
    },
    heroBanners: [bannerItemSchema],
    contactInfo: {
      phone: { type: String, default: '+91-9754700200' },
      emergencyPhone: { type: String, default: '+91-9575600700' },
      email: { type: String, default: 'contact@jaigurudev.org' },
      address: { type: String, default: 'Baba Jaigurudev Ashram, Opposite Pingleshvar Railway Station, Maksi Road' },
      city: { type: String, default: 'Ujjain' },
      state: { type: String, default: 'Madhya Pradesh' },
      pincode: { type: String, default: '456001' },
      mapsEmbedUrl: { type: String, default: 'https://maps.google.com' },
      officeHours: { type: String, default: 'Daily 06:00 AM – 08:00 PM' },
    },
    socialLinks: {
      youtube: { type: String, default: 'https://www.youtube.com/c/jaigurudevukm' },
      facebook: { type: String, default: 'https://facebook.com' },
      instagram: { type: String, default: 'https://instagram.com' },
      twitter: { type: String, default: 'https://x.com' },
      telegram: { type: String, default: 'https://telegram.org' },
      whatsapp: { type: String, default: 'https://whatsapp.com/channel/0029VaAcAA40QeadmEmp9y3c' },
    },
    footer: {
      aboutShort: {
        type: String,
        default: 'Jaigurudev Sanstha is dedicated to spiritual upliftment, humanitarian service, vegetarianism, and righteous living under the divine guidance of the Master.',
      },
      disclaimer: {
        type: String,
        default: 'Official informational portal of Jaigurudev Sanstha. No registration fee is charged for attending public Satsang.',
      },
      copyrightText: {
        type: String,
        default: '© 2026 Jaigurudev Sanstha. All rights reserved.',
      },
    },
    homepageSections: {
      announcementBar: { type: Boolean, default: true },
      heroSlider: { type: Boolean, default: true },
      welcomeMessage: { type: Boolean, default: true },
      upcomingSatsang: { type: Boolean, default: true },
      upcomingEvents: { type: Boolean, default: true },
      importantNotices: { type: Boolean, default: true },
      ashramAdhesh: { type: Boolean, default: true },
      featuredVideos: { type: Boolean, default: true },
      audioPlayer: { type: Boolean, default: true },
      photoGallery: { type: Boolean, default: true },
      appPromotion: { type: Boolean, default: true },
      contactSection: { type: Boolean, default: true },
    },
    appConfig: {
      androidApkUrl: { type: String, default: '/downloads/jaigurudev-sadhana.apk' },
      apkVersion: { type: String, default: '1.0.0' },
      appPromoTitle: { type: String, default: 'Download Jaigurudev Sadhana App' },
      appPromoSubtitle: { type: String, default: 'Your daily companion for Naam-Dhyan, spiritual alarms, timer, and daily reports.' },
    },
  },
  {
    timestamps: true,
  }
);

export const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);
