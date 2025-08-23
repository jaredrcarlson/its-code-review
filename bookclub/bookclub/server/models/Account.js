import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true, maxlength: 100, minlength: 1 },
    name: { type: String, required: true, maxlength: 100, minlength: 1 },
    picture: { type: String },
    // NOTE If you wish to add additional properties do so here
    bio: { type: String, maxlength: 1500, minlength: 0 },
    coverImg: { type: String, maxlength: 700, minlength: 1 },
    needsTour: { type: Boolean, default: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

