import { BaseRepository } from './BaseRepository.js';

class VideoRepository extends BaseRepository {
  constructor() {
    super('videos', {}, []);
  }

  hydrate(row) {
    const doc = super.hydrate(row);
    if (!doc) return null;
    if (doc.isFeatured !== undefined) doc.isFeatured = Boolean(doc.isFeatured);
    return doc;
  }

  async create(data) {
    const videoData = { ...data };
    if ((!videoData.videoType || videoData.videoType === 'youtube') && videoData.videoUrl && !videoData.youtubeId) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = videoData.videoUrl.match(regExp);
      if (match && match[2].length === 11) {
        videoData.youtubeId = match[2];
        if (!videoData.thumbnailUrl) {
          videoData.thumbnailUrl = `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
        }
      }
    }
    return super.create(videoData);
  }
}

export const Video = new VideoRepository();
