import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BaseRepository } from './BaseRepository.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VIDEOS_CACHE_PATH = path.join(__dirname, '../data/videosCache.json');

const DEFAULT_VIDEOS = [
  {
    id: 'video-001',
    _id: 'video-001',
    title: 'सेवा करने लग जाओगे तो सतसंग भी समझ आने लगेगा और भजन में भी दया होने लग जाएगी।',
    description: 'परम पूज्य बाबा उमाकान्त जी महाराज के पावन अमृत वचन।',
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=PGKVT_dwo1w',
    youtubeId: 'PGKVT_dwo1w',
    thumbnailUrl: 'https://img.youtube.com/vi/PGKVT_dwo1w/hqdefault.jpg',
    duration: '38:45',
    category: 'Satsang Discourse',
    speaker: 'परम संत बाबा उमाकान्त जी महाराज',
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'video-002',
    _id: 'video-002',
    title: 'सुरत-शब्द योग (नाम-साधना) कैसे करें — महत्वपूर्ण आध्यात्मिक निर्देश',
    description: 'मन को एकाग्र कर अंतर्मुखी होने की सरल विधि और साधक के आवश्यक नियम।',
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=DoGEHvRkdkw',
    youtubeId: 'DoGEHvRkdkw',
    thumbnailUrl: 'https://img.youtube.com/vi/DoGEHvRkdkw/hqdefault.jpg',
    duration: '26:10',
    category: 'Sadhana Guidance',
    speaker: 'परम संत बाबा उमाकान्त जी महाराज',
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'video-003',
    _id: 'video-003',
    title: 'शाकाहार ही मनुष्य का स्वाभाविक भोजन है — ऐतिहासिक संदेश',
    description: 'जीव दया, अहिंसा और स्वास्थ्य के लिए शाकाहारी जीवन शैली अपनाने का प्रेरणादायक उद्बोधन।',
    videoType: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=GTFb9YAwoz0',
    youtubeId: 'GTFb9YAwoz0',
    thumbnailUrl: 'https://img.youtube.com/vi/GTFb9YAwoz0/hqdefault.jpg',
    duration: '42:15',
    category: 'Social Reform',
    speaker: 'परम संत बाबा उमाकान्त जी महाराज',
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
];

const loadCachedVideos = () => {
  try {
    if (fs.existsSync(VIDEOS_CACHE_PATH)) {
      const raw = fs.readFileSync(VIDEOS_CACHE_PATH, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('[Video] Failed to load cached videos:', e.message);
  }
  return DEFAULT_VIDEOS;
};

const saveCachedVideos = (items) => {
  try {
    const dir = path.dirname(VIDEOS_CACHE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(VIDEOS_CACHE_PATH, JSON.stringify(items, null, 2), 'utf8');
  } catch (e) {
    console.warn('[Video] Failed to save videos to disk:', e.message);
  }
};

const extractYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

class VideoRepository extends BaseRepository {
  constructor() {
    const initial = loadCachedVideos();
    super('videos', {}, initial);
  }

  hydrate(row) {
    const doc = super.hydrate(row);
    if (!doc) return null;
    if (doc.isFeatured !== undefined) doc.isFeatured = Boolean(doc.isFeatured);
    if (!doc.thumbnailUrl && doc.youtubeId) {
      doc.thumbnailUrl = `https://img.youtube.com/vi/${doc.youtubeId}/hqdefault.jpg`;
    }
    return doc;
  }

  async create(data) {
    const videoData = { ...data };
    if (!videoData.videoType || videoData.videoType === 'youtube') {
      const ytId = extractYouTubeId(videoData.videoUrl);
      if (ytId) {
        videoData.youtubeId = ytId;
        if (!videoData.thumbnailUrl) {
          videoData.thumbnailUrl = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
        }
      }
    }
    const item = await super.create(videoData);
    saveCachedVideos(this.fallbackItems);
    return item;
  }

  async findByIdAndUpdate(id, updateData, options = {}) {
    const data = { ...updateData };
    if (data.videoUrl && (!data.videoType || data.videoType === 'youtube')) {
      const ytId = extractYouTubeId(data.videoUrl);
      if (ytId) {
        data.youtubeId = ytId;
        if (!data.thumbnailUrl) {
          data.thumbnailUrl = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
        }
      }
    }
    const item = await super.findByIdAndUpdate(id, data, options);
    saveCachedVideos(this.fallbackItems);
    return item;
  }

  async findByIdAndDelete(id) {
    const item = await super.findByIdAndDelete(id);
    saveCachedVideos(this.fallbackItems);
    return item;
  }
}

export const Video = new VideoRepository();
