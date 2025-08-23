import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { clubMembersService } from "./ClubMembersService.js"
import { clubPostsService } from "./ClubPostsService.js"
import { clubsService } from "./ClubsService.js"

class PostCommentsService {
  async getPostComments(postId, uid) {
    const clubId = (await clubPostsService.getPostById(postId, uid)).clubId
    const club = await clubsService.getClubById(clubId)
    if (!club.private || await clubPostsService.isAllowed(clubId, uid)) {
      const postComments = await dbContext.PostComments.find({ postId: postId })
        .populate('creator', 'name picture')
        .populate('membership')
      return postComments
    }
  }

  async getCommentById(commentId) {
    const postComment = await dbContext.PostComments.findById(commentId)
    if (!postComment) {
      throw new BadRequest(`There is no comment with the ID ${commentId}`)
    }
    await postComment.populate('creator', 'name picture')
    await postComment.populate('membership')
    return postComment
  }

  async createComment(commentData) {
    const memberships = await clubMembersService.getUserClubs(commentData.creatorId)
    const clubId = (await clubPostsService.getPostById(commentData.postId, commentData.creatorId)).clubId.toString()
    if (!memberships.find(m => m.clubId.toString() == clubId)) {
      throw new BadRequest("You cannot post a comment in clubs you are not a member of.")
    }
    const newComment = await dbContext.PostComments.create(commentData)
    await newComment.populate('creator', 'name picture')
    await newComment.populate('membership')
    return newComment
  }

  async editComment(commentData, commentId, userId) {
    const originalComment = await this.getCommentById(commentId)
    if (originalComment.creatorId != userId) {
      throw new Forbidden('You are not the creator of this comment. You may not edit a comment that you have not created.')
    }

    originalComment.body = commentData.body || originalComment.body

    let editedComment = await originalComment.save()
    return editedComment
  }

  async removeComment(commentId, userId) {
    const commentToRemove = await this.getCommentById(commentId)
    if (commentToRemove.creatorId.toString() != userId) {
      throw new Forbidden('You are not the creator of this comment. You may not delete a comment that you have not created.')
    }
    await commentToRemove.remove()
    return commentToRemove
  }

}
export const postCommentsService = new PostCommentsService()