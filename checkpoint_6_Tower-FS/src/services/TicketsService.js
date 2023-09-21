import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService {


    async createTicket(ticketBody) {
        const ticket = await dbContext.Tickets.create(ticketBody)
        await ticket.populate('event')
        await ticket.populate('profile', '-email')
        return ticket

    }
    async getTicketsOnEvent(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId }).populate('profile', '-email')
        return tickets

    }

    async removeTicket(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId).populate('event profile')

        if (!ticket) throw new BadRequest(`No ticket with this Id ${ticketId}`)

        if (userId != ticket.accountId) throw new Forbidden(`You don't own this ticket.`)

        await ticket.remove()


        // @ts-ignore
        return `${ticket.profile.name} is no longer attending ${ticket.event.name}`
    }

    async getTicketsByAccount(userId) {
        const tickets = await dbContext.Tickets.find({ accountId: userId }).populate({ path: 'event', populate: { path: 'creator ticketCount', select: '-email' } })
        return tickets


    }

}

export const ticketsService = new TicketsService()