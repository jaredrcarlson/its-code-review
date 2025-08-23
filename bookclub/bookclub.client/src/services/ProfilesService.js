import { AppState } from "../AppState.js"
import { Member } from "../models/Member.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfilesService {

  async getProfile(profileId) {
    const res = await api.get(`/api/profiles/${profileId}`)

    logger.log('[GOT PROFILE]', res.data)

    AppState.profile = new Profile(res.data)
  }

  async getProfileMemberships(profileId) {
    const res = await api.get(`api/profiles/${profileId}/clubs`)

    logger.log('[GOT PROFILE MEMBERSHIPS]', res.data)
    AppState.profileMemberships = res.data.map(pojo => new Member(pojo))
  }

}

export const profilesService = new ProfilesService