import { BaseRepository } from './BaseRepository.js';

class AudioRepository extends BaseRepository {
  constructor() {
    super('audios', {}, []);
  }

  hydrate(row) {
    const doc = super.hydrate(row);
    if (!doc) return null;
    if (doc.isFeatured !== undefined) doc.isFeatured = Boolean(doc.isFeatured);
    return doc;
  }
}

export const Audio = new AudioRepository();
