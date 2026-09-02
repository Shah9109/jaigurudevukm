import express from 'express';
import {
  getDocuments,
  getFAQs,
  submitContactEnquiry,
  globalSearch,
} from '../controllers/generalContentController.js';
import { contactLimiter } from '../middleware/security.js';

const router = express.Router();

router.get('/documents', getDocuments);
router.get('/faq', getFAQs);
router.post('/contact', contactLimiter, submitContactEnquiry);
router.get('/search', globalSearch);

export default router;
