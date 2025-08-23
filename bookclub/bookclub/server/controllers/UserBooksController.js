import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { userBooksService } from "../services/UserBooksService.js";
import { logger } from "../utils/Logger.js";

export class UserBooksController extends BaseController {
  constructor() {
    super('api/userBooks')
    this.router
      .get('/:userBookId', this.getUserBookById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserBooksByUserId)
      .post('', this.createUserBook)
      .put('/:userBookId', this.updateUserBook)
      .delete('/:userBookId', this.deleteUserBook)
  }

  async createUserBook(req, res, next) {
    try {
      const userId = req.userInfo.id
      const userBookData = req.body
      const newUserBook = await userBooksService.createUserBook(userId, userBookData)
      return res.send(newUserBook)
    } catch (error) {
      next(error)
    }
  }

  async getUserBooksByUserId(req, res, next) {
    try {
      const userId = req.userInfo.id
      const userBooks = await userBooksService.getUserBooksByUserId(userId)
      return res.send(userBooks)
    } catch (error) {
      next(error)
    }
  }

  async getUserBookById(req, res, next) {
    try {
      const userBookId = req.params.userBookId
      const userBook = await userBooksService.getUserBookById(userBookId)
      return res.send(userBook)
    } catch (error) {
      next(error)
    }
  }

  async updateUserBook(req, res, next) {
    try {
      const userId = req.userInfo.id
      const userBookId = req.params.userBookId
      const userBookData = req.body
      const updatedUserBook = await userBooksService.updateUserBook(userId, userBookId, userBookData)
      return res.send(updatedUserBook)
    } catch (error) {
      next(error)
    }
  }

  async deleteUserBook(req, res, next) {
    try {
      const userId = req.userInfo.id
      const userBookId = req.params.userBookId
      const result = await userBooksService.deleteUserBook(userId, userBookId)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }
}