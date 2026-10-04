import { BaseRepository } from './BaseRepository.js';

class DocumentRepository extends BaseRepository {
  constructor() {
    super('documents', {}, []);
  }

  hydrate(row) {
    const doc = super.hydrate(row);
    if (!doc) return null;
    if (doc.isDownloadable !== undefined) doc.isDownloadable = Boolean(doc.isDownloadable);
    if (doc.isFeatured !== undefined) doc.isFeatured = Boolean(doc.isFeatured);
    return doc;
  }
}

export const Document = new DocumentRepository();
