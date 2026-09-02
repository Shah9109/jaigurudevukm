import express from 'express';
import {
  handleChatMessage,
  getKnowledgeList,
  createKnowledge,
  updateKnowledge,
  deleteKnowledge,
} from '../controllers/chatbotController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public Chatbot endpoint
router.post('/message', handleChatMessage);

// Admin Knowledge Base CRUD (Protected)
router.get('/knowledge', protectAdmin, getKnowledgeList);
router.post('/knowledge', protectAdmin, createKnowledge);
router.put('/knowledge/:id', protectAdmin, updateKnowledge);
router.delete('/knowledge/:id', protectAdmin, deleteKnowledge);

export default router;
