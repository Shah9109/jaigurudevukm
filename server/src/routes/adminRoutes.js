import express from 'express';
import { getDashboardStats } from '../controllers/adminDashboardController.js';
import {
  createSatsang,
  updateSatsang,
  deleteSatsang,
  createNotice,
  updateNotice,
  deleteNotice,
  createAdhesh,
  updateAdhesh,
  deleteAdhesh,
  createEvent,
  updateEvent,
  deleteEvent,
  createVideo,
  updateVideo,
  deleteVideo,
  createAudio,
  updateAudio,
  deleteAudio,
} from '../controllers/adminCrudController.js';
import {
  getSettings,
  updateSettings,
  getActivityLogs,
  getEnquiries,
  updateEnquiryStatus,
} from '../controllers/adminSettingsController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Require JWT for all /api/admin routes
router.use(protectAdmin);

// Dashboard
router.get('/dashboard-stats', getDashboardStats);

// Satsang CRUD
router.post('/satsang', createSatsang);
router.put('/satsang/:id', updateSatsang);
router.delete('/satsang/:id', deleteSatsang);

// Notices CRUD
router.post('/notices', createNotice);
router.put('/notices/:id', updateNotice);
router.delete('/notices/:id', deleteNotice);

// Adhesh CRUD
router.post('/adhesh', createAdhesh);
router.put('/adhesh/:id', updateAdhesh);
router.delete('/adhesh/:id', deleteAdhesh);

// Events CRUD
router.post('/events', createEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

// Videos CRUD
router.post('/videos', createVideo);
router.put('/videos/:id', updateVideo);
router.delete('/videos/:id', deleteVideo);

// Audio CRUD
router.post('/audio', createAudio);
router.put('/audio/:id', updateAudio);
router.delete('/audio/:id', deleteAudio);

// Site Settings & Homepage Sections
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

// Activity Logs
router.get('/logs', getActivityLogs);

// Devotee Enquiries
router.get('/enquiries', getEnquiries);
router.patch('/enquiries/:id', updateEnquiryStatus);

export default router;
