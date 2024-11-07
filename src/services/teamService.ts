import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTeamService = async (
    teamName: string,
    teamOwner: string,
    teamTags: string[],
    teamMembers: string[],
    projectIds: string[]
) => {
    return await prisma.team.create({
        data: {
            teamName,
            teamOwner,
            teamTags: {
                create: teamTags.map(tag => ({ tag }))
            },
            teamMembers: {
                create: teamMembers.map(member => ({ member }))
            },
            projectIds: {
                create: projectIds.map(projectId => ({ projectId }))
            }
        },
        include: { teamTags: true, teamMembers: true, projectIds: true }
    });
};
