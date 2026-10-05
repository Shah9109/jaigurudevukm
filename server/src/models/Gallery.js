import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BaseRepository } from './BaseRepository.js';
import { query, isDbConnected } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const GALLERY_CACHE_PATH = path.join(__dirname, '../data/galleryCache.json');

const DEFAULT_GALLERY_PHOTOS = [];

const loadCachedGallery = () => {
  try {
    if (fs.existsSync(GALLERY_CACHE_PATH)) {
      const raw = fs.readFileSync(GALLERY_CACHE_PATH, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
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
