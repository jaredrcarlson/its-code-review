import { Schema } from "mongoose";

export const ClubSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  name: { type: String, minLength: 3, maxLength: 40, required: true, unique: true },
  description: { type: String, minLength: 3, maxLength: 750, required: true },
  coverImg: { type: String, minLength: 3, maxLength: 300, required: true },
  private: { type: Boolean, default: false }
}, { timestamps: true, toJSON: { virtuals: true } })

ClubSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

ClubSchema.virtual('memberCount', {
  localField: '_id',
  foreignField: 'clubId',
  count: true,
  match: membership => ({ status: 'joined' }),
  ref: 'ClubMember'
})