import { AppState } from "../AppState.js"
import { TEvent } from "../models/Event.js"
import { Ticket } from "../models/Ticket.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"




class EventsService{

    async getEvents() {
        const response = await api.get('api/events',{params: {isCanceled: false}})

        logger.log('🗼got Events', response.data)
        AppState.events = response.data.map(event => new TEvent(event))
}

    async createEvent(eventData) {
        const response = await api.post('api/events', eventData)
        logger.log('created Event!', response.data)

        // const newEvent = new TEvent(response.data)
        // AppState.events.unshift(newEvent)
        // or?
        // AppState.events.push(new Event(response.data))
        return response.data
    }

    async getCommentsByEventId(eventId) {
        const response = await api.get(`api/events/${eventId}/comments`)
        logger.log('get comments', response.data)
        AppState.activeEventComments = response.data.map(comment => new Comment(comment))
   }
    async getEventById(eventId) {
        const response = await api.get(`api/events/${eventId}`)
        logger.log('got one event :D', response.data)
        AppState.activeEvent = new TEvent(response.data)
    }

    async getTicketsByEventId(eventId){
        const response = await api.get(`api/events/${eventId}/tickets`)
        logger.log('tickets for this event', response.data)
        AppState.activeEventTickets = response.data.map(ticket => new Ticket(ticket))
    }
    async cancelEvent(eventId) {
        const response = await api.delete(`api/events/${eventId}`)

        logger.log('canceled event!', response.data)

        // testing this line
        AppState.lastCanceledEvent = AppState.activeEvent;


        // AppState.activeEvent = null
        let indexToRemove = AppState.events.findIndex(event => event.id == eventId)
        if (indexToRemove >= 0) {
            AppState.events.splice(indexToRemove, 1)
        }
    }


}
export const eventsService = new EventsService()