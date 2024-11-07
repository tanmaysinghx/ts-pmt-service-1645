import { Router } from 'express';
import { createProject, getAllProjects, getProjectById, getProjectsByProjectOwner, renewProjectByProjectId, updateProjectDetails } from '../controllers/projectController';

const router = Router();

router.post('/create-project', createProject);
router.get('/get-all-projects', getAllProjects);
router.get('/get-project-by-id/:projectId', getProjectById);
router.post('/renew-project/:projectId', renewProjectByProjectId);
router.put('/update-project/:projectId', updateProjectDetails);

export default router;
