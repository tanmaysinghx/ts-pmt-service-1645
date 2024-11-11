import { Request, Response } from 'express';
import { createProjectService, getAllProjectsService, getProjectByIdService, getProjectsByProjectOwnerService, renewProjectByProjectIdService, updateProjectDetailsService } from '../services/projectService';
import { errorResponse, successResponse } from '../utils/responseUtils';

interface CustomRequest extends Request {
    transactionId?: string;
}

/* Controller to create project */
export const createProject = async (req: CustomRequest, res: Response): Promise<void> => {
    const transactionId = req.transactionId;
    try {
        const { projectName, projectOwner, projectManager, projectDescription, startDate, endDate, budget, billingIds } = req.body;
        const project = await createProjectService(projectName, projectOwner, projectManager, projectDescription, startDate, endDate, budget, billingIds);
        res.status(201).json(successResponse(project, "Project is successfully created", transactionId));
    } catch (error: any) {
        const errorMessage = error?.message || 'Project creation failed';
        res.status(400).json(errorResponse(errorMessage, "Project creation error", transactionId));
    }
};

/* Controller to get all projects */
export const getAllProjects = async (req: CustomRequest, res: Response): Promise<void> => {
    const transactionId = req.transactionId;
    try {
        const projects = await getAllProjectsService();
        res.status(200).json(successResponse(projects, "All Projects Fetched", transactionId));
    } catch (error: any) {
        const errorMessage = error?.message || 'null';
        res.status(400).json(errorResponse(errorMessage, "Project fetch error", transactionId));
    }
};

/* Controller to get project by projectId */
export const getProjectById = async (req: CustomRequest, res: Response): Promise<void> => {
    const transactionId = req.transactionId;
    const { projectId } = req.params;
    try {
        const project = await getProjectByIdService(projectId);
        if (project) {
            res.status(200).json(successResponse(project, "Project Fetched", transactionId));
        } else {
            let error = "Project not found"
            res.status(400).json(errorResponse(error, "Project fetch error", transactionId));
        }
    } catch (error: any) {
        const errorMessage = error?.message || 'Error fetching project';
        res.status(500).json(errorResponse(errorMessage, "Error fetching project", transactionId));
    }
};

/* Controller to get project by projectOwner */
export const getProjectsByProjectOwner = async (req: CustomRequest, res: Response): Promise<void> => {
    const transactionId = req.transactionId;
    const { projectOwner } = req.params;
    try {
        const project = await getProjectsByProjectOwnerService(projectOwner);
        if (project) {
            res.status(200).json(successResponse(project, "Projects fetched based on project owner", transactionId));
        } else {
            let error = "Project not found assigned to this project owner"
            res.status(400).json(errorResponse(error, "Project fetch error", transactionId));
        }
    } catch (error: any) {
        const errorMessage = error?.message || 'Error fetching project';
        res.status(500).json(errorResponse(errorMessage, "Error fetching project", transactionId));
    }
};

/* Controller to renew project by projectId */
export const renewProjectByProjectId = async (req: CustomRequest, res: Response): Promise<void> => {
    const transactionId = req.transactionId;
    const { projectId } = req.params;
    const { newStartDate, newEndDate } = req.body;

    try {
        const startDate = new Date(newStartDate);
        const endDate = new Date(newEndDate);

        const project = await renewProjectByProjectIdService(projectId, startDate, endDate);

        if (project) {
            res.status(200).json(successResponse(project, "Project renewed successfully", transactionId));
        } else {
            res.status(404).json(errorResponse("Project not found", "Project renewal error", transactionId));
        }
    } catch (error: any) {
        res.status(500).json(errorResponse(error.message, "Project renewal error", transactionId));
    }
};

/* Controller to update project by projectId */
export const updateProjectDetails = async (req: CustomRequest, res: Response): Promise<void> => {
    const transactionId = req.transactionId;
    const { projectId } = req.params;
    const { projectName, status, projectOwner } = req.body;
    try {
        const updateData = {
            projectName,
            status,
            projectOwner
        };
        const updatedProject = await updateProjectDetailsService(projectId, updateData);
        if (updatedProject) {
            res.status(200).json(successResponse(updatedProject, "Project details updated successfully", transactionId));
        } else {
            const error = "Project not found";
            res.status(404).json(errorResponse(error, "Project not found", transactionId));
        }
    } catch (error: any) {
        const errorMessage = error?.message || 'Error updating project details';
        res.status(500).json(errorResponse(errorMessage, "Error updating project details", transactionId));
    }
};