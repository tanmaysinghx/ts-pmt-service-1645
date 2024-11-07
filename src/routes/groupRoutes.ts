import express from 'express';
import { createGroup } from '../controllers/groupController';

const router = express.Router();

router.post('/create-group', createGroup);

export default router;
