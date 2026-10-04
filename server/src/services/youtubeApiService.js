import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/youtubeChannelData.json');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || 'AIzaSyAt_XUNS3tv6WHx1-0cde40sQmI8c7r5rk';
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCTP6TFqDUWMxobhpkFjgE0Q';
const UPLOADS_PLAYLIST_ID = process.env.YOUTUBE_UPLOADS_PLAYLIST_ID || 'UUTP6TFqDUWMxobhpkFjgE0Q';

/**
 * 1. Real-time Live Stream Check via YouTube Data API v3
 * Checks if the channel is currently broadcasting a live stream.
 */
export async function checkLiveStreamRealTime() {
  if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
    return null;
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) {
      console.warn(`[YouTube API] Live check status: ${res.status}`);
      return null;
    }

    const data = await res.json();
    if (data.items && data.items.length > 0) {
      const liveItem = data.items[0];
      const videoId = liveItem.id?.videoId;
      const title = liveItem.snippet?.title || 'परम पूज्य बाबा उमाकान्त जी महाराज — लाइव सत्संग प्रसारण';
      const thumbnail =
        liveItem.snippet?.thumbnails?.maxres?.url ||
        liveItem.snippet?.thumbnails?.high?.url ||
        liveItem.snippet?.thumbnails?.medium?.url ||
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      return {
        isLiveNow: true,
        videoId,
        title,
        thumbnail,
        streamUrl: `https://www.youtube.com/watch?v=${videoId}`,
        channelUrl: `https://www.youtube.com/@Jaigurudevukm/live`
      };
    }

    return {
      isLiveNow: false
    };
  } catch (err) {
    console.warn('[YouTube API] Live stream check error:', err.message);
    return null;
  }
}

/**
 * 2. Fetch Latest Uploaded Videos & Shorts via Uploads Playlist (Costs only 1 quota unit)
 */
export async function fetchLatestUploadsFromApi(maxResults = 40) {
  if (!YOUTUBE_API_KEY || !UPLOADS_PLAYLIST_ID) {
    return null;
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${UPLOADS_PLAYLIST_ID}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) {
      console.warn(`[YouTube API] Playlist items status: ${res.status}`);
      return null;
    }

    const data = await res.json();
    const items = data.items || [];

    const videos = [];
    const shorts = [];

    for (const item of items) {
      const snippet = item.snippet || {};
      const videoId = snippet.resourceId?.videoId;
      if (!videoId) continue;

      const title = snippet.title || '';
      const description = snippet.description || '';
      const thumbnail =
        snippet.thumbnails?.maxres?.url ||
        snippet.thumbnails?.high?.url ||
        snippet.thumbnails?.medium?.url ||
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      const videoObj = {
        id: videoId,
        videoId,
        title,
        description,
        publishedAt: snippet.publishedAt,
        date: formatDateHuman(snippet.publishedAt),
        thumbnail,
        url: title.toLowerCase().includes('#short') || description.toLowerCase().includes('#shorts')
          ? `https://www.youtube.com/shorts/${videoId}`
          : `https://www.youtube.com/watch?v=${videoId}`
      };

      if (title.toLowerCase().includes('#short') || description.toLowerCase().includes('#shorts')) {
        shorts.push(videoObj);
      } else {
        videos.push(videoObj);
      }
    }

    return { videos, shorts };
  } catch (err) {
    console.warn('[YouTube API] Uploads fetch error:', err.message);
    return null;
  }
}

/**
 * 3. Fetch Channel Playlists via YouTube Data API v3
 */
export async function fetchPlaylistsFromApi(maxResults = 25) {
  if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
    return [];
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${CHANNEL_ID}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return [];

    const data = await res.json();
    return (data.items || []).map((item) => ({
      id: item.id,
      title: item.snippet?.title,
      description: item.snippet?.description,
      itemCount: item.contentDetails?.itemCount || 0,
      thumbnail:
        item.snippet?.thumbnails?.high?.url ||
        item.snippet?.thumbnails?.medium?.url ||
        item.snippet?.thumbnails?.default?.url,
      url: `https://www.youtube.com/playlist?list=${item.id}`
    }));
  } catch (err) {
    console.warn('[YouTube API] Playlists fetch error:', err.message);
    return [];
  }
}

/**
 * 4. Sync Real-Time Data and Update Local Cache File
 */
export async function syncRealTimeYouTubeData() {
  const [liveInfo, uploadsData, playlists] = await Promise.all([
    checkLiveStreamRealTime(),
    fetchLatestUploadsFromApi(50),
    fetchPlaylistsFromApi(25)
  ]);

  if (!uploadsData) {
    return null;
  }

  let existing = {};
  try {
    if (fs.existsSync(DATA_FILE)) {
      existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {
    existing = {};
  }

  const merged = {
    channelInfo: {
      title: 'Jaigurudev UKM Official',
      handle: '@Jaigurudevukm',
      customUrl: 'https://www.youtube.com/@Jaigurudevukm',
      subscribers: existing.channelInfo?.subscribers || '1.25M+ Devotees',
      videosCount: '7,180+ Videos',
      avatar: '/images/baba_jaigurudev.jpg',
      maharajAvatar: '/images/maharaj_ji.jpg',
      description: 'जयगुरुदेव धर्म प्रचारक संस्था का आधिकारिक यूट्यूब मंच। परम संत बाबा उमाकान्त जी महाराज के नित्य पावन सत्संग, नामदान, आरती एवं शाकाहार संदेशों का पावन प्रसारण।',
      bannerUrl: '/images/sant_vanshavali.jpg'
    },
    featured: uploadsData.videos[0] || existing.featured || {},
    videos: uploadsData.videos.length > 0 ? uploadsData.videos : existing.videos || [],
    shorts: uploadsData.shorts.length > 0 ? uploadsData.shorts : existing.shorts || [],
    streams: existing.streams || [],
    playlists: playlists.length > 0 ? playlists : existing.playlists || [],
    lastUpdated: new Date().toISOString()
  };

  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(merged, null, 2), 'utf8');
    console.log('[YouTube API] Real-time YouTube channel data synced to disk successfully.');
  } catch (err) {
    console.error('[YouTube API] Could not write data file:', err);
  }

  return { ...merged, liveInfo };
}

function formatDateHuman(isoDate) {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  return date.toLocaleDateString('hi-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}
