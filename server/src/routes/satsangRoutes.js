import express from 'express';
import { getSatsangs, getSatsangById } from '../controllers/satsangController.js';

const router = express.Router();

router.get('/', getSatsangs);
router.get('/:id', getSatsangById);

export default router;
