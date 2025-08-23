import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class CommentsService {
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator')
    return comment
  }

  async getCommentById(commentId) {
    const comment = await dbContext.Comments.findById(commentId).populate('creator')
    if (!comment) {
      throw new BadRequest('The requested resource does not exist.')
    }
    return comment
  }

  async getCommentsByEventId(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator')
    return comments
  }

  async deleteComment(accountId, commentId) {
    const comment = await this.getCommentById(commentId)
    if (accountId != comment.creatorId) {
      throw new Forbidden('Insufficient permissions for this request.')
    }
    comment.remove()
    return `Comment with id: ${commentId} was deleted successfully.`
  }
}

export const commentsService = new CommentsService()