import { Router } from 'express';
import { getTeams } from '../controllers/teamsController';

const router = Router();

// GET /teams
router.get('/', getTeams);

export default router; 