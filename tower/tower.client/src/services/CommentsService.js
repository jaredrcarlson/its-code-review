import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { Comment } from "../models/Comment.js"

class CommentsService {
  async createComment(commentData) {
    const res = await api.post('api/comments', commentData)
    AppState.activeEventComments.push(new Comment(res.data))
  }

  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    AppState.activeEventComments = res.data.map(data => new Comment(data))
  }

  async deleteComment(commentId) {
    await api.delete(`api/comments/${commentId}`)
    const commentIndex = AppState.activeEventComments.findIndex(comment => comment.id == commentId)
    AppState.activeEventComments.splice(commentIndex, 1)
  }
}

export const commentsService = new CommentsService()