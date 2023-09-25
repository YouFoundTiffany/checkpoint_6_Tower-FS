import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"




class CommentsService {
    async createComment(commentData) {
        const response = await api.post('api/comments', commentData)
        logger.log('added comment', response.data)
        AppState.activeEventComments.push(new Comment(response.data))
    }
    async deleteComment(commentId) {
        const response = await api.delete(`api/comments/${commentId}`)

        logger.log('canceled comment', response.data)

        AppState.activeEventComment = null

        let indextoRemove = AppState.activeEventComments.findIndex(comment => comment.id == commentId)

        if (indextoRemove >= 0) {
            AppState.activeEventComments.splice(indextoRemove, 1)
        }

}
}

export const commentsService = new CommentsService()