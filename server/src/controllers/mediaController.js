import { Video } from '../models/Video.js';
import { Audio } from '../models/Audio.js';
import { Gallery } from '../models/Gallery.js';
import { sendSuccess, sendError, sendPaginated } from '../utils/apiResponse.js';

// YouTube Channel Data Cache
let cachedChannelData = null;
let lastChannelFetchTime = 0;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

const DEFAULT_CHANNEL_DATA = {
  channelInfo: {
    title: 'Jaigurudev UKM Official',
    handle: '@Jaigurudevukm',
    customUrl: 'https://www.youtube.com/@Jaigurudevukm',
    subscribers: '1.2M+ Devotees',
    videosCount: '3,400+ Videos',
    avatar: '/images/baba_jaigurudev.jpg',
    maharajAvatar: '/images/maharaj_ji.jpg',
    description: 'जयगुरुदेव धर्म प्रचारक संस्था का आधिकारिक यूट्यूब मंच। परम संत बाबा उमाकान्त जी महाराज के नित्य पावन सत्संग, नामदान, आरती एवं शाकाहार संदेशों का पावन प्रसारण।',
    bannerUrl: '/images/sant_vanshavali.jpg'
  },
  featured: {
    videoId: 'q_y5df4yhq0',
    title: 'परम पूज्य बाबा उमाकान्त जी महाराज — विशेष सत्संग एवं नामदान अमृत वर्षा',
    description: 'सतना-चित्रकूट पावन भूमि पर आयोजित विशाल सत्संग समारोह में पूज्य महाराज जी द्वारा मानव जीवन के कल्याण, शाकाहार और प्रभु प्राप्ति की साधना का दिव्य उपदेश।',
    thumbnail: 'https://i.ytimg.com/vi/q_y5df4yhq0/maxresdefault.jpg',
    publishedDate: '28 Aug 2026',
    views: '45,200 views',
    duration: '1:45:20'
  },
  videos: [
    {
      id: 'g0XIOo_4VVU',
      videoId: 'g0XIOo_4VVU',
      title: 'मानव शरीर का असली उद्देश्य क्या है? — पूज्य बाबा उमाकान्त जी महाराज',
      thumbnail: 'https://i.ytimg.com/vi/g0XIOo_4VVU/hqdefault.jpg',
      publishedDate: '01 Sept 2026',
      duration: '42:15',
      views: '28.4K views',
      category: 'Satsang Discourse'
    },
    {
      id: 'hKn3Ic-5XJ0',
      videoId: 'hKn3Ic-5XJ0',
      title: 'सूरत-शब्द योग साधना की सरल विधि — जयगुरुदेव नाम महिमा',
      thumbnail: 'https://i.ytimg.com/vi/hKn3Ic-5XJ0/hqdefault.jpg',
      publishedDate: '30 Aug 2026',
      duration: '38:50',
      views: '35.1K views',
      category: 'Sadhana Guidance'
    },
    {
      id: 'RM-_8hGWAOM',
      videoId: 'RM-_8hGWAOM',
      title: 'शाकाहार से ही आत्मिक शुद्धि संभव है — सामाजिक सुधार प्रवचन',
      thumbnail: 'https://i.ytimg.com/vi/RM-_8hGWAOM/hqdefault.jpg',
      publishedDate: '29 Aug 2026',
      duration: '52:10',
      views: '19.8K views',
      category: 'Social Reform'
    },
    {
      id: 'ZVCDIDFTml8',
      videoId: 'ZVCDIDFTml8',
      title: 'कर्मों का अकाट्य विधान एवं चौरासी लाख योनियों से मुक्ति',
      thumbnail: 'https://i.ytimg.com/vi/ZVCDIDFTml8/hqdefault.jpg',
      publishedDate: '25 Aug 2026',
      duration: '46:30',
      views: '41.2K views',
      category: 'Satsang Discourse'
    },
    {
      id: 'icZFjDY7mhs',
      videoId: 'icZFjDY7mhs',
      title: 'नित्य प्रातः अमृत वेला में नाम सिमरन का सही समय और लाभ',
      thumbnail: 'https://i.ytimg.com/vi/icZFjDY7mhs/hqdefault.jpg',
      publishedDate: '22 Aug 2026',
      duration: '31:40',
      views: '54.0K views',
      category: 'Sadhana Guidance'
    },
    {
      id: 'lnGn7U5kFj4',
      videoId: 'lnGn7U5kFj4',
      title: 'परम पूज्य बाबा जयगुरुदेव जी महाराज का पावन जीवन चरित्र व संदेश',
      thumbnail: 'https://i.ytimg.com/vi/lnGn7U5kFj4/hqdefault.jpg',
      publishedDate: '18 Aug 2026',
      duration: '1:12:00',
      views: '88.5K views',
      category: 'Historical'
    },
    {
      id: 'Qa50i_IEY9g',
      videoId: 'Qa50i_IEY9g',
      title: 'नशा मुक्ति और सदाचारी जीवन — समाज परिवर्तन का महायज्ञ',
      thumbnail: 'https://i.ytimg.com/vi/Qa50i_IEY9g/hqdefault.jpg',
      publishedDate: '15 Aug 2026',
      duration: '44:18',
      views: '22.6K views',
      category: 'Social Reform'
    },
    {
      id: 'ebO_f7F7UY4',
      videoId: 'ebO_f7F7UY4',
      title: 'उज्जैन आश्रम पावन भंडारा एवं गुरु पूर्णिमा महोत्सव विशेष',
      thumbnail: 'https://i.ytimg.com/vi/ebO_f7F7UY4/hqdefault.jpg',
      publishedDate: '10 Aug 2026',
      duration: '1:05:40',
      views: '63.9K views',
      category: 'Events & Festivals'
    }
  ],
  shorts: [
    {
      id: '9lZkMk10az0',
      videoId: '9lZkMk10az0',
      title: 'जयगुरुदेव नाम की अपार शक्ति #shorts #jaigurudev',
      thumbnail: 'https://i.ytimg.com/vi/9lZkMk10az0/hqdefault.jpg',
      views: '120K views'
    },
    {
      id: 'ycjOXKcGeHY',
      videoId: 'ycjOXKcGeHY',
      title: 'शाकाहारी बनो — जीवों पर दया करो #shorts',
      thumbnail: 'https://i.ytimg.com/vi/ycjOXKcGeHY/hqdefault.jpg',
      views: '95K views'
    },
    {
      id: 'QnMTLcqKQZA',
      videoId: 'QnMTLcqKQZA',
      title: 'अमृत वेला में ध्यान का पावन नियम #shorts #sadhana',
      thumbnail: 'https://i.ytimg.com/vi/QnMTLcqKQZA/hqdefault.jpg',
      views: '180K views'
    },
    {
      id: 'QdFSyXPl1h4',
      videoId: 'QdFSyXPl1h4',
      title: 'पूज्य महाराज जी का अनमोल उपदेश #babaukm #guruvani',
      thumbnail: 'https://i.ytimg.com/vi/QdFSyXPl1h4/hqdefault.jpg',
      views: '210K views'
    },
    {
      id: 'Vb-Lmlvqx4o',
      videoId: 'Vb-Lmlvqx4o',
      title: 'गुलाबी वस्त्र रक्षा कवच की पावन महिमा #shorts',
      thumbnail: 'https://i.ytimg.com/vi/Vb-Lmlvqx4o/hqdefault.jpg',
      views: '145K views'
    },
    {
      id: 'EKDGuG3hUiA',
      videoId: 'EKDGuG3hUiA',
      title: 'मन को शांत करने का सरल उपाय #shorts #spirituality',
      thumbnail: 'https://i.ytimg.com/vi/EKDGuG3hUiA/hqdefault.jpg',
      views: '88K views'
    },
    {
      id: 'ai3cyiw5C5M',
      videoId: 'ai3cyiw5C5M',
      title: 'कर्मों का फल हर किसी को भोगना पड़ता है #shorts',
      thumbnail: 'https://i.ytimg.com/vi/ai3cyiw5C5M/hqdefault.jpg',
      views: '160K views'
    },
    {
      id: 'K4L_Mely4GA',
      videoId: 'K4L_Mely4GA',
      title: 'जयगुरुदेव आश्रम उज्जैन की पावन आरती #shorts',
      thumbnail: 'https://i.ytimg.com/vi/K4L_Mely4GA/hqdefault.jpg',
      views: '250K views'
    }
  ],
  streams: [
    {
      id: 'q_y5df4yhq0',
      videoId: 'q_y5df4yhq0',
      title: 'Satsang | 28.08.2026 | 5 AM | Satna-Chitrakoot Road, Babupur, MP',
      thumbnail: 'https://i.ytimg.com/vi/q_y5df4yhq0/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=q_y5df4yhq0',
      isLive: false,
      date: '28 Aug 2026'
    },
    {
      id: 'iI7_q03OhUA',
      videoId: 'iI7_q03OhUA',
      title: 'Satsang | 27.08.2026 | 5 AM | Satna-Chitrakoot Road, Babupur, MP',
      thumbnail: 'https://i.ytimg.com/vi/iI7_q03OhUA/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=iI7_q03OhUA',
      isLive: false,
      date: '27 Aug 2026'
    },
    {
      id: 'OG_u1nC7owQ',
      videoId: 'OG_u1nC7owQ',
      title: 'Satsang | 26.08.2026 | 6 PM | Satna-Chitrakoot Road, Babupur, MP',
      thumbnail: 'https://i.ytimg.com/vi/OG_u1nC7owQ/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=OG_u1nC7owQ',
      isLive: false,
      date: '26 Aug 2026'
    },
    {
      id: 'eNBvAPWfKyE',
      videoId: 'eNBvAPWfKyE',
      title: 'Satsang | 21.08.2026 | 8:30 AM | Banke Bihari Marriage Garden, Rewa, M.P',
      thumbnail: 'https://i.ytimg.com/vi/eNBvAPWfKyE/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=eNBvAPWfKyE',
      isLive: false,
      date: '21 Aug 2026'
    },
    {
      id: 'jpxokz4XxW4',
      videoId: 'jpxokz4XxW4',
      title: 'Satsang | 08.08.2026 | Morning 7 AM | Baba Jaigurudev Ashram, Ujjain, M.P.',
      thumbnail: 'https://i.ytimg.com/vi/jpxokz4XxW4/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=jpxokz4XxW4',
      isLive: false,
      date: '08 Aug 2026'
    },
    {
      id: 'nr0hailrs7A',
      videoId: 'nr0hailrs7A',
      title: 'Satsang | 02.08.2026 | Morning 10 AM | Baba Jaigurudev Ashram, Ujjain, M.P.',
      thumbnail: 'https://i.ytimg.com/vi/nr0hailrs7A/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=nr0hailrs7A',
      isLive: false,
      date: '02 Aug 2026'
    },
    {
      id: 'kcl9mOd30oo',
      videoId: 'kcl9mOd30oo',
      title: 'Satsang | 29.07.2026 | Morning 5 AM | Thikariya Ashram, Jaipur, RJ',
      thumbnail: 'https://i.ytimg.com/vi/kcl9mOd30oo/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=kcl9mOd30oo',
      isLive: false,
      date: '29 Jul 2026'
    },
    {
      id: 'TmWlGPLXT8A',
      videoId: 'TmWlGPLXT8A',
      title: 'Satsang | 28.07.2026 | Evening 5 PM | Thikariya Ashram, Jaipur, RJ',
      thumbnail: 'https://i.ytimg.com/vi/TmWlGPLXT8A/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=TmWlGPLXT8A',
      isLive: false,
      date: '28 Jul 2026'
    }
  ],
  playlists: [
    {
      id: 'PLXPFzR6EG4R98kORuJzXeATnLRQSQRfph',
      title: 'अमृत वचन एवं विशेष सत्संग प्रवचन श्रृंखला',
      thumbnail: 'https://i.ytimg.com/vi/q_y5df4yhq0/hqdefault.jpg',
      videoCount: '154 Videos',
      updatedDate: 'Updated Today'
    },
    {
      id: 'PLXPFzR6EG4R-yIsSZqheTIGyvx75ZRhn9',
      title: 'सुरत-शब्द योग एवं नामदान साधना विधि',
      thumbnail: 'https://i.ytimg.com/vi/hKn3Ic-5XJ0/hqdefault.jpg',
      videoCount: '82 Videos',
      updatedDate: 'Updated This Week'
    },
    {
      id: 'PLXPFzR6EG4R9WxUkgCaq1YWFD7b8rQ0Y_',
      title: 'शाकाहार एवं नशामुक्त समाज जनजागरण संदेश',
      thumbnail: 'https://i.ytimg.com/vi/RM-_8hGWAOM/hqdefault.jpg',
      videoCount: '96 Videos',
      updatedDate: 'Updated This Month'
    },
    {
      id: 'PLXPFzR6EG4R-iIqVPgaMYWhwwMJ2uy2GQ',
      title: 'गुरु पूर्णिमा एवं वार्षिक पावन भंडारा महोत्सव',
      thumbnail: 'https://i.ytimg.com/vi/ebO_f7F7UY4/hqdefault.jpg',
      videoCount: '64 Videos',
      updatedDate: 'Updated Regularly'
    },
    {
      id: 'PLXPFzR6EG4R-37UsBVmw05w0cRKS9dlyt',
      title: 'आश्रम आरती, वंदना एवं पावन नाम-धुन',
      thumbnail: 'https://i.ytimg.com/vi/jpxokz4XxW4/hqdefault.jpg',
      videoCount: '45 Videos',
      updatedDate: 'Updated Regularly'
    }
  ]
};

