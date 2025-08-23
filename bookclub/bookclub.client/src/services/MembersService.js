import { AppState } from "../AppState.js"
import { Member } from "../models/Member.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class MembersService {
  async getMembersByClubId(clubId) {
    const res = await api.get(`api/clubs/${clubId}/members`)

    logger.log('[GOT CLUB MEMBERS]', res.data)

    AppState.members = res.data.map(pojo => new Member(pojo))
  }

  async becomeMember(memberData) {
    const res = await api.post('api/members', memberData)

    logger.log('[BECAME A MEMBER]', res.data)

    // AppState.members.push(new Member(res.data))

    AppState.myMemberships.push(new Member(res.data))
  }

  async leaveClub(memberId) {
    const res = await api.delete(`api/members/${memberId}`)

    logger.log('[DELETED CLUB MEMBER]', res.data)
    AppState.myMemberships = AppState.myMemberships.filter(m => m.id != memberId)
  }

  async deleteMember(memberId) {
    const res = await api.delete(`api/members/${memberId}`)

    logger.log('[DELETED CLUB MEMBER]', res.data)
    AppState.members = AppState.members.filter(m => m.id != memberId)
  }

  async getMembershipsByUserId() {
    const res = await api.get('api/members')
    return res.data
  }

  async alterStatus(memberId, status) {
    const res = await api.put(`api/members/${memberId}`, { status })
    const index = AppState.members.findIndex(m => m.id == memberId)
    AppState.members.splice(index, 1, new Member(res.data))
    return res.data
  }
}

export const membersService = new MembersService