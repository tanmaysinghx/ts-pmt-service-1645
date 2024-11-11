import { PrismaClient } from '@prisma/client';
import { Ticket, TicketStatus, TicketPriority, TicketType, Incident, ImpactLevel, UrgencyLevel } from '@prisma/client';

const prisma = new PrismaClient();

/* Create a new ticket */
export const createTicket = async (data: {
    title: string;
    description: string;
    type: TicketType;
    priority?: TicketPriority;
    impact?: ImpactLevel;
    urgency?: UrgencyLevel;
    assignedToEmail?: string;
    createdByEmail: string;
    dueDate?: Date;
    groupId?: string;
    teamId?: string;
    serviceId?: string;
    customFields?: any;
}) => {
    const ticket = await prisma.ticket.create({
        data: {
            title: data.title,
            description: data.description,
            type: data.type,
            priority: data.priority || TicketPriority.medium,
            impact: data.impact || ImpactLevel.medium,
            urgency: data.urgency || UrgencyLevel.medium,
            assignedToEmail: data.assignedToEmail,
            createdByEmail: data.createdByEmail,
            dueDate: data.dueDate,
            groupId: data.groupId,
            teamId: data.teamId,
            serviceId: data.serviceId,
            customFields: data.customFields,
        },
    });
    return ticket;
};

// Get a ticket by ID
export const getTicketById = async (ticketId: string) => {
    const ticket = await prisma.ticket.findUnique({
        where: { ticketId },
        include: {
            Incident: true,  // Include related incidents if needed
        },
    });
    return ticket;
};

// Update a ticket

// Define the function for updating a ticket
// export const updateTicket = async (ticketId: string, data: Partial<Ticket>) => {
//     const updatedTicket = await prisma.ticket.update({
//       where: { ticketId },
//       data: {
//         ...data,
//         // Handle nullable fields like `attachmentIds`
//         attachmentIds: data.attachmentIds === undefined ? undefined : data.attachmentIds,
//       },
//     });

//     return updatedTicket;
//   };

// Delete a ticket
export const deleteTicket = async (ticketId: string) => {
    const ticket = await prisma.ticket.delete({
        where: { ticketId },
    });
    return ticket;
};

// Assign a ticket to a user
export const assignTicket = async (ticketId: string, email: string) => {
    const ticket = await prisma.ticket.update({
        where: { ticketId },
        data: { assignedToEmail: email, status: TicketStatus.assigned },
    });
    return ticket;
};

// Close a ticket
export const closeTicket = async (ticketId: string) => {
    const ticket = await prisma.ticket.update({
        where: { ticketId },
        data: { status: TicketStatus.closed, closedAt: new Date() },
    });
    return ticket;
};

// Reopen a ticket
export const reopenTicket = async (ticketId: string) => {
    const ticket = await prisma.ticket.update({
        where: { ticketId },
        data: { status: TicketStatus.new, closedAt: null },
    });
    return ticket;
};

// Add a comment to a ticket
export async function addCommentToTicket(ticketId: string, contentText: string, authorEmail: string) {
    const comment = await prisma.comment.create({
        data: {
            content: contentText,  // Use 'content' instead of 'comment'
            ticket: {
                connect: {
                    ticketId: ticketId,  // Connect the comment to the ticket using the ticketId
                },
            },
            authorEmail: authorEmail,  // Include the author email
        },
    });
    return comment;
}

// List all tickets with filters
export const listTickets = async (filters?: {
    status?: TicketStatus;
    assignedToEmail?: string;
    createdByEmail?: string;
    type?: TicketType;
    priority?: TicketPriority;
}) => {
    const tickets = await prisma.ticket.findMany({
        where: filters,
    });
    return tickets;
};
