export class Comment {
  constructor(data) {
    this.id = data.id
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.body = data.body
    this.creatorId = data.creatorId
    this.eventId = data.eventId
    this.creator = data.creator
  }
}