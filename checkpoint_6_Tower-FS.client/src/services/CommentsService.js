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

}

export const commentsService = new CommentsService()