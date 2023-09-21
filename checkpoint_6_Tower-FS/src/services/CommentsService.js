
import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class CommentsService {


    async getCommentsOnEvent(eventId) {
        await eventsService.getEventById(eventId)
        const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator event')
        return comments
    }



}

export const commentsService = new CommentsService()