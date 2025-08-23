export class Club {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.coverImg = data.coverImg
    this.name = data.name
    this.description = data.description
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.memberCount = data.memberCount
    this.private = data.private
  }
}