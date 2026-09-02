import express from 'express';
import { login, getMe, changePassword, updateProfile } from '../controllers/authController.js';
import { protectAdmin } from '../middleware/auth.js';
import { authLimiter } from '../middleware/security.js';

const router = express.Router();

// Public auth routes (rate-limited)
router.post('/login', authLimiter, login);

// Protected admin routes
router.use(protectAdmin);
router.get('/me', getMe);
router.put('/change-password', changePassword);
router.put('/profile', updateProfile);

export default router;
