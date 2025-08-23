import { AppState } from "../AppState.js"
import { UserEvent } from "../models/UserEvent.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class UserEventsService {

  async getMyEvents() {
    try {
      const res = await api.get('account/userEvents')

      logger.log('[GOT USER EVENTS]', res.data)
      AppState.myEvents = res.data.map(pojo => new UserEvent(pojo))
    } catch (error) {
      Pop.error(error.message)
    }
  }

}

export const userEventsService = new UserEventsService