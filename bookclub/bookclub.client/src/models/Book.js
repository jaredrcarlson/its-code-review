import { googleBooksService } from "../services/GoogleBooksService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop.js"

// Represents a single book 
// @constructor
// @param {data} - Passed in data types supported are: Google Books API Volume, UserBook, or ClubBook
export class Book {
  constructor(data) {
    this.id = data.id
    if ('volumeInfo' in data) {
      // Data Type: Google Books API > Volume
      this.gbId = data.id
      this.addGoogleBooksVolumeData(data)
    } else {
      if ('creatorId' in data) {
        // Data Type: UserBook
        this.creatorId = data.creatorId
      }
      if ('clubId' in data) {
        // Data Type: ClubBook
        this.clubId = data.clubId
        this.club = data.club
      }
      this.gbId = data.gbId
      this.authors = [data.author]
      this.author = data.author
      this.title = data.title
      this.imgUrl = data.imgUrl
      this.hasCoverImage = true
      this.status = data.status
      this.rating = data.rating
      this.createdAt = new Date(data.createdAt)
      this.updatedAt = new Date(data.updatedAt)
    }
  }

  addGoogleBooksVolumeData(volumeData) {
    if (!('volumeInfo' in volumeData)) {
      throw new Error('No volumeInfo key found in volumeData')
    }
    const data = volumeData.volumeInfo
    this.authors = 'authors' in data ? data.authors : [data.author]
    this.author = 'author' in data ? data.author : this.authors.join(', ')
    this.title = 'title' in data ? data.title : ''
    this.subtitle = 'subtitle' in data ? data.subtitle : ''
    this.hasCoverImage = 'imageLinks' in data
    this.imgUrl = this.hasCoverImage && 'thumbnail' in data.imageLinks ? data.imageLinks.thumbnail : `https://placehold.co/128x192?text=${this.title}`
    this.imgUrlLarge = this.hasCoverImage ? googleBooksService.createImageURL(volumeData.id) : `https://placehold.co/400x600?text=${this.title} ${this.subtitle}`
    this.publishedDate = 'publishedDate' in data ? new Date(data.publishedDate) : new Date(0)
    this.description = 'description' in data ? data.description : ''
    this.pageCount = 'pageCount' in data ? data.pageCount : ''
  }
}