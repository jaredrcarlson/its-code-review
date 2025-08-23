import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { clubMembersService } from "./ClubMembersService.js"
import { clubsService } from "./ClubsService.js"

class ClubPostsService {

  async isAllowed(clubId, uid) {
    const clubMembers = await clubMembersService.getClubMembers(clubId)
    const foundMembership = clubMembers.find(m => m.creatorId == uid)
    if (!foundMembership || foundMembership.status == 'pending' || foundMembership.status == 'blocked') {
      throw new Forbidden("You cannot access a private club unless you are a member")
    }
    return true
  }

  async getClubPosts(clubId, uid) {
    const club = await clubsService.getClubById(clubId)
    if (!club.private || await this.isAllowed(clubId, uid)) {
      const clubPosts = await dbContext.Posts.find({ clubId: clubId, isAnnouncement: false })
        .populate('creator', 'name picture')
        .populate('commentCount')
        .populate('membership')
      return clubPosts
    }
  }
  async getPostById(postId, uid) {
    const clubPost = await dbContext.Posts.findById(postId)
    if (!clubPost) {
      throw new BadRequest(`There is no such post with the id of ${postId}`)
    }
    const club = await clubsService.getClubById(clubPost.clubId)
    if (!club.private || await this.isAllowed(club.id, uid)) {
      await clubPost.populate('creator', 'name picture')
      await clubPost.populate('commentCount')
      await clubPost.populate('membership')
      return clubPost
    }
  }

  async getClubPostAnnouncements(clubId, uid) {
    const club = await clubsService.getClubById(clubId)
    if (!club.private || await this.isAllowed(clubId, uid)) {
      const clubPosts = await dbContext.Posts.find({ clubId: clubId, isAnnouncement: true })
        .populate('creator', 'name picture')
        .populate('commentCount')
        .populate('membership')
      return clubPosts
    }
  }

  async createPost(postData) {

    const newPost = await dbContext.Posts.create(postData)
    await newPost.populate('creator', 'name picture')
    await newPost.populate('commentCount')
    await newPost.populate('membership')
    return newPost
  }
  async updatePost(postId, userId, postData) {
    const originalPost = await this.getPostById(postId, userId)
    if (originalPost.creatorId.toString() != userId) {
      throw new Forbidden(`You aren't the creator of the post titled "${originalPost.title}"!`)
    }
    originalPost.body = postData.body || originalPost.body
    originalPost.title = postData.title || originalPost.title
    let updatedPost = await originalPost.save()
    return updatedPost
  }

  async removePost(postId, userId) {
    const postToRemove = await this.getPostById(postId, userId)
    if (postToRemove.creatorId.toString() != userId) {
      throw new Forbidden("You can't delete a post you did not make!")
    }
    await postToRemove.remove()
    await dbContext.PostComments.deleteMany({ postId: postToRemove.id })
    return postToRemove
  }

}

export const clubPostsService = new ClubPostsService()