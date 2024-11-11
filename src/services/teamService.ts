import { PrismaClient, TeamRole } from '@prisma/client';

const prisma = new PrismaClient();

/* Function to create a team */
export const createTeamService = async (
    teamName: string,
    teamOwner: string,
    teamTags: string[],
    teamMembers: { userId: string, role: string }[],
    projectIds: string[],
    teamSize: number,
    teamRole: TeamRole,
    teamDescription?: string
) => {
    try {
        return await prisma.team.create({
            data: {
                teamName,
                teamOwner,
                teamDescription,
                teamSize,
                teamRole,
                teamTags: {
                    create: teamTags.map(tag => ({ tag }))
                },
                teamMembers: {
                    create: teamMembers.map(member => ({
                        member: member.userId,
                        role: member.role
                    }))
                },
                projectIds: {
                    create: projectIds.map(projectId => ({ projectId }))
                }
            },
            include: {
                teamTags: true,
                teamMembers: true,
                projectIds: true
            }
        });
    } catch (error) {
        console.error('Error creating team:', error);
        throw new Error('Error creating team');
    }
};

/* Function to check if project exist */
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

/* Function to get all teams */
export const getAllTeamsService = async () => {
    return await prisma.team.findMany({
        include: {
            teamTags: true,
            teamMembers: true,
            projectIds: true
        }
    });
};

/* Function to get team by team owner */
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

/* Function to get team by team id */
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