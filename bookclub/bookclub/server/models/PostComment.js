import { Schema } from "mongoose";

export const PostCommentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, required: true, ref: 'ClubPost' },
  clubId: { type: Schema.Types.ObjectId, required: true, ref: 'Club' },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  body: { type: String, minLength: 3, maxLength: 200, required: true },
}, { timestamps: true, toJSON: { virtuals: true } }
)

PostCommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

PostCommentSchema.virtual('membership', {
  ref: 'ClubMember',
  localField: 'clubId',
  foreignField: 'clubId',
  match: membership => ({ creatorId: membership.creatorId }),
  justOne: true
})