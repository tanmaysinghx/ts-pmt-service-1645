import express from 'express';
import { createGroup, getAllGroups, getGroupById } from '../controllers/groupController';

const router = express.Router();

router.post('/create-group', createGroup);
router.get('/get-all-groups', getAllGroups);
router.get('/get-group-by-group-id/:groupId', getGroupById);

export default router;
