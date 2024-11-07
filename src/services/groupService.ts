import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
