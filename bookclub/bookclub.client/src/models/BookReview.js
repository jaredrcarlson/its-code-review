export class BookReview {
  constructor(data) {
    this.id = data.id
    this.gbId = data.gbId
    this.creatorId = data.creatorId
    this.content = data.content
    this.rating = data.rating
    this.creator = data.creator
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}