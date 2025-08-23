import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { clubBooksService } from "../services/ClubBooksService.js";
import { BadRequest } from "../utils/Errors.js";

export class ClubBooksController extends BaseController {
  constructor() {
    super('api/clubBooks')
    this.router
      .get('', this.getClubBooksByGbId)
      .get('/:clubBookId', this.getClubBookById)
      // .get('/gb/:gbId', this.getClubBooksByGbId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createClubBook)
      .put('/:clubBookId', this.updateClubBook)
      .delete('/:clubBookId', this.deleteClubBook)
  }

  async createClubBook(req, res, next) {
    try {
      const userId = req.userInfo.id
      const clubBookData = req.body
      const newClubBook = await clubBooksService.createClubBook(userId, clubBookData)
      return res.send(newClubBook)
    } catch (error) {
      next(error)
    }
  }

  // async getClubBooks(req, res, next) {
  //   try {
  //     const clubBooks = await clubBooksService.getClubBooks()
  //     return res.send(clubBooks)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async getClubBookById(req, res, next) {
    try {
      const clubBookId = req.params.clubBookId
      const clubBook = await clubBooksService.getClubBookById(clubBookId)
      return res.send(clubBook)
    } catch (error) {
      next(error)
    }
  }

  async getClubBooksByGbId(req, res, next) {
    try {
      const gbId = req.query.gbId
      if (!gbId) {
        throw new BadRequest('A query with gbId is required.')
      }
      const clubBooks = await clubBooksService.getClubBooksByGbId(gbId)
      return res.send(clubBooks)
    } catch (error) {
      next(error)
    }
  }

  async updateClubBook(req, res, next) {
    try {
      const userId = req.userInfo.id
      const clubBookId = req.params.clubBookId
      const clubBookData = req.body
      const updatedClubBook = await clubBooksService.updateClubBook(userId, clubBookId, clubBookData)
      return res.send(updatedClubBook)
    } catch (error) {
      next(error)
    }
  }

  async deleteClubBook(req, res, next) {
    try {
      const userId = req.userInfo.id
      const clubBookId = req.params.clubBookId
      const result = await clubBooksService.deleteClubBook(userId, clubBookId)
      return res.send(result)
    } catch (error) {
      next(error)
    }
  }
}