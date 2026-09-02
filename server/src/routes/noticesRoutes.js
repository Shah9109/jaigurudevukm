import express from 'express';
import { getNotices, getNoticeById } from '../controllers/noticesController.js';

const router = express.Router();

router.get('/', getNotices);
router.get('/:id', getNoticeById);

export default router;
