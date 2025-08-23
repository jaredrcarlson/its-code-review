import { Schema } from "mongoose";

export const ClubBookSchema = new Schema({
  clubId: { type: Schema.Types.ObjectId, required: true },
  gbId: { type: String, required: true },
  title: { type: String, required: true },
  imgUrl: { type: String },
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 10, default: 0 },
  status: { type: String, enum: ['planned', 'reading', 'finished'], required: true, default: 'planned' }
}, { timestamps: true, toJSON: { virtuals: true } })

ClubBookSchema.virtual('club', {
  localField: 'clubId',
  foreignField: '_id',
  justOne: true,
  ref: 'Club'
})

ClubBookSchema.index({ clubId: 1, gbId: 1 }, { unique: true })