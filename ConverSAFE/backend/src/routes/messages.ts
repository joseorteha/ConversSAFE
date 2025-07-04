import { Router } from 'express';
import { getMessages, createMessage } from '../controllers/messagesController';

const router = Router();

// GET /messages?channel_id=1
router.get('/', getMessages);
// POST /messages
router.post('/', createMessage);

export default router; 