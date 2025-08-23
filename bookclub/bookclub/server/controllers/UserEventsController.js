import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { userEventsService } from "../services/UserEventsService.js";

export class UserEventsController extends BaseController {
  constructor() {
    super('api/userEvents')

    this.router

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:eventId', this.editEvent)
      .delete('/:eventId', this.removeEvent)
  }
  async createEvent(req, res, next) {
    try {
      const eventData = req.body

      eventData.creatorId = req.userInfo.id

      const newEvent = await userEventsService.createEvent(eventData)

      res.send(newEvent)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next) {
    try {
      const eventData = req.body

      const eventId = req.params.eventId

      const userId = req.userInfo.id

      const newEvent = await userEventsService.editEvent(eventData, eventId, userId)

      res.send(newEvent)
    } catch (error) {
      next(error)
    }
  }

  async removeEvent(req, res, next) {
    try {
      const eventId = req.params.eventId

      const userId = req.userInfo.id

      await userEventsService.removeEvent(eventId, userId)

      res.send('Your event has been deleted!')
    } catch (error) {
      next(error)
    }
  }
}