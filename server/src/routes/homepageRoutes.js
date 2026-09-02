import express from 'express';
import { getHomepageData } from '../controllers/homepageController.js';

const router = express.Router();

// Public route for homepage payload
router.get('/', getHomepageData);

export default router;
