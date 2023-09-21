import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";


export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:commentId', this.removeComment)
    }

    async createComment(request, response, next) {
        try {
            const commentBody = request.body
            commentBody.creatorId = request.userInfo.id
            const comment = await commentsService.createComment(commentBody)
            response.send(comment)
        } catch (error) {
            next(error)
        }
    }
    async removeComment(request, response, next) {
        try {
            const comment = await commentsService.removeComment(request.params.commentId, request.userInfo.id)
            response.send(comment)
        } catch (error) {
            next(error)
        }

    }
}

