import * as crypto from "crypto";
import * as gravatar from "gravatar";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from "@nestjs/common";
import { IProfile } from "./profile.model";
import { RegisterPayload } from "modules/auth/payload/register.payload";
import { AppRoles } from "../app/app.roles";
import { PatchProfilePayload } from "./payload/patch.profile.payload";

/**
 * Models a typical response for a crud operation
 */
export interface IGenericMessageBody {
  /**
   * Status message to return
   */
  message: string;
}

/**
 * Profile Service
 */
@Injectable()
export class ProfileService {
  /**
   * Constructor
   * @param {Model<IProfile>} profileModel
   */
  constructor(
    @InjectModel("Profile") private readonly profileModel: Model<IProfile>,
  ) {}

  /**
   * Fetches a profile from database by UUID
   * @param {string} id
   * @returns {Promise<IProfile>} queried profile data
   */
  get(id: string): Promise<IProfile> {
    return this.profileModel.findById(id).exec();
  }

  /**
   * Fetches a profile from database by username
   * @param {string} username
   * @returns {Promise<IProfile>} queried profile data
   */
  getByUsername(username: string): Promise<IProfile> {
    return this.profileModel.findOne({ username }).exec();
  }

  /**
   * Fetches a profile by their username and hashed password
   * @param {string} username
   * @param {string} password
   * @returns {Promise<IProfile>} queried profile data
   */
  getByUsernameAndPass(username: string, password: string): Promise<IProfile> {
    return this.profileModel
      .findOne({
        username,
        password: crypto.createHmac("sha256", password).digest("hex"),
      })
      .exec();
  }

  /**
   * Create a profile with RegisterPayload fields
   * @param {RegisterPayload} payload profile payload
   * @returns {Promise<IProfile>} created profile data
   */
  async create(payload: RegisterPayload): Promise<IProfile> {
    const user = await this.getByUsername(payload.username);
    if (user) {
      throw new NotAcceptableException(
        "The account with the provided username currently exists. Please choose another one.",
      );
    }
    // this will auto assign the admin role to each created user
    const createdProfile = new this.profileModel({
      ...payload,
      password: crypto.createHmac("sha256", payload.password).digest("hex"),
      avatar: gravatar.url(payload.email, {
        protocol: "http",
        s: "200",
        r: "pg",
        d: "404",
      }),
      roles: AppRoles.ADMIN,
    });

    return createdProfile.save();
  }

  /**
   * Edit profile data
   * @param {PatchProfilePayload} payload
   * @returns {Promise<IProfile>} mutated profile data
   */
  async edit(payload: PatchProfilePayload): Promise<IProfile> {
    const { username } = payload;
    const updatedProfile = await this.profileModel.updateOne(
      { username },
      payload,
    );
    if (updatedProfile.nModified !== 1) {
      throw new BadRequestException(
        "The profile with that username does not exist in the system. Please try another username.",
      );
    }
    return this.getByUsername(username);
  }

  /**
   * Delete profile given a username
   * @param {string} username
   * @returns {Promise<IGenericMessageBody>} whether or not the crud operation was completed
   */
  delete(username: string): Promise<IGenericMessageBody> {
    return this.profileModel.deleteOne({ username }).then(profile => {
      if (profile.deletedCount === 1) {
        return { message: `Deleted ${username} from records` };
      } else {
        throw new BadRequestException(
          `Failed to delete a profile by the name of ${username}.`,
        );
      }
    });
  }
}
