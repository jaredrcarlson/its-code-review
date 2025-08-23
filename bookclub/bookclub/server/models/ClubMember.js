import { Schema } from "mongoose";

export const ClubMemberSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  clubId: { type: Schema.Types.ObjectId, ref: 'Club', required: true },
  role: { type: String, enum: ['creator', 'admin', 'member'], required: true, default: 'member' },
  status: { type: String, enum: ['joined', 'pending', 'blocked'], required: true }
}, { timestamps: true, toJSON: { virtuals: true } }
)

ClubMemberSchema.index({ clubId: 1, creatorId: 1 }, { unique: true })

ClubMemberSchema.virtual('profile', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

ClubMemberSchema.virtual('club', {
  localField: 'clubId',
  foreignField: '_id',
  justOne: true,
  ref: 'Club'
})