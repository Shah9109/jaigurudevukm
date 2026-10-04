import { Video } from '../models/Video.js';
import { Audio } from '../models/Audio.js';
import { Gallery } from '../models/Gallery.js';
import { sendSuccess, sendError, sendPaginated } from '../utils/apiResponse.js';
import { fetchFullYouTubeData, getCachedYouTubeData } from '../services/youtubeScraper.js';
import { checkLiveStreamRealTime, syncRealTimeYouTubeData } from '../services/youtubeApiService.js';

// YouTube Channel Data Cache
let cachedChannelData = getCachedYouTubeData();
let lastChannelFetchTime = cachedChannelData ? Date.now() : 0;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes TTL for real-time freshness

const DEFAULT_CHANNEL_DATA = {
  channelInfo: {
    title: 'Jaigurudev UKM Official',
    handle: '@Jaigurudevukm',
    customUrl: 'https://www.youtube.com/@Jaigurudevukm',
    subscribers: '1.25M+ Devotees',
    videosCount: '7,180+ Videos',
    avatar: '/images/baba_jaigurudev.jpg',
    maharajAvatar: '/images/maharaj_ji.jpg',
    description: 'जयगुरुदेव धर्म प्रचारक संस्था का आधिकारिक यूट्यूब मंच। परम संत बाबा उमाकान्त जी महाराज के नित्य पावन सत्संग, नामदान, आरती एवं शाकाहार संदेशों का पावन प्रसारण।',
    bannerUrl: '/images/sant_vanshavali.jpg'
  },
  featured: {
    videoId: '4yhuGRpLSN4',
    title: 'Satsang | 27.09.2026 | Morning 8 AM | Baba Jaigurudev Ashram, Rajni Vihar, Jaipur, RJ',
    description: 'सतना-चित्रकूट व उज्जैन पावन भूमि पर आयोजित विशाल सत्संग समारोह में पूज्य महाराज जी द्वारा मानव जीवन के कल्याण, शाकाहार और प्रभु प्राप्ति की साधना का दिव्य उपदेश।',
    thumbnail: 'https://i.ytimg.com/vi/4yhuGRpLSN4/maxresdefault.jpg',
    publishedDate: '27 Sep 2026',
    views: '17K+ views',
    duration: '1:45:20'
  },
  videos: [],
  shorts: [],
  streams: [],
  playlists: []
};

// Return the complete YouTube channel data with all tabs
export const getYouTubeChannelData = async (req, res, next) => {
  try {
    const now = Date.now();
    // 1. If in-memory cache is fresh, return immediately
    if (cachedChannelData && now - lastChannelFetchTime < CACHE_TTL_MS) {
      return sendSuccess(res, 'YouTube channel data (in-memory cached)', cachedChannelData);
    }

    // 2. If memory cache was empty, try reading disk cache
    if (!cachedChannelData) {
      const diskData = getCachedYouTubeData();
      if (diskData && (diskData.videos?.length > 0 || diskData.shorts?.length > 0)) {
        cachedChannelData = diskData;
        lastChannelFetchTime = now;
        return sendSuccess(res, 'YouTube channel data (disk cached)', cachedChannelData);
      }
    }

    // 3. Try official YouTube Data API v3 first
    try {
      const apiData = await syncRealTimeYouTubeData();
      if (apiData && (apiData.videos?.length > 0 || apiData.shorts?.length > 0)) {
        cachedChannelData = apiData;
        lastChannelFetchTime = now;
        return sendSuccess(res, 'YouTube channel data retrieved via Official API v3', cachedChannelData);
      }
    } catch (apiErr) {
      console.warn('[YouTube Controller] API v3 sync failed, attempting scraper fallback:', apiErr.message);
    }

    // 4. Otherwise fallback to YouTube Scraper
    try {
      const freshData = await fetchFullYouTubeData();
      if (freshData && (freshData.videos?.length > 0 || freshData.shorts?.length > 0)) {
        cachedChannelData = freshData;
        lastChannelFetchTime = now;
        return sendSuccess(res, 'YouTube channel data retrieved freshly (scraper)', cachedChannelData);
      }
    } catch (e) {
      console.warn('[YouTube Controller] Scraper fetch failed, using fallback:', e.message);
    }

    // 5. Ultimate fallback if both external calls failed
    const fallback = cachedChannelData || getCachedYouTubeData() || DEFAULT_CHANNEL_DATA;
    return sendSuccess(res, 'YouTube channel data retrieved', fallback);
  } catch (error) {
    next(error);
  }
};

