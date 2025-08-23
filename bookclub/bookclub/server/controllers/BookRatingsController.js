import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { bookRatingsService } from "../services/BookRatingsService";
import { BadRequest } from "../utils/Errors";

export class BookRatingsController extends BaseController {
    constructor() {
        super('api/bookRatings')
        this.router
        // .get('', this.getBookRatingsByGbid)
        // .get('/:ratingId', this.getBookRatingById)
        // .use(Auth0Provider.getAuthorizedUserInfo)
        // .post('', this.createBookRating)
        // .put('/:ratingId', this.editRating)
        // .delete('/:ratingId', this.deleteRating)
    }

    async deleteRating(req, res, next) {
        try {
            const ratingId = req.params.ratingId
            const rating = await bookRatingsService.deleteRating(ratingId, req.userInfo.id)
            return res.send(rating)
        } catch (error) {
            next(error)
        }
    }

    async editRating(req, res, next) {
        try {
            const ratingId = req.params.ratingId
            let reqBody = req.body
            reqBody.creatorId = req.userInfo.id
            const rating = await bookRatingsService.editRating(ratingId, reqBody)
            return res.send(rating)
        } catch (error) {
            next(error)
        }
    }

    async getBookRatingsByGbid(req, res, next) {
        try {
            const gbId = req.query.gbId
            if (!gbId) {
                throw new BadRequest('Must query with a gbId.')
            }
            const ratings = await bookRatingsService.getBookRatingsByGbid(gbId)
            return res.send(ratings)
        } catch (error) {
            next(error)
        }
    }

    async getBookRatingById(req, res, next) {
        try {
            const ratingId = req.params.ratingId
            const rating = await bookRatingsService.getRatingById(ratingId)
            return res.send(rating)
        } catch (error) {
            next(error)
        }
    }

    async createBookRating(req, res, next) {
        try {
            let reqBody = req.body
            reqBody.creatorId = req.userInfo.id
            const rating = await bookRatingsService.createBookRating(reqBody)
            return res.send(rating)
        } catch (error) {
            next(error)
        }
    }
}