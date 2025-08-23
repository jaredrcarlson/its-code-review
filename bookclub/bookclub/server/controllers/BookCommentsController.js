import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { bookCommentsService } from "../services/BookCommentsService.js";
import { BadRequest } from "../utils/Errors.js";

export class BookCommentsController extends BaseController {
  constructor() {
    super('api/bookComments')

    this.router
      .get('', this.getCommentsByGbId)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .put('/:bookCommentId', this.editComment)
      .delete('/:bookCommentId', this.removeComment)
  }

  /**
   * @param req The user must provide a query with the Google Books id of the specific book they want to see the comments on. If no "gbId" is provided, the user will be notified with an error.
   * @param res The response will be a list of comments associated with the specified gbId, based on a filter in the service.
   */
  async getCommentsByGbId(req, res, next) {
    try {
      const gbId = req.query.gbId

      if (!gbId) {
        throw new BadRequest('No Google Books volume exists at this id. Did you query an id?')
      }

      const bookComments = await bookCommentsService.getCommmentsByGbId(gbId)

      return res.send(bookComments)
    } catch (error) {
      next(error)
    }
  }
  async createComment(req, res, next) {
    try {
      const commentData = req.body

      commentData.creatorId = req.userInfo.id

      const newComment = await bookCommentsService.createComment(commentData)

      return res.send(newComment)
    } catch (error) {
      next(error)
    }
  }

  async editComment(req, res, next) {
    try {
      const commentId = req.params.bookCommentId

      const commentData = req.body

      const userId = req.userInfo.id

      const editedComment = await bookCommentsService.editComment(commentId, commentData, userId)

      return res.send(editedComment)
    } catch (error) {
      next(error)
    }
  }

  async removeComment(req, res, next) {
    try {
      const commentId = req.params.bookCommentId

      const userId = req.userInfo.id

      const comment = await bookCommentsService.removeComment(commentId, userId)

      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }
}