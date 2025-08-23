export class Member {
  constructor(data) {
    this.id = data.id
    this.clubId = data.clubId
    this.createdAt = data.createdAt
    this.creatorId = data.creatorId
    this.profile = data.profile
    this.role = data.role
    this.updatedAt = data.updatedAt
    this.club = data.club
    this.status = data.status
  }
}