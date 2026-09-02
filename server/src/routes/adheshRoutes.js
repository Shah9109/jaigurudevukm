import express from 'express';
import { getAdheshList, getAdheshById } from '../controllers/adheshController.js';

const router = express.Router();

router.get('/', getAdheshList);
router.get('/:id', getAdheshById);

export default router;
