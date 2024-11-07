import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/* Function to create project */
export const createProjectService = async (
    projectName: string,
    projectOwner: string,
    billingIds: string[]
) => {
    return await prisma.project.create({
        data: {
            projectName,
            projectOwner,
            billingIds: {
                create: billingIds.map(billingId => ({ billingId }))
            }
        },
        include: { billingIds: true }
    });
};

/* Function to get all projects */
export const getAllProjectsService = async () => {
    return await prisma.project.findMany();
};

/* Function to get project details based on project id */
export const getProjectByIdService = async (projectId: string) => {
    return await prisma.project.findUnique({
        where: { projectId },
    });
};

/* Function to get project details based on project owner */
export const getProjectsByProjectOwnerService = async (projectOwnerEmail: string) => {
    return await prisma.project.findMany({
        where: { projectOwner: projectOwnerEmail },
    });
}

/* Function to renew project */
export const renewProjectByProjectIdService = async (projectId: string, newStartDate: Date, newEndDate: Date) => {
    const project = await prisma.project.findUnique({
        where: { projectId },
    });
    if (!project) {
        throw new Error('Project not found');
    }
    const renewalHistory = project.renewalHistory ? (project.renewalHistory as any) : [];
    renewalHistory.push({
        startDate: project.startDate,
        endDate: project.endDate,
    });
    const updatedProject = await prisma.project.update({
        where: { projectId },
        data: {
            startDate: newStartDate,
            endDate: newEndDate,
            renewalHistory: renewalHistory,
            updatedAt: new Date(),
        },
    });
    return updatedProject;
};

/* Function to update project details */
export const updateProjectDetailsService = async (
    projectId: string,
    updateData: { projectName?: string; status?: string; projectOwner?: string }
) => {
    const { projectName, status, projectOwner } = updateData;
    const validStatuses = ['ACTIVE', 'INACTIVE', 'COMPLETED', 'SUSPENDED'];
    const statusEnum = validStatuses.includes(status || '') ? status : undefined;
    const updateFields: any = {
        updatedAt: new Date(),
    };
    if (projectName) updateFields.projectName = projectName;
    if (statusEnum) updateFields.status = statusEnum;
    if (projectOwner) updateFields.projectOwner = projectOwner;
    const project = await prisma.project.update({
        where: { projectId },
        data: updateFields,
    });
    return project;
};



