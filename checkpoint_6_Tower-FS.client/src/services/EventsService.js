// import { AppState } from "../AppState.js"
// import { Event } from "../models/Event.js"
import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
import { AppState } from "../AppState.js"



class EventsService{

    async getEvents() {
        const response = await api.get('api/events')
        logger.log('🗼got Events', response.data)
        AppState.events = response.data.map(event => new Event(event))
}

    async createEvent(eventData) {
        const response = await api.post('api/events', eventData)
        logger.log('created Event!', response.data)
        // NOTE unshift adds the newest item to the start and push to the end (for best use case, consider how your server data is returned)
        const newEvent = new this.Event(response.data)
        AppState.events.unshift(newEvent)
        // or?
        // AppState.evetns.push(new Event(response.data))
        return newEvent
    }
    async getEventById(eventId) {
        const response = await api.get(`api/events/${eventId}`)
        logger.log('got one event :D', response.data)
        AppState.activeEvent = new this.Event(response.data)
    }

    async getTicketsByEventId(eventId){
        const response = await api.get(`api/events/${eventId}/tickets`)
        logger.log('tickets for this event', response.data)
        AppState.activeEventTickets = response.data.map(ticket => new Ticket(ticket))
        // TODO
    }

}
export const eventsService = new EventsService()