import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRolesEnum } from '@starter/api-types';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

/**
 * User Schema Class
 */
@Schema()
export class User {
  /**
   * Username column
   */
  @Prop()
  username: string;

  /**
   * Name column
   */
  @Prop()
  name: string;

  /**
   * Email column
   */
  @Prop()
  email: string;

  /**
   * Gravatar column (gravatar url)
   */
  @Prop()
  gravatar: string;

  /**
   * Column to represent a one to many relationship with the roles entity
   */
  @Prop([String])
  roles: UserRolesEnum[];

  /**
   * Password column
   */
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
