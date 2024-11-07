import { Request, Response } from 'express';
import { createGroupService } from '../services/groupService';
import { errorResponse, successResponse } from '../utils/responseUtils';

interface CustomRequest extends Request {
    transactionId?: string;
}

export const createGroup = async (req: CustomRequest, res: Response): Promise<void> => {
    const transactionId = req.transactionId;
    try {
        const { groupName, groupOwner, groupTags } = req.body;
        const group = await createGroupService(groupName, groupOwner, groupTags);
        res.status(201).json(successResponse(group, "Group is successfully created", transactionId));
    } catch (error: any) {
        const errorMessage = error?.message || 'Project creation failed';
        res.status(500).json(errorResponse(error, "Project creation error", transactionId));
    }
};
