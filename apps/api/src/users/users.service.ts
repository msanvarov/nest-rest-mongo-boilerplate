import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import { url } from 'gravatar';

import { IGenericMessageBody, UserRolesEnum } from '@starter/api-types';

import { Model } from 'mongoose';
import { RegisterDto } from '../auth/dto/register.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { User, UserDocument } from './user.schema';

/**
 * Users Service
 */
@Injectable()
export class UsersService {
  /**
   * Constructor
   * @param {Model<UserDocument>} userModel
   */
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>
  ) {}

  /**
   * Fetches user from database by UUID
   * @param {number} id
   * @returns {Promise<User>} data from queried user
   */
  get(id: number): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  /**
   * Fetches user from database by username
   * @param {string} username
   * @returns {Promise<User>} data from queried user
   */
  getByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  /**
   * Fetches user by username and hashed password
   * @param {string} username
   * @param {string} password
   * @returns {Promise<User>} data from queried user
   */
  getByUsernameAndPass(username: string, password: string): Promise<User> {
    return this.userModel
      .findOne({
        username,
        password: crypto.createHmac('sha256', password).digest('hex'),
      })
      .exec();
  }

  /**
   * Create a user with RegisterPayload fields
   * @param {RegisterDto} payload user payload
   * @returns {Promise<User>} data from the created user
   */
  async create(payload: RegisterDto): Promise<User> {
    const user = await this.getByUsername(payload.username);
    if (user) {
      throw new NotAcceptableException(
        'The account with the provided username currently exists. Please choose another one.'
      );
    }
    // this will auto assign the admin role to each created user
    const createdProfile = new this.userModel({
      ...payload,
      password: crypto.createHmac('sha256', payload.password).digest('hex'),
      avatar: url(payload.email, {
        protocol: 'http',
        s: '200',
        r: 'pg',
        d: '404',
      }),
      roles: UserRolesEnum.SUDO,
    });

    return createdProfile.save();
  }

  /**
   * Edit user data
   * @param {PatchUserDto} payload
   * @returns {Promise<User>} mutated user data
   */
  async edit(payload: PatchUserDto): Promise<User> {
    const { username } = payload;
    const updatedProfile = await this.userModel.updateOne(
      { username },
      payload
    );
    if (updatedProfile.modifiedCount !== 1) {
      throw new BadRequestException(
        'The user with that username does not exist in the system. Please try another username.'
      );
    }
    return this.getByUsername(username);
  }

  /**
   * Delete user given a username
   * @param {string} username
   * @returns {Promise<IGenericMessageBody>} whether or not the delete operation was completed
   */
  async delete(username: string): Promise<IGenericMessageBody> {
    return this.userModel.deleteOne({ username }).then((user) => {
      if (user.deletedCount === 1) {
        return { message: `Deleted ${username} from records` };
      } else {
        throw new BadRequestException(
          `Failed to delete a user by the name of ${username}.`
        );
      }
    });
  }
}
