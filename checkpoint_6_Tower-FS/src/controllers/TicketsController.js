import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";


export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.removeTicket)
    }
    async createTicket(request, response, next) {
        try {
            const ticketBody = request.body
            ticketBody.accountId = request.userInfo.id
            const ticket = await ticketsService.createTicket(ticketBody)
            response.send(ticket)
        } catch (error) {
            next(error)
        }
    }
    async removeTicket(request, response, next) {
        try {
            const message = await ticketsService.removeTicket(request.params.ticketId, request.userInfo.id)
            response.send(message)
        } catch (error) {
            next(error)
        }

    }

}