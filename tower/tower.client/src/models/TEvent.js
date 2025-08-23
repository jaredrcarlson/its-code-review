export class TEvent {
  constructor(data) {
    this.id = data.id
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.creatorId = data.creatorId
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = new Date(data.startDate)
    this.fullDateString = this.startDate.toLocaleString()
    this.day = this.fullDateString.split(', ')[0]
    this.time = this.fullDateString.split(', ')[1].slice(0, -6)
      + this.fullDateString.split(', ')[1].slice(-3)
    this.isCanceled = data.isCanceled
    this.type = data.type
    this.creator = data.creator
    this.ticketCount = data.ticketCount
  }
}