// Explicit refresh endpoint
export const refreshYouTubeChannelData = async (req, res, next) => {
  try {
    let freshData = null;
    try {
      freshData = await syncRealTimeYouTubeData();
    } catch (e) {
      console.warn('[YouTube Controller] API refresh failed, trying scraper:', e.message);
    }

    if (!freshData) {
      freshData = await fetchFullYouTubeData();
    }

    cachedChannelData = freshData;
    lastChannelFetchTime = Date.now();
    return sendSuccess(res, 'YouTube channel data refreshed successfully in real-time', {
      source: process.env.YOUTUBE_API_KEY ? 'Official YouTube Data API v3' : 'Scraper',
      videosCount: freshData.videos?.length || 0,
      shortsCount: freshData.shorts?.length || 0,
      streamsCount: freshData.streams?.length || 0,
      playlistsCount: freshData.playlists?.length || 0
    });
  } catch (error) {
    next(error);
  }
};

// Real-time live check cache
let cachedLiveStatus = null;
let lastLiveCheckTime = 0;
const LIVE_CHECK_TTL_MS = 60 * 1000; // 1 minute fresh check

export const getLiveNowStatus = async (req, res, next) => {
  try {
    const now = Date.now();
    if (cachedLiveStatus && now - lastLiveCheckTime < LIVE_CHECK_TTL_MS) {
      return sendSuccess(res, 'Live status (cached)', cachedLiveStatus);
    }

    // 1. Try Official YouTube Data API v3 check
    try {
      const apiLive = await checkLiveStreamRealTime();
      if (apiLive) {
        cachedLiveStatus = {
          isLiveNow: Boolean(apiLive.isLiveNow),
          videoId: apiLive.videoId || 'o9KlOqURRzU',
          title: apiLive.title || 'परम पूज्य बाबा उमाकान्त जी महाराज — लाइव सत्संग प्रसारण',
          thumbnail: apiLive.thumbnail || 'https://i.ytimg.com/vi/o9KlOqURRzU/hqdefault.jpg',
          streamUrl: apiLive.streamUrl || 'https://www.youtube.com/@Jaigurudevukm/live',
          channelUrl: 'https://www.youtube.com/@Jaigurudevukm/streams',
          checkedVia: 'YouTube Data API v3'
        };
        lastLiveCheckTime = now;
        return sendSuccess(res, 'Real-time live stream status retrieved (API v3)', cachedLiveStatus);
      }
    } catch (err) {
      console.warn('[YouTube Controller] API live check failed, using fallback scraper:', err.message);
    }

    // 2. Fallback to HTML header check
    let isLiveNow = false;
    let liveVideoId = null;
    let liveTitle = 'परम पूज्य बाबा उमाकान्त जी महाराज — लाइव सत्संग प्रसारण';

    try {
      const liveRes = await fetch('https://www.youtube.com/@Jaigurudevukm/live', {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        signal: AbortSignal.timeout(6000)
      });

      if (liveRes.ok) {
        const html = await liveRes.text();
        isLiveNow = html.includes('"style":"LIVE"') || html.includes('"label":"LIVE"') || html.includes('"isLive":true');
        
        const videoIdMatches = [...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map(m => m[1]);
        if (videoIdMatches.length > 0) {
          liveVideoId = videoIdMatches[0];
        }

        const titleMatch = html.match(/<title>(.*?)<\/title>/);
        if (titleMatch && titleMatch[1]) {
          liveTitle = titleMatch[1].replace(' - YouTube', '').trim();
        }
      }
    } catch (e) {
      console.log('Live check fallback active:', e.message);
    }

    cachedLiveStatus = {
      isLiveNow,
      videoId: liveVideoId || 'o9KlOqURRzU',
      title: liveTitle,
      thumbnail: liveVideoId ? `https://i.ytimg.com/vi/${liveVideoId}/hqdefault.jpg` : 'https://i.ytimg.com/vi/o9KlOqURRzU/hqdefault.jpg',
      streamUrl: liveVideoId ? `https://www.youtube.com/watch?v=${liveVideoId}` : 'https://www.youtube.com/@Jaigurudevukm/live',
      channelUrl: 'https://www.youtube.com/@Jaigurudevukm/streams',
      checkedVia: 'Scraper Fallback'
    };

    lastLiveCheckTime = now;
    return sendSuccess(res, 'Real-time live stream status retrieved', cachedLiveStatus);
  } catch (error) {
    next(error);
  }
};

// Fetch streams endpoint (strictly latest 10 videos/streams from today backwards)
export const getYouTubeStreams = async (req, res, next) => {
  try {
    const data = cachedChannelData || getCachedYouTubeData() || DEFAULT_CHANNEL_DATA;
    const map = new Map();
    const allItems = [...(data.videos || []), ...(data.streams || [])];

    for (const item of allItems) {
      const vid = item.videoId || item.id;
      if (!vid) continue;
      if (!map.has(vid)) {
        map.set(vid, item);
      } else {
        const existing = map.get(vid);
        if (!existing.publishedAt && item.publishedAt) {
          map.set(vid, item);
        }
      }
    }

    const sorted = Array.from(map.values())
      .filter((v) => v.publishedAt)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    const top10 = (sorted.length > 0 ? sorted.slice(0, 10) : (data.streams || []).slice(0, 10)).map((item) => {
      const pubDate = item.publishedAt ? new Date(item.publishedAt) : null;
      let formattedDate = item.publishedDate || item.date || '';
      if (pubDate && !isNaN(pubDate.getTime())) {
        try {
          formattedDate = pubDate.toLocaleDateString('hi-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            timeZone: 'Asia/Kolkata',
          });
        } catch (e) {
          formattedDate = pubDate.toISOString().split('T')[0];
        }
      }
      return {
        ...item,
        id: item.videoId || item.id,
        videoId: item.videoId || item.id,
        formattedDate: formattedDate || 'हालिया सत्संग',
      };
    });

    return sendSuccess(res, 'YouTube streams', top10);
  } catch (error) {
    next(error);
  }
};

