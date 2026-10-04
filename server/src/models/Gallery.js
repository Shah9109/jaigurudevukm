import { BaseRepository } from './BaseRepository.js';
import { query, isDbConnected } from '../config/db.js';

class GalleryRepository extends BaseRepository {
  constructor() {
    super('galleries', {}, []);
  }

  hydrate(row) {
    const doc = super.hydrate(row);
    if (!doc) return null;
    if (doc.isFeatured !== undefined) doc.isFeatured = Boolean(doc.isFeatured);
    if (!doc.photos) doc.photos = [];
    return doc;
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
