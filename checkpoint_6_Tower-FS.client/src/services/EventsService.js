// import { AppState } from "../AppState.js"
// import { Event } from "../models/Event.js"
import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"



class EventsService{

    async getEvents() {
        const response = await api.get('api/events')
        logger.log('🗼got Events', response.data)
}



}

export const eventsService = new EventsService()