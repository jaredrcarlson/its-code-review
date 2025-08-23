import { Schema } from "mongoose";

export const BookCommentSchema = new Schema({
  gbId: { type: String, required: true },
  creatorId: { type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: true, minlenght: 3, maxlength: 500 }
}, { timestamps: true, toJSON: { virtuals: true } })

BookCommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})