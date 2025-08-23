import { Schema } from "mongoose";

export const ClubPostSchema = new Schema({
  clubId: { type: Schema.Types.ObjectId, required: true, ref: 'Club' },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  body: { type: String, required: true, minLength: 3, maxLength: 1500 },
  title: { type: String, required: true, minlength: 3, maxLength: 100 },
  isAnnouncement: { type: Boolean, default: false }
}, { timestamps: true, toJSON: { virtuals: true } }
)

ClubPostSchema.virtual('commentCount', {
  localField: '_id',
  foreignField: 'postId',
  ref: 'PostComment',
  count: true
})

ClubPostSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

ClubPostSchema.virtual('membership', {
  ref: 'ClubMember',
  localField: 'clubId',
  foreignField: 'clubId',
  match: membership => ({ creatorId: membership.creatorId }),
  justOne: true
})