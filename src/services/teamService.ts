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

export const checkIfProjectsExist = async (projectIds: string[]) => {
    const projects = await prisma.project.findMany({
        where: {
            projectId: {
                in: projectIds,
            }
        },
        select: {
            projectId: true,
        }
    });
    const existingProjectIds = projects.map(project => project.projectId);
    const nonExistentProjectIds = projectIds.filter(id => !existingProjectIds.includes(id));
    return {
        existingProjectIds,
        nonExistentProjectIds
    };
};

export const getAllTeamsService = async () => {
    return await prisma.team.findMany({
        include: {
            teamTags: true,
            teamMembers: true,
            projectIds: true
        }
    });
};

export const getTeamByOwnerService = async (teamOwner: string) => {
    return await prisma.team.findMany({
        where: {
            teamOwner,
        },
        include: {
            teamTags: true,
            teamMembers: true,
            projectIds: true,
        },
    });
};

export const getTeamByIdService = async (teamId: string) => {
    return await prisma.team.findUnique({
        where: { teamId },
        include: {
            teamTags: true,
            teamMembers: true,
            projectIds: true,
        },
    });
};