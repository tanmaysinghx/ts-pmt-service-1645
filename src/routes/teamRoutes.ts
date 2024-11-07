import express from 'express';
import { createTeam } from '../controllers/teamController';

const router = express.Router();

router.post('/create-team', createTeam);

export default router;
