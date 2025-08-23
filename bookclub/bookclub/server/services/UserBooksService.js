import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class UserBooksService {
  async createUserBook(userId, userBookData) {
    userBookData.creatorId = userId
    const newUserBook = await dbContext.UserBooks.create(userBookData)
    return newUserBook
  }

  async getUserBooks() {
    const userBooks = await dbContext.UserBooks.find()
    return userBooks
  }

  async getUserBookById(userBookId) {
    const userBook = await dbContext.UserBooks.findById(userBookId)
    if (!userBook) {
      throw new BadRequest(`Book with ID: ${userBookId} does not exist.`)
    }
    return userBook
  }

  async getUserBooksByUserId(userId) {
    const userBooks = await dbContext.UserBooks.find({ creatorId: userId })
    return userBooks
  }

  async getUserBooksByGbId(gbId) {
    const userBooks = await dbContext.UserBooks.find({ gbId: gbId })
    return userBooks
  }

  async updateUserBook(userId, userBookId, userBookData) {
    const userBook = await this.getUserBookById(userBookId)
    if (userId != userBook.creatorId) {
      throw new Forbidden('This Book can only be modified by the Book Creator.')
    }
    const updateFields = ['status', 'rating']
    updateFields.forEach(field => {
      if (field in userBookData) {
        userBook[field] = userBookData[field]
      }
    })
    await userBook.save()
    return userBook
  }

  async deleteUserBook(userId, userBookId) {
    const userBook = await this.getUserBookById(userBookId)
    if (userId != userBook.creatorId) {
      throw new Forbidden('This Book can only be removed by the Book Creator')
    }
    await userBook.remove()
    return userBook
  }
}

export const userBooksService = new UserBooksService()