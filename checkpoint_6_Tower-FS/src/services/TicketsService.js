import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService {
    getTicketOnEvent(evenId) {
        throw new Error("Method not implemented.")
    }

}

export const ticketsService = new TicketsService()