// Return the complete YouTube channel data with all tabs
export const getYouTubeChannelData = async (req, res, next) => {
  try {
    const now = Date.now();
    if (cachedChannelData && now - lastChannelFetchTime < CACHE_TTL_MS) {
      return sendSuccess(res, 'YouTube channel data (cached)', cachedChannelData);
    }

    try {
      // Fetch latest streams from streams page
      const streamsRes = await fetch('https://www.youtube.com/@Jaigurudevukm/streams', {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(5000)
      });
      if (streamsRes.ok) {
        const html = await streamsRes.text();
        const matches = [...html.matchAll(/\/watch\?v=([a-zA-Z0-9_-]{11})/g)].map((m) => m[1]);
        const uniqueIds = [...new Set(matches)].slice(0, 8);
        if (uniqueIds.length > 0) {
          const freshStreams = uniqueIds.map((id, idx) => ({
            id,
            videoId: id,
            title: `Satsang Live Stream ${idx + 1} | Param Pujya Baba Umakant Ji Maharaj`,
            thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
            url: `https://www.youtube.com/watch?v=${id}`,
            date: 'Latest Stream'
          }));
          DEFAULT_CHANNEL_DATA.streams = freshStreams;
          DEFAULT_CHANNEL_DATA.featured.videoId = uniqueIds[0];
          DEFAULT_CHANNEL_DATA.featured.thumbnail = `https://i.ytimg.com/vi/${uniqueIds[0]}/maxresdefault.jpg`;
        }
      }
    } catch (e) {
      console.log('Using robust fallback channel data');
    }

    cachedChannelData = DEFAULT_CHANNEL_DATA;
    lastChannelFetchTime = now;
    return sendSuccess(res, 'YouTube channel data retrieved', cachedChannelData);
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
      channelUrl: 'https://www.youtube.com/@Jaigurudevukm/streams'
    };

    lastLiveCheckTime = now;
    return sendSuccess(res, 'Real-time live stream status retrieved', cachedLiveStatus);
  } catch (error) {
    next(error);
  }
};

// Fetch streams endpoint
export const getYouTubeStreams = async (req, res, next) => {
  try {
    return sendSuccess(res, 'YouTube streams', DEFAULT_CHANNEL_DATA.streams);
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

    // Return default videos if database collection empty
    return sendSuccess(res, 'Videos retrieved', DEFAULT_CHANNEL_DATA.videos);
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
