export class UserEvent {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.name = data.name
    this.description = data.description
    this.location = data.location
    this.startDate = data.startDate
    this.endDate = data.endDate
    this.startTime = data.startTime
    this.endTime = data.endTime
  }
}