import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class UserEventsService {
  async getUserEvents(userId) {
    const userEvents = await dbContext.UserEvents.find({ creatorId: userId })

    return userEvents
  }
  async createEvent(eventData) {
    const newEvent = await dbContext.UserEvents.create(eventData)

    await newEvent.populate('creator', 'name picture')

    return newEvent
  }

  async editEvent(eventData, eventId, userId) {
    const eventToEdit = await dbContext.UserEvents.findById(eventId)

    if (!eventToEdit) {
      throw new BadRequest(`No event exists at the ID ${eventId}`)
    }

    if (eventToEdit.creatorId != userId) {
      throw new Forbidden(`You are not the creator of the event "${eventToEdit.name}". You may not edit an event that you have not created.`)
    }

    eventToEdit.name = eventData.name || eventToEdit.name
    eventToEdit.description = eventData.description || eventToEdit.description
    eventToEdit.startDate = eventData.startDate || eventToEdit.startDate
    eventToEdit.endDate = eventData.endDate || eventToEdit.endDate
    eventToEdit.startTime = eventData.startTime || eventToEdit.startTime
    eventToEdit.endTime = eventData.endTime || eventToEdit.endTime

    const newEvent = await eventToEdit.save()

    return newEvent
  }

  async removeEvent(eventId, userId) {
    const eventToRemove = await dbContext.UserEvents.findById(eventId)

    if (!eventToRemove) {
      throw new BadRequest(`No event exists at the ID ${eventId}`)
    }

    if (eventToRemove.creatorId != userId) {
      throw new Forbidden(`You are not the creator of the event ${eventToRemove.name}. You may not delete an event that you have not created.`)
    }

    await eventToRemove.remove()

    return eventToRemove
  }
}

export const userEventsService = new UserEventsService