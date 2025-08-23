import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {
  async createEvent(data) {
    const event = await dbContext.Events.create(data)
    await event.populate('creator ticketCount')
    return event
  }

  async getEvents() {
    const events = await dbContext.Events.find().populate('creator ticketCount')
    return events
  }

  async getEventById(eventId) {
    const event = await dbContext.Events.findById(eventId).populate('creator ticketCount')
    if (!event) {
      throw new BadRequest('The requested resource does not exist.')
    }
    return event
  }

  async updateEvent(accountId, eventData) {
    const event = await this.getEventById(eventData.id)
    if (accountId != event.creatorId) {
      throw new Forbidden('Insufficient permissions for this request.')
    }
    if (event.isCanceled) {
      throw new BadRequest('The requested resource cannot be modified.')
    }
    if ('name' in eventData && eventData.name != '') {
      event.name = eventData.name
    }
    if ('description' in eventData && eventData.description != '') {
      event.description = eventData.description
    }
    event.save()
    return event
  }

  async cancelEvent(accountId, eventId) {
    const event = await this.getEventById(eventId)
    if (accountId != event.creatorId) {
      throw new Forbidden('Insufficient permissions for this request.')
    }
    event.isCanceled = true
    event.save()
    return event
  }

}

export const eventsService = new EventsService()