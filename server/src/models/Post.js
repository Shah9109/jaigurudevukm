import { BaseRepository } from './BaseRepository.js';
import { query, isDbConnected } from '../config/db.js';

class PostRepository extends BaseRepository {
  constructor() {
    super('posts', {}, []);
  }

  hydrate(row) {
    const doc = super.hydrate(row);
    if (!doc) return null;

    if (!doc.seo) {
      doc.seo = {
        title: doc.seoTitle || doc.title || '',
        description: doc.seoDescription || doc.shortDescription || '',
        keywords: doc.seoKeywords ? (typeof doc.seoKeywords === 'string' ? doc.seoKeywords.split(',') : doc.seoKeywords) : [],
        canonicalUrl: doc.seoCanonicalUrl || '',
        ogImage: doc.seoOgImage || doc.featuredImage || '',
      };
    }

    if (doc.featured !== undefined) doc.featured = Boolean(doc.featured);
    if (doc.isExternalLink !== undefined) doc.isExternalLink = Boolean(doc.isExternalLink);
    if (!doc.gallery) doc.gallery = [];

    return doc;
  }

  async findOne(filter = {}) {
    const doc = await super.findOne(filter);
    if (doc && isDbConnected()) {
      try {
        const galleryRows = await query(
          'SELECT * FROM `post_gallery_images` WHERE `post_id` = ? ORDER BY `display_order` ASC',
          [doc.id]
        );
        doc.gallery = (galleryRows || []).map((g) => ({
          id: g.id,
          url: g.url,
          caption: g.caption || '',
        }));
      } catch (e) {}
    }
    return doc;
  }
}

export const Post = new PostRepository();
