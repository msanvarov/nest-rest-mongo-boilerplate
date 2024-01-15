import { Document, Types } from "mongoose";
import { AppRoles } from "modules/app/app.roles";
import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";

/**
 * Mongoose Profile Schema
 */
@Schema()
export class IProfile extends Document implements IIProfile {
  _id: Types.ObjectId;

  @Prop()
  username: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop()
  name: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  avatar: string;

  @Prop()
  roles: Array<AppRoles>;

  @Prop({ default: Date.now() })
  date: Date;
}

export const Profile = SchemaFactory.createForClass(IProfile);

/**
 * Mongoose Profile Document
 */
export interface IIProfile {
  /**
   * UUID
   */
  readonly _id: Types.ObjectId;
  /**
   * Username
   */
  readonly username: string;
  /**
   * Email
   */
  readonly email: string;
  /**
   * Name
   */
  readonly name: string;
  /**
   * Password
   */
  password: string;
  /**
   * Gravatar
   */
  readonly avatar: string;
  /**
   * Roles
   */
  readonly roles: Array<AppRoles>;
  /**
   * Date
   */
  readonly date: Date;
}
