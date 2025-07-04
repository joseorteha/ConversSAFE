import { Router } from 'express';
import { getChannels, createChannel } from '../controllers/channelsController';

const router = Router();

// GET /channels?team_id=1
router.get('/', getChannels);
// POST /channels
router.post('/', createChannel);

export default router; 