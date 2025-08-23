export class NYTList {
  constructor(data) {
    this.books = data.books
    this.listId = data.list_id
    this.name = data.display_name
  }
}