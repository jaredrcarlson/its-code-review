import { userBooksService } from "../services/UserBooksService.js";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";

export class GoogleBooksController extends BaseController {
  constructor() {
    super('api/gbooks')
    this.router
      .get('/:gbId/rating', this.getRating)
  }

  async getRating(req, res, next) {
    try {
      const gbId = req.params.gbId
      const userBooks = await userBooksService.getUserBooksByGbId(gbId)
      const userBooksWithRatings = userBooks.filter(book => book.rating != 0)
      const userRatingCount = userBooksWithRatings.length
      let ratingsTotal = 0
      userBooksWithRatings.forEach(book => {
        ratingsTotal += book.rating
      })
      const averageRating = ratingsTotal / userRatingCount
      return res.send({ score: averageRating, userCount: userRatingCount })
    } catch (error) {
      next(error)
    }
  }
}