import * as mongoose from "mongoose";

export const Profile = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  avatar: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

export interface IProfile extends mongoose.Document {
  readonly _id: mongoose.ObjectID;
  readonly username: string;
  readonly email: string;
  password: string;
  readonly avatar: string;
  readonly date: Date;
}

export class ProfileFillableFields {
  username: string;
  email: string;
  password: string;
}
