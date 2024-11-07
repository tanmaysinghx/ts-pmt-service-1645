import { Request, Response } from 'express';
import { createTeamService } from '../services/teamService';
import { errorResponse, successResponse } from '../utils/responseUtils';

interface CustomRequest extends Request {
    transactionId?: string;
}

export const createTeam = async (req: CustomRequest, res: Response): Promise<void> => {
    const transactionId = req.transactionId;
    try {
        const { teamName, teamOwner, teamTags, teamMembers, projectIds } = req.body;
        const team = await createTeamService(teamName, teamOwner, teamTags, teamMembers, projectIds);
        res.status(201).json(successResponse(team, "Team is successfully created", transactionId));
    } catch (error: any) {
        const errorMessage = error?.message || 'Project creation failed';
        res.status(400).json(errorResponse(error, "Project creation error", transactionId));
    }
};
