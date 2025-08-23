export class ClubPost {
  constructor(data) {
    this.id = data.id
    this.clubId = data.clubId
    this.creatorId = data.creatorId
    this.body = data.body
    this.title = data.title
    this.createdAt = new Date(data.createdAt).toLocaleDateString()
    this.updatedAt = new Date(data.updatedAt).toLocaleDateString()
    this.creator = data.creator
    this.isAnnouncement = data.isAnnouncement
    this.commentCount = data.commentCount
    this.membership = data.membership
  }
}

