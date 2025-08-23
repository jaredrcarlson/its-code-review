import { Schema } from "mongoose";

export const BookReviewSchema = new Schema({
    gbId: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    content: { type: String, required: true, minLength: 3, maxLength: 2000 },
    rating: { type: String, required: true, enum: ['Recommended', 'Not Recommended', 'Mixed Feelings'], default: 'Mixed Feelings' },

}, { timestamps: true, toJSON: { virtuals: true } })

BookReviewSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})

BookReviewSchema.index({ creatorId: 1, gbId: 1 }, { unique: true })