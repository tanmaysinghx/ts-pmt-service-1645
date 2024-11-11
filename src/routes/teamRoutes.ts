import express from 'express';
import { createTeam, getAllTeamsController, getTeamByIdController, getTeamByOwnerController } from '../controllers/teamController';

const router = express.Router();

router.post('/create-team', createTeam);
router.get('/get-all-teams', getAllTeamsController);
router.get('/get-team-by-team-owner/:teamOwner', getTeamByOwnerController);
router.get('/get-team-by-team-id/:teamId', getTeamByIdController);

export default router;
