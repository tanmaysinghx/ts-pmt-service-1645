import express from 'express';
import { createTicket, getTicketById, deleteTicket, listTickets, assignTicket, closeTicket, reopenTicket, addComment } from '../controllers/ticketController';

const router = express.Router();

router.post('/api/tickets', createTicket);
router.get('/api/tickets/:ticketId', getTicketById);
// router.put('/api/tickets/:ticketId', updateTicket);
router.delete('/api/tickets/:ticketId', deleteTicket);
router.get('/api/tickets', listTickets);
router.post('/api/tickets/:ticketId/assign', assignTicket);
router.post('/api/tickets/:ticketId/close', closeTicket);
router.post('/api/tickets/:ticketId/reopen', reopenTicket);
router.post('/api/tickets/:ticketId/comment', addComment);

export default router;
