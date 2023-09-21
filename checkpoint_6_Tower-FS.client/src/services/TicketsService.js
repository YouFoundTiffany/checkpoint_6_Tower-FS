import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"




class TicketsService {
    async createTicket(ticketData) {
        const response = await api.post('api/tickets', ticketData)
        logger.log('new ticket holder', response.data)
        AppState.activeEventTickets.push(new Ticket(response.data))
    }

    async removeTicket(ticketId) {
        const response = await api.delete(`api/tickets/${ticketId}`)
        logger.log('ripped up ticket', response.data)
        let indexToRemove = AppState.activeEventTickets.findIndex(ticket => ticket.id == ticketId)
        AppState.activeEventTickets.splice(indexToRemove, 1)
    }
}

export const ticketsService = new TicketsService()
