import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { postCommentsService } from "../services/PostCommentsService.js";

export class PostCommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      //routes
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .put('/:commentId', this.editComment)
      .delete('/:commentId', this.removeComment)
  }
  async createComment(req, res, next) {
    try {
      const commentData = req.body

      commentData.creatorId = req.userInfo.id

      const comment = await postCommentsService.createComment(commentData)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async editComment(req, res, next) {
    try {
      const commentData = req.body

      const commentId = req.params.commentId

      const userId = req.userInfo.id

      const editedComment = await postCommentsService.editComment(commentData, commentId, userId)

      return res.send(editedComment)
    } catch (error) {
      next(error)
    }
  }

  async removeComment(req, res, next) {
    try {
      const commentId = req.params.commentId

      const userId = req.userInfo.id

      const comment = await postCommentsService.removeComment(commentId, userId)

      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }
}