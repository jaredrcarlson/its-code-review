import { AppState } from "../AppState.js"
import { ClubPost } from "../models/ClubPost.js"
import { PostComment } from "../models/PostComment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ClubPostsService {
  async getClubPosts(clubId) {
    const res = await api.get(`api/clubs/${clubId}/posts`)
    logger.log('[ARE WE GETTING POSTS?]', res.data)
    const clubPosts = res.data.map(post => new ClubPost(post))
    AppState.clubPosts = clubPosts
  }
  async getPostById(postId) {

    const res = await api.get(`api/posts/${postId}`)
    logger.log('[AM I GRABBING THE RIGHT POST?]', res.data)
    const clubPost = new ClubPost(res.data)
    AppState.activeClubPost = clubPost
  }
  async getPostComments(postId) {
    const res = await api.get(`api/posts/${postId}/comments`)
    logger.log('[THE POST COMMENTS]', res.data)
    const postComments = res.data.map(comment => new PostComment(comment))
    AppState.postComments = postComments
  }
  async getClubAnnouncements(clubId) {
    const res = await api.get(`api/clubs/${clubId}/announcements`)
    logger.log('[CLUB ANNOUNCEMENTS...]', res.data)
    const announcements = res.data.map(announcement => new ClubPost(announcement))
    AppState.clubAnnouncements = announcements
  }

  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    // logger.log('Is it making it to the service?')
    logger.log('[DID I CREATE A POST?]', res.data)
    const clubPost = new ClubPost(res.data)

    if (postData.isAnnouncement == true) {
      AppState.clubAnnouncements.unshift(clubPost)
    } else {
      AppState.clubPosts.unshift(clubPost)
    }
    return clubPost
  }

  async editPost(postData) {
    const res = await api.put(`api/posts/${postData.id}`, postData)
    logger.log('[DID I EDIT A POST?]', res.data)
    const post = new ClubPost(res.data)
    const clubPostIndex = AppState.clubPosts.findIndex(post => post.id == postData.id)
    AppState.activeClubPost = post
    AppState.clubPosts.splice(clubPostIndex, 1, post)
  }

  async deletePost(postId) {
    const res = await api.delete(`api/posts/${postId}`)
    // logger.log('here is the res data for deleting...', res.data)
    AppState.clubPosts = AppState.clubPosts.filter(clubPost => clubPost.id != postId)
    // logger.log('did it delete my post?')
  }
}

export const clubPostsService = new ClubPostsService()