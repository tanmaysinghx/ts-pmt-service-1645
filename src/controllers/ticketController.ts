import { Request, Response } from 'express';
import * as ticketService from '../services/ticketService';

export const createTicket = async (req: Request, res: Response): Promise<any> => {
  try {
    const ticket = await ticketService.createTicket(req.body);
    return res.status(201).json(ticket);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create ticket' });
  }
};

export const getTicketById = async (req: Request, res: Response): Promise<any> => {
  const { ticketId } = req.params;
  try {
    const ticket = await ticketService.getTicketById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    return res.json(ticket);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch ticket' });
  }
};

// export const updateTicket = async (req: Request, res: Response): Promise<any> => {
//   const { ticketId } = req.params;
//   try {
//     const updatedTicket = await ticketService.updateTicket(ticketId, req.body);
//     return res.json(updatedTicket);
//   } catch (error) {
//     return res.status(500).json({ error: 'Failed to update ticket' });
//   }
// };

export const deleteTicket = async (req: Request, res: Response): Promise<any> => {
  const { ticketId } = req.params;
  try {
    await ticketService.deleteTicket(ticketId);
    return res.status(204).send();  // No content
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete ticket' });
  }
};

export const assignTicket = async (req: Request, res: Response): Promise<any> => {
  const { ticketId } = req.params;
  const { email } = req.body;
  try {
    const assignedTicket = await ticketService.assignTicket(ticketId, email);
    return res.json(assignedTicket);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to assign ticket' });
  }
};

export const closeTicket = async (req: Request, res: Response): Promise<any> => {
  const { ticketId } = req.params;
  try {
    const closedTicket = await ticketService.closeTicket(ticketId);
    return res.json(closedTicket);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to close ticket' });
  }
};

export const reopenTicket = async (req: Request, res: Response): Promise<any> => {
  const { ticketId } = req.params;
  try {
    const reopenedTicket = await ticketService.reopenTicket(ticketId);
    return res.json(reopenedTicket);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to reopen ticket' });
  }
};

export const addComment = async (req: Request, res: Response): Promise<any> => {
  const { ticketId } = req.params;
  const { comment } = req.body;
  try {
    const ticketWithComment = await ticketService.addCommentToTicket(ticketId, comment, "dummyEmail@gmail.com");
    return res.json(ticketWithComment);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to add comment' });
  }
};

export const listTickets = async (req: Request, res: Response): Promise<any> => {
  try {
    const tickets = await ticketService.listTickets(req.query);
    return res.json(tickets);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to list tickets' });
  }
};
