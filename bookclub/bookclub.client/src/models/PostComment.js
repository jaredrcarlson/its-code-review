export class PostComment {
  constructor(data) {
    this.id = data.id
    this.postId = data.postId
    this.creatorId = data.creatorId
    this.body = data.body
    this.createdAt = new Date(data.createdAt).toLocaleDateString()
    this.updatedAt = data.updatedAt
    this.creator = data.creator
    this.membership = data.membership
  }
}


