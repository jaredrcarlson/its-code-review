import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"

class ClubsService {
  async getClubs(page, search) {
    const clubsData = {}
    const clubs = await dbContext.Clubs.find({ "name": { "$regex": search, "$options": "i" } })
      .sort({ name: 1 })
      .skip(page * 10)
      .limit(10)
      .populate('creator', 'name picture')
      .populate('memberCount')

    clubsData.clubs = clubs
    clubsData.total = await dbContext.Clubs.countDocuments({ "name": { "$regex": search, "$options": "i" } })
    if ((page + 1) * 10 < clubsData.total) {
      clubsData.next = `http://localhost:3000/api/clubs?page=${parseInt(page) + 1}&search=${search}`
    }
    else {
      clubsData.next = null
    }
    if (page - 1 >= 0) {
      clubsData.prev = `http://localhost:3000/api/clubs?page=${parseInt(page) - 1}&search=${search}`
    }
    else {
      clubsData.prev = null
    }
    return clubsData
  }
  async getClubById(clubId) {
    const club = await dbContext.Clubs.findById(clubId)
    if (!club) {
      throw new BadRequest(`There is no club with id of ${clubId}`)
    }
    await club.populate('creator', 'name picture')
    await club.populate('memberCount')
    return club
  }

  async createClub(clubData) {
    const club = await dbContext.Clubs.create(clubData)
    await club.populate('creator', 'name picture')
    await club.populate('memberCount')
    return club
  }
  async updateClub(clubId, userId, clubData) {
    const originalClub = await this.getClubById(clubId)
    if (originalClub.creatorId.toString() != userId) {
      throw new Forbidden(`You aren't the creator of ${originalClub.name}, you can't update it!`)
    }
    originalClub.name = clubData.name || originalClub.name
    originalClub.description = clubData.description || originalClub.description
    originalClub.coverImg = clubData.coverImg || originalClub.coverImg

    let updatedClub = await originalClub.save()

    return updatedClub
  }
  async removeClub(clubId, userId) {
    const clubToDelete = await this.getClubById(clubId)
    if (clubToDelete.creatorId.toString() != userId) {
      throw new Forbidden("You aren't the creator of this club, you can NOT delete it.")
    }
    await clubToDelete.remove()
    await dbContext.ClubMembers.deleteMany({ clubId: clubId })
    await dbContext.Posts.deleteMany({ clubId: clubId })
    await dbContext.PostComments.deleteMany({ clubId: clubId })
    await dbContext.ClubBooks.deleteMany({ clubId: clubId })
  }
}
export const clubsService = new ClubsService()