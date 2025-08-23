import { AppState } from "../AppState.js"
import { TEvent } from "../models/TEvent.js"
import { api } from "./AxiosService.js"
import { ticketsService } from "./TicketsService.js"

class EventsService {
  async createEvent(eventData) {
    const res = await api.post('api/events', eventData)
    const newEvent = new TEvent(res.data)
    AppState.events.push(newEvent)
    return newEvent
  }

  async getEvents() {
    const res = await api.get('api/events')
    AppState.events = res.data.map(data => new TEvent(data))
    this.filterByCategory('All')
  }

  filterByCategory(category) {
    if (category == 'All') {
      AppState.filteredEvents = AppState.events
    } else {
      AppState.filteredEvents = AppState.events.filter((event) => { return event.type == category.toLowerCase() })
    }
  }

  getEventById(eventId) {
    const event = AppState.events.find(e => e.id == eventId)
    return event
  }

  async setActiveEvent(eventId) {
    const res = await api.get(`api/events/${eventId}`)
    const event = new TEvent(res.data)
    AppState.activeEvent = event
  }

  async cancelEvent(eventId) {
    await api.delete(`api/events/${eventId}`)
    AppState.activeEvent.isCanceled = true
  }
}

export const eventsService = new EventsService()