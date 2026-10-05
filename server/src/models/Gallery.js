import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BaseRepository } from './BaseRepository.js';
import { query, isDbConnected } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const GALLERY_CACHE_PATH = path.join(__dirname, '../data/galleryCache.json');

const DEFAULT_GALLERY_PHOTOS = [
  {
    id: 'gallery-001',
    _id: 'gallery-001',
    title: 'बाबा जयगुरुदेव आश्रम उज्जैन प्रांगण दर्शन',
    caption: 'बाबा जयगुरुदेव आश्रम उज्जैन प्रांगण दर्शन',
    url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
    category: 'Ashram Darshan',
    eventDate: '2026-08-15',
    description: 'उज्जैन मुख्य आश्रम का पावन एवं भव्य दृश्य।',
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'gallery-002',
    _id: 'gallery-002',
    title: 'वार्षिक पावन भंडारा संत समागम',
    caption: 'वार्षिक पावन भंडारा संत समागम',
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    category: 'Bhandara & Utsav',
    eventDate: '2026-07-21',
    description: 'देश-विदेश से पधारे लाखों श्रद्धालुओं का अखंड लंगर एवं भंडारा प्रसाद।',
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'gallery-003',
    _id: 'gallery-003',
    title: 'प्रातः कालीन नाम-साधना एवं आरती',
    caption: 'प्रातः कालीन नाम-साधना एवं आरती',
    url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    category: 'Satsang Samagam',
    eventDate: '2026-09-01',
    description: 'संत वचनों के श्रवण एवं ध्यान-भजन में लीन साधक संगत।',
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'gallery-004',
    _id: 'gallery-004',
    title: 'जीव दया एवं शाकाहार रथ यात्रा',
    caption: 'जीव दया एवं शाकाहार रथ यात्रा',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
    category: 'Seva & Charity',
    eventDate: '2026-06-10',
    description: 'जन-जन में शाकाहार और नशामुक्ति का पावन संदेश फैलाने वाली रथ यात्रा।',
    isFeatured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'gallery-005',
    _id: 'gallery-005',
    title: 'शांति निकेतन ध्यान कक्ष',
    caption: 'शांति निकेतन ध्यान कक्ष',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    category: 'Ashram Darshan',
    eventDate: '2026-05-18',
    description: 'सुरत-शब्द योग नाम-साधना का अत्यंत शांत एवं पवित्र ध्यान कक्ष।',
    isFeatured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'gallery-006',
    _id: 'gallery-006',
    title: 'विशाल जनसमूह अमृत सत्संग श्रवण',
    caption: 'विशाल जनसमूह अमृत सत्संग श्रवण',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    category: 'Satsang Samagam',
    eventDate: '2026-04-12',
    description: 'पूज्य महाराज जी के अमृत वचनों को एकाग्रचित्त होकर सुनते श्रद्धालु।',
    isFeatured: false,
    createdAt: new Date().toISOString(),
  },
];

const loadCachedGallery = () => {
  try {
    if (fs.existsSync(GALLERY_CACHE_PATH)) {
      const raw = fs.readFileSync(GALLERY_CACHE_PATH, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('[Gallery] Failed to load cached gallery:', e.message);
  }
  return DEFAULT_GALLERY_PHOTOS;
};

const saveCachedGallery = (items) => {
  try {
    const dir = path.dirname(GALLERY_CACHE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(GALLERY_CACHE_PATH, JSON.stringify(items, null, 2), 'utf8');
  } catch (e) {
    console.warn('[Gallery] Failed to save gallery to disk:', e.message);
  }
};

class GalleryRepository extends BaseRepository {
  constructor() {
    const initial = loadCachedGallery();
    super('galleries', {}, initial);
  }

  hydrate(row) {
    const doc = super.hydrate(row);
    if (!doc) return null;
    if (doc.isFeatured !== undefined) doc.isFeatured = Boolean(doc.isFeatured);
    if (!doc.photos) doc.photos = [];
    if (!doc.caption && doc.title) doc.caption = doc.title;
    if (!doc.title && doc.caption) doc.title = doc.caption;
    if (!doc.url && doc.coverImage) doc.url = doc.coverImage;
    if (!doc.coverImage && doc.url) doc.coverImage = doc.url;
    return doc;
  }

  async create(data) {
    const galleryData = { ...data };
    if (!galleryData.caption && galleryData.title) galleryData.caption = galleryData.title;
    if (!galleryData.title && galleryData.caption) galleryData.title = galleryData.caption;
    if (!galleryData.url && galleryData.coverImage) galleryData.url = galleryData.coverImage;
    if (!galleryData.coverImage && galleryData.url) galleryData.coverImage = galleryData.url;
    if (!galleryData.category) galleryData.category = 'Ashram Darshan';

    const item = await super.create(galleryData);
    saveCachedGallery(this.fallbackItems);
    return item;
  }

  async findByIdAndUpdate(id, updateData, options = {}) {
    const data = { ...updateData };
    if (!data.caption && data.title) data.caption = data.title;
    if (!data.title && data.caption) data.title = data.caption;
    if (!data.url && data.coverImage) data.url = data.coverImage;
    if (!data.coverImage && data.url) data.coverImage = data.url;

    const item = await super.findByIdAndUpdate(id, data, options);
    saveCachedGallery(this.fallbackItems);
    return item;
  }

  async findByIdAndDelete(id) {
    const item = await super.findByIdAndDelete(id);
    saveCachedGallery(this.fallbackItems);
    return item;
  }

  async findOne(filter = {}) {
    const doc = await super.findOne(filter);
    if (doc && isDbConnected()) {
      try {
        const photos = await query(
          'SELECT * FROM `gallery_photos` WHERE `gallery_id` = ? ORDER BY `uploaded_at` ASC',
          [doc.id]
        );
        doc.photos = (photos || []).map((p) => ({
          id: p.id,
          _id: p.id,
          url: p.url,
          thumbnailUrl: p.thumbnail_url || p.url,
          caption: p.caption || '',
          uploadedAt: p.uploaded_at,
        }));
      } catch (e) {}
    }
    return doc;
  }
}

export const Gallery = new GalleryRepository();
