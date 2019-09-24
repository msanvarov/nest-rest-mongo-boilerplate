import { Schema, Document } from "mongoose";

/**
 * Mongoose Profile Schema
 */
export const Profile = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  roles: [{ type: String }],
  date: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Mongoose Profile Document
 */
export interface IProfile extends Document {
  readonly _id: Schema.Types.ObjectId;
  readonly username: string;
  readonly email: string;
  password: string;
  readonly avatar: string;
  readonly roles: string[];
  readonly date: Date;
}
