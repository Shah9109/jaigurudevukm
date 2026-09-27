import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/youtubeChannelData.json');

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@Jaigurudevukm';
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept-Language': 'hi,en-US;q=0.9,en;q=0.8'
};

function extractJSON(html, varName) {
  const startIdx = html.indexOf(varName);
  if (startIdx === -1) return null;
  const eqIdx = html.indexOf('=', startIdx);
  if (eqIdx === -1) return null;
  const braceIdx = html.indexOf('{', eqIdx);
  if (braceIdx === -1) return null;
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = braceIdx; i < html.length; i++) {
    const char = html[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (char === '\\') {
      escape = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (!inString) {
      if (char === '{') depth++;
      else if (char === '}') {
        depth--;
        if (depth === 0) {
          try {
            return JSON.parse(html.substring(braceIdx, i + 1));
          } catch (e) {
            return null;
          }
        }
      }
    }
  }
  return null;
}

export async function fetchFullYouTubeData() {
  const channelData = {
    channelInfo: {
      title: 'Jaigurudev UKM Official',
      handle: '@Jaigurudevukm',
      customUrl: YOUTUBE_CHANNEL_URL,
      subscribers: '1.25M+ Devotees',
      videosCount: '3,450+ Videos',
      avatar: '/images/baba_jaigurudev.jpg',
      maharajAvatar: '/images/maharaj_ji.jpg',
      description: 'जयगुरुदेव धर्म प्रचारक संस्था का आधिकारिक यूट्यूब मंच। परम संत बाबा उमाकान्त जी महाराज के नित्य पावन सत्संग, नामदान, आरती एवं शाकाहार संदेशों का पावन प्रसारण।'
    },
    featured: {
      videoId: '2Yojr_mheEs',
      title: 'परम पूज्य बाबा उमाकान्त जी महाराज — विशेष सत्संग एवं नामदान अमृत वर्षा',
      description: 'सतना-चित्रकूट व उज्जैन पावन धाम से पूज्य महाराज जी द्वारा मानव जीवन के कल्याण, शाकाहार और प्रभु प्राप्ति की साधना का दिव्य उपदेश।',
      thumbnail: 'https://i.ytimg.com/vi/2Yojr_mheEs/maxresdefault.jpg',
      publishedDate: 'Recently',
      views: '50K+ views',
      duration: '45:10'
    },
    videos: [],
    shorts: [],
    streams: [],
    playlists: []
  };

  try {
    // 1. Fetch Videos tab
    const vRes = await fetch(`${YOUTUBE_CHANNEL_URL}/videos`, { headers: HEADERS, signal: AbortSignal.timeout(8000) });
    if (vRes.ok) {
      const vHtml = await vRes.text();
      const vData = extractJSON(vHtml, 'ytInitialData');
      const vTab = vData?.contents?.twoColumnBrowseResultsRenderer?.tabs?.find(t => t.tabRenderer?.content?.richGridRenderer);
      const vContents = vTab?.tabRenderer?.content?.richGridRenderer?.contents || [];
      for (const c of vContents) {
        const l = c.richItemRenderer?.content?.lockupViewModel;
        if (l?.contentId) {
          const id = l.contentId;
          const meta = l.metadata?.lockupMetadataViewModel;
          const title = meta?.title?.content || '';
          const rows = meta?.metadata?.contentMetadataViewModel?.metadataRows || [];
          const parts = rows.flatMap(r => (r.metadataParts || []).map(p => p.text?.content));
          
          let duration = 'Satsang';
          const durMatch = l.rendererContext?.accessibilityContext?.label?.match(/(\d+\s*(?:minutes?|hours?|seconds?|min|sec)(?:\s*,\s*\d+\s*(?:seconds?|sec))?)/i);
          if (durMatch) duration = durMatch[1];

          let category = 'Satsang Discourse';
          if (title.toLowerCase().includes('episode')) category = 'TV Discourse';
          else if (title.includes('साधना') || title.includes('ध्यान')) category = 'Sadhana Guidance';
          else if (title.includes('शाकाहार') || title.includes('नशा')) category = 'Social Reform';

          channelData.videos.push({
            id,
            videoId: id,
            title,
            views: parts[0] || '1K+ views',
            publishedDate: parts[1] || 'Recently',
            duration,
            thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
            url: `https://www.youtube.com/watch?v=${id}`,
            category
          });
        }
      }
    }
  } catch (err) {
    console.warn('[YouTube Scraper] Error fetching videos:', err.message);
  }

  try {
    // 2. Fetch Shorts tab
    const sRes = await fetch(`${YOUTUBE_CHANNEL_URL}/shorts`, { headers: HEADERS, signal: AbortSignal.timeout(8000) });
    if (sRes.ok) {
      const sHtml = await sRes.text();
      const sData = extractJSON(sHtml, 'ytInitialData');
      const sTab = sData?.contents?.twoColumnBrowseResultsRenderer?.tabs?.find(t => t.tabRenderer?.content?.richGridRenderer);
      const sContents = sTab?.tabRenderer?.content?.richGridRenderer?.contents || [];
      for (const c of sContents) {
        const s = c.richItemRenderer?.content?.shortsLockupViewModel;
        if (s?.entityId) {
          const id = s.entityId.replace('shorts-shelf-item-', '');
          const title = s.overlayMetadata?.primaryText?.content || '';
          const views = s.overlayMetadata?.secondaryText?.content || '10K+ views';
          channelData.shorts.push({
            id,
            videoId: id,
            title,
            views,
            thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
            url: `https://www.youtube.com/shorts/${id}`
          });
        }
      }
    }
  } catch (err) {
    console.warn('[YouTube Scraper] Error fetching shorts:', err.message);
  }

  try {
    // 3. Fetch Live Streams tab
    const strRes = await fetch(`${YOUTUBE_CHANNEL_URL}/streams`, { headers: HEADERS, signal: AbortSignal.timeout(8000) });
    if (strRes.ok) {
      const strHtml = await strRes.text();
      const strData = extractJSON(strHtml, 'ytInitialData');
      const strTab = strData?.contents?.twoColumnBrowseResultsRenderer?.tabs?.find(t => t.tabRenderer?.content?.richGridRenderer);
      const strContents = strTab?.tabRenderer?.content?.richGridRenderer?.contents || [];
      for (const c of strContents) {
        const l = c.richItemRenderer?.content?.lockupViewModel;
        if (l?.contentId) {
          const id = l.contentId;
          const meta = l.metadata?.lockupMetadataViewModel;
          const title = meta?.title?.content || '';
          const rows = meta?.metadata?.contentMetadataViewModel?.metadataRows || [];
          const parts = rows.flatMap(r => (r.metadataParts || []).map(p => p.text?.content));
          channelData.streams.push({
            id,
            videoId: id,
            title,
            views: parts[0] || '10K+ views',
            date: parts[1] || 'Live Stream',
            thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
            url: `https://www.youtube.com/watch?v=${id}`
          });
        }
      }
    }
  } catch (err) {
    console.warn('[YouTube Scraper] Error fetching streams:', err.message);
  }

  try {
    // 4. Fetch Playlists tab
    const plRes = await fetch(`${YOUTUBE_CHANNEL_URL}/playlists`, { headers: HEADERS, signal: AbortSignal.timeout(8000) });
    if (plRes.ok) {
      const plHtml = await plRes.text();
      const plData = extractJSON(plHtml, 'ytInitialData');
      const plTab = plData?.contents?.twoColumnBrowseResultsRenderer?.tabs?.find(t => t.tabRenderer?.content);
      const sec = plTab?.tabRenderer?.content?.sectionListRenderer?.contents?.[0];
      const items = sec?.itemSectionRenderer?.contents?.[0]?.gridRenderer?.items || [];
      for (const item of items) {
        const l = item.lockupViewModel;
        if (l?.contentId) {
          const id = l.contentId;
          const meta = l.metadata?.lockupMetadataViewModel;
          const title = meta?.title?.content || 'Playlist';
          const rows = meta?.metadata?.contentMetadataViewModel?.metadataRows || [];
          const parts = rows.flatMap(r => (r.metadataParts || []).map(p => p.text?.content));
          const thumb = l.contentImage?.collectionThumbnailViewModel?.primaryThumbnail?.thumbnailViewModel?.image?.sources?.[0]?.url || 'https://i.ytimg.com/vi/q_y5df4yhq0/hqdefault.jpg';
          channelData.playlists.push({
            id,
            title,
            videoCount: parts[0] || 'View full playlist',
            updatedDate: parts[1] || 'Updated Regularly',
            thumbnail: thumb,
            url: `https://www.youtube.com/playlist?list=${id}`
          });
        }
      }
    }
  } catch (err) {
    console.warn('[YouTube Scraper] Error fetching playlists:', err.message);
  }

  // 5. Set featured video to latest stream or video if available
  if (channelData.streams.length > 0) {
    channelData.featured.videoId = channelData.streams[0].videoId;
    channelData.featured.title = channelData.streams[0].title;
    channelData.featured.thumbnail = `https://i.ytimg.com/vi/${channelData.streams[0].videoId}/maxresdefault.jpg`;
    channelData.featured.publishedDate = channelData.streams[0].date || 'Latest Stream';
    channelData.featured.views = channelData.streams[0].views || '20K+ views';
  } else if (channelData.videos.length > 0) {
    channelData.featured.videoId = channelData.videos[0].videoId;
    channelData.featured.title = channelData.videos[0].title;
    channelData.featured.thumbnail = `https://i.ytimg.com/vi/${channelData.videos[0].videoId}/maxresdefault.jpg`;
    channelData.featured.publishedDate = channelData.videos[0].publishedDate;
    channelData.featured.views = channelData.videos[0].views;
  }

  // Persist to JSON cache file if we got real data
  if (channelData.videos.length > 0 || channelData.shorts.length > 0) {
    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(channelData, null, 2), 'utf-8');
      console.log(`[YouTube Scraper] Cached ${channelData.videos.length} videos, ${channelData.shorts.length} shorts, ${channelData.streams.length} streams, ${channelData.playlists.length} playlists.`);
    } catch (err) {
      console.error('[YouTube Scraper] Failed to save cache file:', err.message);
    }
  }

  return channelData;
}

export function getCachedYouTubeData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('[YouTube Scraper] Error reading cache file:', err.message);
  }
  return null;
}
