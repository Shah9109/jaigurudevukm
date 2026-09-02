import express from 'express';
import {
  getVideos,
  getAudioTracks,
  getGalleryAlbums,
  getGalleryAlbumBySlugOrId,
  getYouTubeStreams,
  getYouTubeChannelData,
  getLiveNowStatus,
} from '../controllers/mediaController.js';

const router = express.Router();

router.get('/live-now', getLiveNowStatus);
router.get('/youtube-channel', getYouTubeChannelData);
router.get('/streams', getYouTubeStreams);
router.get('/videos', getVideos);
router.get('/audio', getAudioTracks);
router.get('/gallery', getGalleryAlbums);
router.get('/gallery/:slugOrId', getGalleryAlbumBySlugOrId);

export default router;
