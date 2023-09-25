import { dbContext } from "../db/DbContext.js";
import { AccountSchema } from "../models/Account.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { accountService } from "./AccountService.js";


class EventsService {

    async getEvents(query) {

        const events = await dbContext.Events.find(query).populate('creator ticketCount')
        return events
    }

    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId).populate('creator ticketCount')
        if (!event) {
            throw new BadRequest(`no event at id: ${eventId}`)
        }
        return event
    }


    async editEvent(eventId, updates, accountId) {
        const originalEvent = await dbContext.Events.findById(eventId)

        if (!originalEvent) throw new Error('No Event with that Id: ${eventId}')

        if (originalEvent.isCanceled == true) throw new Forbidden('This Event is Canceled')

        // FIXME FOR BAD REQUESTS?
        // if (accountId != originalEvent.creatorId) throw new Forbidden('You do not own this event!')

        originalEvent.name = updates.name || originalEvent.name
        originalEvent.description = updates.description || originalEvent.description
        originalEvent.coverImg = updates.coverImg || ''
        originalEvent.location = updates.location || originalEvent.location
        originalEvent.capacity = updates.capacity || originalEvent.capacity
        originalEvent.startDate = updates.startDate || originalEvent.startDate

        await originalEvent.save()
        return originalEvent

    }




    async createEvent(eventBody) {
        const event = await dbContext.Events.create(eventBody)
        await event.populate('creator ticketCount')
        return event
    }

    async cancelEvent(eventId, userId) {
        const event = await this.getEventById(eventId)
        if (event.creatorId != userId) throw new Forbidden('Not Owner of Event')
        event.isCanceled = !event.isCanceled
        await event.save()
        return event
    }
}

export const eventsService = new EventsService