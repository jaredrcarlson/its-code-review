import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService {
  async createTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile event')
    return ticket
  }

  async getTicketById(ticketId) {
    const ticket = await dbContext.Tickets.findById(ticketId)
    await ticket.populate('profile event')
    if (!ticket) {
      throw new BadRequest('The requested resource does not exist.')
    }
    return ticket
  }

  async getTicketsByAccountId(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId }).populate('profile event')
    return tickets
  }

  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate('profile event')
    return tickets
  }

  async deleteTicket(accountId, ticketId) {
    const ticket = await this.getTicketById(ticketId)
    if (accountId != ticket.accountId) {
      throw new Forbidden('Insufficient permissions for this request.')
    }
    ticket.remove()
    return `Ticket with id: ${ticketId} was deleted successfully.`
  }
}

export const ticketsService = new TicketsService()