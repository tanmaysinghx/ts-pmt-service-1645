import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/* Function to create group */
export const createGroupService = async (
    groupName: string,
    groupOwner: string,
    groupTags: string[]
) => {
    return await prisma.group.create({
        data: {
            groupName,
            groupOwner,
            groupTags: {
                create: groupTags.map(tag => ({ tag }))
            }
        },
        include: { groupTags: true }
    });
};

/* Function to get all groups */
export const getAllGroupsService = async () => {
    return await prisma.group.findMany({
        include: { groupTags: true },
    });
};

/* Function to get group by group id */
export const getGroupByIdService = async (groupId: string) => {
    return await prisma.group.findUnique({
        where: { groupId },
        include: { groupTags: true },
    });
};