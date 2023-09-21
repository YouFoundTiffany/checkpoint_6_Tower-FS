
import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class CommentsService {
    async createComment(commentBody) {
        const comment = await dbContext.Comments.create(commentBody)
        await comment.populate('creator')
        return comment
    }


    async getCommentsOnEvent(eventId) {
        await eventsService.getEventById(eventId)
        const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator')
        return comments
    }
    async removeComment(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)
        // .populate('creatorId eventId')
        if (!comment) throw new BadRequest(`No Comment at this Id ${commentId}`)
        if (userId != comment.creatorId) throw new Forbidden(`You did not make this Comment. Id: ${commentId}`)

        await comment.remove()
        // @ts-ignore
        return `You, ${comment.creator.name}, have successfully removed your comment on ${comment.eventId}`

    }


}

export const commentsService = new CommentsService()