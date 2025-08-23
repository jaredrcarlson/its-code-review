import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/tickets', this.getTicketsByEventId)
      .get('/:eventId/comments', this.getCommentsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:eventId', this.updateEvent)
      .delete('/:eventId', this.cancelEvent)
  }
  async createEvent(req, res, next) {
    try {
      const data = req.body
      data.creatorId = req.userInfo.id
      const newEvent = await eventsService.createEvent(data)
      return res.send(newEvent)
    } catch (error) {
      next(error)
    }
  }

  async getEvents(req, res, next) {
    try {
      const events = await eventsService.getEvents()
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(req, res, next) {
    try {
      const eventId = req.params.eventId
      const event = await eventsService.getEventById(eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getTicketsByEventId(req, res, next) {
    try {
      const eventId = req.params.eventId
      const tickets = await ticketsService.getTicketsByEventId(eventId)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByEventId(req, res, next) {
    try {
      const eventId = req.params.eventId
      const comments = await commentsService.getCommentsByEventId(eventId)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async updateEvent(req, res, next) {
    try {
      const eventData = req.body
      eventData.id = req.params.eventId
      const accountId = req.userInfo.id
      const updatedEvent = await eventsService.updateEvent(accountId, eventData)
      return res.send(updatedEvent)
    } catch (error) {
      next(error)
    }

  }
  async cancelEvent(req, res, next) {
    try {
      const eventId = req.params.eventId
      const accountId = req.userInfo.id
      const cancelledEvent = await eventsService.cancelEvent(accountId, eventId)
      return res.send(cancelledEvent)
    } catch (error) {
      next(error)
    }
  }
}