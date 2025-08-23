import { AppState } from "../AppState.js"
import { Club } from "../models/Club.js"
import { Member } from "../models/Member.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"
import { booksService } from "./BooksService.js"
import { membersService } from "./MembersService.js"

class ClubsService {
  async getAllClubs(searchQuery) {
    const res = await api.get('api/clubs',
      {
        params: { search: searchQuery }
      })
    // logger.log('[GOT CLUBS]', res.data.clubs)
    AppState.clubs = res.data.clubs.map(pojo => new Club(pojo))
    AppState.nextPage = res.data.next
    AppState.prevPage = res.data.prev
  }

  async getNextClubsPage() {
    const res = await api.get(AppState.nextPage)
    // logger.log('[GOT CLUBS]', res.data.clubs)
    AppState.clubs = res.data.clubs.map(pojo => new Club(pojo))
    AppState.nextPage = res.data.next
    AppState.prevPage = res.data.prev
  }

  async getPrevClubsPage() {
    const res = await api.get(AppState.prevPage)
    // logger.log('[GOT CLUBS]', res.data.clubs)
    AppState.clubs = res.data.clubs.map(pojo => new Club(pojo))
    AppState.nextPage = res.data.next
    AppState.prevPage = res.data.prev
  }

  async getClubById(clubId) {
    const res = await api.get(`api/clubs/${clubId}`)
    // logger.log('[GOT CLUB BY ID]', res.data)
    AppState.selectedClub = new Club(res.data)
  }

  async getMyClubs() {
    try {
      const res = await api.get('account/clubs')
      logger.log('[GOT ACCOUNT CLUBS]', res.data)
      AppState.myMemberships = res.data.map(pojo => new Member(pojo))
    } catch (error) {
      Pop.error(error.message)
    }
  }

  async createClub(clubData) {
    const res = await api.post(`api/clubs`, clubData)
    // logger.log(`[CREATED CLUB]`, res.data)
    return res.data
  }

  async setBookDetailsPageClubs(gbId, status) {
    const allClubBooks = await booksService.getClubBooksByGbId(gbId)
    const statusClubBooks = allClubBooks.filter((clubBook) => clubBook.status == status)
    // console.log(`[GOT CLUB BOOKS BY STATUS: ${status}]`, statusClubBooks)
    AppState.bookDetailsPage.clubs[status] = statusClubBooks.map((clubBook) => new Club(clubBook.club))
  }

  async setBookDetailsPageUserClubs() {
    const allClubMemberships = await membersService.getMembershipsByUserId()
    AppState.bookDetailsPage.userClubs = allClubMemberships.map((membership) => new Club(membership.club))
    // logger.log('[GOT USER CLUB MEMBERSHIPS]', allClubMemberships)
    const creatorAdminMemberships = allClubMemberships.filter(membership => membership.role == 'creator' || membership.role == 'admin')
    // logger.log('[GOT USER CREATOR/ADMIN MEMBERSHIPS]', creatorAdminMemberships)
    AppState.bookDetailsPage.userCreatorAdminClubs = creatorAdminMemberships.map((membership) => new Club(membership.club))
  }

  async editClub(clubData) {
    // logger.log('is it reaching the service?')
    const res = await api.put(`api/clubs/${clubData.id}`, clubData)
    const club = new Club(res.data)
    // logger.log('[club info?]', club)
    // const clubIndex = AppState.clubs.findIndex(c => c.id == clubData.id)
    AppState.selectedClub = club
  }

  async deleteClub(clubId) {
    const res = await api.delete(`api/clubs/${clubId}`)
    AppState.clubs = AppState.clubs.filter(c => c.id != clubId)
  }
}

export const clubsService = new ClubsService