import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"
import { clubPostsService } from "./ClubPostsService.js"
import { clubsService } from "./ClubsService.js"

class ClubMembersService {
  async editMemberRole(body, userId, memberId) {
    const clubMember = await this.getClubMemberById(memberId)
    const club = await clubsService.getClubById(clubMember.clubId)
    if (userId == clubMember.creatorId) {
      throw new Forbidden('You cannot adjust your own role.')
    }
    if (userId != club.creatorId.toString()) {
      throw new Forbidden('Only the owner of the club can promote and demote members.')
    }
    if (body.role != 'admin' && body.role != 'member' && body.role != undefined) {
      throw new Forbidden('You can only make a member a role of member or admin.')
    }
    if (body.status != 'joined' && body.status != 'blocked' && body.status != undefined) {
      throw new BadRequest('You can only accept a join request or block it.')
    }
    if (clubMember.status == 'blocked') {
      throw new Forbidden('You cannot switch a user to joined once blocked. You must unblock them, and have them request to join again.')
    }
    clubMember.role = body.role || clubMember.role
    clubMember.status = body.status || clubMember.status
    clubMember.save()
    return clubMember
  }
  async getUserClubs(userId) {
    const clubs = await dbContext.ClubMembers.find({ creatorId: userId }).populate('club')
    return clubs
  }
  async getClubMembers(clubId) {
    const clubMembers = await dbContext.ClubMembers.find({ clubId: clubId }).populate('profile', 'name picture')
    return clubMembers
  }
  async getClubMemberById(memberId) {
    const clubMember = await dbContext.ClubMembers.findById(memberId).populate('profile club', 'name picture')
    if (!clubMember) {
      throw new BadRequest(`ClubMember with id ${memberId} does not exist.`)
    }
    return clubMember
  }
  async becomeMember(memberData) {
    memberData.role = 'member'
    const member = await dbContext.ClubMembers.create(memberData)
    await member.populate('profile', 'name picture')
    await member.populate({ path: 'club', populate: { path: 'creator memberCount' } })
    return member
  }

  async becomeCreator(clubId, creatorId) {
    await dbContext.ClubMembers.create({ clubId, creatorId, role: 'creator', status: 'joined' })
  }

  async removeMember(memberId, userId) {
    const memberToDelete = await dbContext.ClubMembers.findById(memberId)
    if (!memberToDelete) {
      throw new BadRequest('There is no such member to delete...')
    }
    if (!memberToDelete.creatorId == userId && memberToDelete.status == 'blocked') {
      throw new BadRequest('This club has blocked you, you cannot unblock yourself.')
    }
    const club = await clubsService.getClubById(memberToDelete.clubId)
    if (club.creatorId.toString() == memberToDelete.creatorId.toString()) {
      throw new Forbidden("You can't leave a club you created.")
    }
    if (club.creatorId.toString() != userId && memberToDelete.creatorId.toString() != userId) {
      throw new Forbidden("You cannot delete another person's membership, unless you are the owner of the club.")
    }
    await memberToDelete.remove()
    return memberToDelete
  }

}

export const clubMembersService = new ClubMembersService()