import { Request, Response } from 'express';
import { checkIfProjectsExist, createTeamService, getAllTeamsService, getTeamByIdService, getTeamByOwnerService } from '../services/teamService';
import { errorResponse, successResponse } from '../utils/responseUtils';

interface CustomRequest extends Request {
    transactionId?: string;
}

export const createTeam = async (req: CustomRequest, res: Response): Promise<any> => {
    const transactionId = req.transactionId;
    const { teamName, teamOwner, teamTags, teamMembers, projectIds } = req.body;
    try {
        if (!projectIds || projectIds.length === 0) {
            return res.status(400).json(errorResponse('Project IDs are required', 'Validation error', transactionId));
        }
        const { existingProjectIds, nonExistentProjectIds } = await checkIfProjectsExist(projectIds);
        if (nonExistentProjectIds.length > 0) {
            return res.status(400).json(
                errorResponse(
                    `Projects with the following IDs do not exist: ${nonExistentProjectIds.join(', ')}`,
                    'Project validation error',
                    transactionId
                )
            );
        }
        const team = await createTeamService(teamName, teamOwner, teamTags, teamMembers, existingProjectIds);
        return res.status(201).json(successResponse(team, "Team is successfully created", transactionId));
    } catch (error: any) {
        const errorMessage = error?.message || 'Team creation failed';
        return res.status(400).json(errorResponse(errorMessage, "Team creation error", transactionId));
    }
};

export const getAllTeamsController = async (req: CustomRequest, res: Response): Promise<void> => {
    const transactionId = req.transactionId;
    try {
        const teams = await getAllTeamsService();
        if (teams && teams.length > 0) {
            res.status(200).json(successResponse(teams, "Teams fetched successfully", transactionId));
        } else {
            res.status(404).json(errorResponse("No teams found", "No teams available", transactionId));
        }
    } catch (error: any) {
        const errorMessage = error?.message || 'Error fetching teams';
        res.status(500).json(errorResponse(errorMessage, "Error fetching teams", transactionId));
    }
};

export const getTeamByOwnerController = async (req: CustomRequest, res: Response): Promise<void> => {
    const transactionId = req.transactionId;
    const { teamOwner } = req.params;
    try {
        const teams = await getTeamByOwnerService(teamOwner);
        if (teams.length > 0) {
            res.status(200).json(successResponse(teams, "Teams fetched successfully", transactionId));
        } else {
            res.status(404).json(errorResponse("No teams found for this owner", "Team fetch error", transactionId));
        }
    } catch (error: any) {
        const errorMessage = error?.message || 'Error fetching teams';
        res.status(500).json(errorResponse(errorMessage, "Team fetch error", transactionId));
    }
};

export const getTeamByIdController = async (req: CustomRequest, res: Response): Promise<void> => {
    const transactionId = req.transactionId;
    const { teamId } = req.params;
    try {
        const team = await getTeamByIdService(teamId);
        if (team) {
            res.status(200).json(successResponse(team, "Team fetched successfully", transactionId));
        } else {
            res.status(404).json(errorResponse("No team found with this ID", "Team fetch error", transactionId));
        }
    } catch (error: any) {
        const errorMessage = error?.message || 'Error fetching team';
        res.status(500).json(errorResponse(errorMessage, "Team fetch error", transactionId));
    }
};