import { Schema } from "mongoose";

export const UserEventSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  name: { type: String, required: true, maxlength: 100, minlength: 1 },
  description: { type: String, maxlength: 700, minlength: 1 },
  location: { type: String, maxlength: 700, minlength: 1, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  startTime: { type: String },
  endTime: { type: String }
}, { timestamps: true, toJSON: { virtuals: true } })

UserEventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})