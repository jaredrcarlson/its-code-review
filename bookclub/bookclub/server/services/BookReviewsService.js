import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class BookReviewsService {

  async getReviewByGbid(gbId) {
    const reviews = await dbContext.BookReviews.find({ gbId }).populate('creator', 'name picture')
    reviews.reverse()
    return reviews
  }

  async editReview(reviewId, reqBody) {
    let review = await this.getReviewById(reviewId)
    if (review.creatorId != reqBody.creatorId) {
      throw new Forbidden('This review does not belong to you.')
    }
    review.content = reqBody.content || review.content
    review.rating = reqBody.rating || review.rating
    await review.save()
    return review
  }

  async deleteReview(reviewId, reqBody) {
    let review = await this.getReviewById(reviewId)
    if (review.creatorId != reqBody.creatorId) {
      throw new Forbidden('This review does not belong to you.')
    }
    await review.remove()
    return review
  }

  async createReview(reviewBody) {
    const review = await dbContext.BookReviews.create(reviewBody)
    await review.populate('creator', 'name picture')
    return review
  }
  async getReviewById(reviewId) {
    const review = await dbContext.BookReviews.findById(reviewId).populate('creator', 'name picture')
    if (!review) {
      throw new BadRequest(`There is no such review with the ID: ${reviewId}`)
    }
    return review
  }
}

export const bookReviewsService = new BookReviewsService()