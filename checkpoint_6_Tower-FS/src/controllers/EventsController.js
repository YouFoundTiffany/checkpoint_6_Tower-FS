import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";



export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/comments', this.getCommentsOnEvent)
            .get('/:eventId/tickets', this.getTicketsOnEvent)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .put('/:eventId', this.editEvent)
            .post('', this.createEvent)
            .delete('/:eventId', this.cancelEvent)
    }


    async getEvents(request, response, next) {
        try {
            const events = await eventsService.getEvents(request.query)
            response.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(request, response, next) {
        try {
            const event = await eventsService.getEventById(request.params.eventId)
            response.send(event)
        } catch (error) {
            next(error)
        }

    }

    async getCommentsOnEvent(request, response, next) {
        try {
            const comments = await commentsService.getCommentsOnEvent(request.params.eventId)
            response.send(comments)
        } catch (error) {
            next(error)
        }
    }

    async getTicketsOnEvent(request, response, next) {
        try {
            const tickets = await ticketsService.getTicketsOnEvent(request.params.eventId)
            response.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(request, response, next) {
        try {
            const updates = request.body
            const eventId = request.params.eventId
            const editEvent = await eventsService.editEvent(eventId, updates)
            response.send(editEvent)
        } catch (error) {
            next(error)
        }

    }

    async createEvent(request, response, next) {
        try {
            const eventBody = request.body
            eventBody.creatorId = request.userInfo.id
            const event = await eventsService.createEvent(eventBody)
            response.send(event)
        } catch (error) {
            next(error)
        }

    }



    async cancelEvent(request, response, next) {
        try {
            const event = await eventsService.cancelEvent(request.params.eventId, request.userInfo.id)
            request.send(event)
        } catch (error) {
            next(error)
        }
    }


}

