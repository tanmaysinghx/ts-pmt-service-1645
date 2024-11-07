import { Request, Response } from 'express';
import { createGroupService, getAllGroupsService, getGroupByIdService } from '../services/groupService';
import { errorResponse, successResponse } from '../utils/responseUtils';

interface CustomRequest extends Request {
    transactionId?: string;
}

/* Controller to create group */
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

/* Controller to get all groups */
export const getAllGroups = async (req: Request, res: Response): Promise<void> => {
    try {
        const groups = await getAllGroupsService();
        res.status(200).json({ success: true, data: groups });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Error fetching groups', error: error.message });
    }
};

/* Controller to get group by group id */
export const getGroupById = async (req: Request, res: Response): Promise<void> => {
    const { groupId } = req.params;
    try {
        const group = await getGroupByIdService(groupId);
        if (group) {
            res.status(200).json({ success: true, data: group });
        } else {
            res.status(404).json({ success: false, message: 'Group not found' });
        }
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Error fetching group', error: error.message });
    }
};
