import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { bookReviewsService } from "../services/BookReviewsService";
import { BadRequest } from "../utils/Errors";

export class BookReviewsController extends BaseController {
    constructor() {
        super('api/bookReviews')
        this.router
            .get('', this.getReviewByGbid)
            .get('/:reviewId', this.getReviewById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .put('/:reviewId', this.editReview)
            .post('', this.createReview)
            .delete('/:reviewId', this.deleteReview)
    }

    async getReviewByGbid(req, res, next) {
        try {
            const gbId = req.query.gbId
            if (!gbId) {
                throw new BadRequest('A query with gbId is required.')
            }
            const reviews = await bookReviewsService.getReviewByGbid(gbId)
            return res.send(reviews)
        } catch (error) {
            next(error)
        }
    }
    async getReviewById(req, res, next) {
        try {
            const reviewId = req.params.reviewId
            const review = await bookReviewsService.getReviewById(reviewId)
            return res.send(review)
        } catch (error) {
            next(error)
        }
    }

    async editReview(req, res, next) {
        try {
            const reviewId = req.params.reviewId
            req.body.creatorId = req.userInfo.id
            const review = await bookReviewsService.editReview(reviewId, req.body)
            return res.send(review)
        } catch (error) {
            next(error)
        }
    }

    async deleteReview(req, res, next) {
        try {
            const reviewId = req.params.reviewId
            req.body.creatorId = req.userInfo.id
            const review = await bookReviewsService.deleteReview(reviewId, req.body)
            return res.send(review)
        } catch (error) {
            next(error)
        }
    }

    async createReview(req, res, next) {
        try {
            let reviewBody = req.body
            reviewBody.creatorId = req.userInfo.id
            const bookReview = await bookReviewsService.createReview(reviewBody)
            return res.send(bookReview)
        } catch (error) {
            next(error)
        }
    }
}