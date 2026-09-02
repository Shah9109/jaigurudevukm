import express from 'express';
import { getEvents, getEventBySlugOrId } from '../controllers/eventsController.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/:slugOrId', getEventBySlugOrId);

export default router;
