import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class CommentsService {
    async createComment(commentBody) {
        // Logger.log('what came over from the form?', commentBody)
        const comment = await dbContext.Comments.create(commentBody)
        // FIXME Original version. changed from ('creator') to event
        await comment.populate('creator')

        // await comment.populate('eventId')
        // await comment.populate('profile')

        return comment
    }


    async getCommentsOnEvent(eventId) {
        await eventsService.getEventById(eventId)
        const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator')
        return comments
    }
    async removeComment(commentId) {
        const comment = await dbContext.Comments.findById(commentId).populate('creator eventId')
        if (!comment) throw new BadRequest(`No Comment at this Id ${commentId}`)


        await comment.remove()
        // @ts-ignore
        return `You, ${comment.creator.name}, have successfully removed your comment on ${comment.eventId}`

    }


}

export const commentsService = new CommentsService()