// Videos
export const getVideos = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (category && category !== 'all') filter.category = category;

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Video.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      Video.countDocuments(filter),
    ]);

    if (items.length > 0) {
      return sendPaginated(res, 'Videos retrieved successfully', items, page, limit, total);
    }

    // Return rich YouTube channel videos if database collection is empty
    const data = cachedChannelData || getCachedYouTubeData() || DEFAULT_CHANNEL_DATA;
    return sendSuccess(res, 'Videos retrieved from YouTube', data.videos || []);
  } catch (error) {
    next(error);
  }
};

// Audio
export const getAudioTracks = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (category) filter.category = category;

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Audio.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      Audio.countDocuments(filter),
    ]);

    return sendPaginated(res, 'Audio tracks retrieved successfully', items, page, limit, total);
  } catch (error) {
    next(error);
  }
};

// Gallery
export const getGalleryAlbums = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (category) filter.category = category;

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Gallery.find(filter).sort({ eventDate: -1 }).skip(skip).limit(Number(limit)).lean(),
      Gallery.countDocuments(filter),
    ]);

    return sendPaginated(res, 'Gallery albums retrieved successfully', items, page, limit, total);
  } catch (error) {
    next(error);
  }
};

export const getGalleryAlbumBySlugOrId = async (req, res, next) => {
  try {
    const { slugOrId } = req.params;
    let album = await Gallery.findOne({ slug: slugOrId }).lean();
    if (!album && slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
      album = await Gallery.findById(slugOrId).lean();
    }
    if (!album) {
      return sendError(res, 'Gallery album not found', 404);
    }
    return sendSuccess(res, 'Gallery album retrieved', album);
  } catch (error) {
    next(error);
  }
};
