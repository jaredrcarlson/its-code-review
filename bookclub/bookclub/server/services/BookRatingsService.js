import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class BookRatingsService {
    async deleteRating(ratingId, userId) {
        const rating = await this.getRatingById(ratingId)
        if (rating.creatorId != userId) {
            throw new Forbidden('This rating is not yours.')
        }
        rating.remove()
        return rating
    }
    async editRating(ratingId, reqBody) {
        const rating = await this.getRatingById(ratingId)
        if (rating.creatorId != reqBody.creatorId) {
            throw new Forbidden('This rating is not yours.')
        }
        rating.rating = reqBody.rating || rating.rating
        rating.save()
        return rating
    }
    async getBookRatingsByGbid(gbId) {
        const ratings = await dbContext.BookRatings.find({ gbId })
        return ratings
    }
    async createBookRating(reqBody) {
        const rating = await dbContext.BookRatings.create(reqBody)
        return rating
    }

    async getRatingById(ratingId) {
        const rating = await dbContext.BookRatings.findById(ratingId)
        if (!rating) {
            throw new BadRequest(`There is no rating with Id: ${ratingId}`)
        }
        return rating
    }
}

export const bookRatingsService = new BookRatingsService()