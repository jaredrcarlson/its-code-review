import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class BookCommentsService {
  async getCommmentsByGbId(gbId) {
    const bookComments = await dbContext.BookComments.find({ gbId })
      .populate('creator', 'name picture')

    return bookComments
  }
  async createComment(commentData) {
    const newComment = await dbContext.BookComments.create(commentData)

    await newComment.populate('creator', 'name picture')

    return newComment
  }

  async editComment(commentId, commentData, userId) {
    let originalComment = await dbContext.BookComments.findById(commentId)

    if (!originalComment) {
      throw new BadRequest('There is no book comment with this id.')
    }
    if (originalComment.creatorId != userId) {
      throw new Forbidden('You are not the creator of this comment. You may not edit a comment that you did not create.')
    }

    originalComment.content = commentData.content || originalComment.content

    const editedComment = await originalComment.save()

    return editedComment
  }

  async removeComment(commentId, userId) {
    const commentToRemove = await dbContext.BookComments.findById(commentId)

    if (!commentToRemove) {
      throw new BadRequest('There is no book comment with this id.')
    }
    if (commentToRemove.creatorId != userId) {
      throw new Forbidden('You are not the creator of this comment. You may not edit a comment that you did not create.')
    }

    await commentToRemove.remove()
    return commentToRemove
  }

}

export const bookCommentsService = new BookCommentsService