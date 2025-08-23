export class NYTBook {
  constructor(data) {
    this.bookImg = data.book_image
    this.title = data.title
    this.author = data.author
    this.description = data.description
    this.rank = data.rank
    this.weeks = data.weeks_on_list
    this.isbn10 = data.primary_isbn10
    this.isbn13 = data.primary_isbn13
  }
}