import { AppState } from "../AppState.js"
import { BookReview } from "../models/BookReview.js"
import { api } from "./AxiosService.js"

class BookReviewsService {
  async setBookDetailsPageReviews(gbId) {
    const res = await api.get(`api/bookReviews?gbId=${gbId}`)
    const bookReviewsData = res.data
    AppState.bookDetailsPage.userReviews = bookReviewsData.map(data => new BookReview(data))
  }

  async createBookReview(bookReviewData) {
    const res = await api.post('api/bookReviews', bookReviewData)
    const newBookReview = new BookReview(res.data)
    AppState.bookDetailsPage.userReviews.unshift(newBookReview)
    return newBookReview
  }

  async updateBookReview(bookReviewData) {
    const res = await api.put(`api/bookReviews/${bookReviewData.id}`, bookReviewData)
    const updatedBookReview = new BookReview(res.data)
    const reviewIndex = AppState.bookDetailsPage.userReviews.find(review => review.id == updatedBookReview.id)
    AppState.bookDetailsPage.userReviews.splice(reviewIndex, 1, updatedBookReview)
  }

  async deleteBookReview(bookReviewId) {
    await api.delete(`api/bookReviews/${bookReviewId}`)
    const bookReviewIndex = AppState.bookDetailsPage.userReviews.findIndex(review => review.id == bookReviewId)
    AppState.bookDetailsPage.userReviews.splice(bookReviewIndex, 1)
  }

}

export const bookReviewsService = new BookReviewsService()