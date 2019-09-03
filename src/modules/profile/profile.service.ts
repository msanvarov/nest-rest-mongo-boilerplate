import * as crypto from "crypto";
import * as gravatar from "gravatar";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from "@nestjs/common";
import { IProfile, ProfileFillableFields } from "./profile.model";

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel("Profile") private readonly profileModel: Model<IProfile>,
  ) {}
  async get(id: string): Promise<IProfile> {
    return this.profileModel
      .findById(id)
      .then((user: IProfile) =>
        user
          ? {
              _id: user._id,
              username: user.username,
              email: user.email,
              avatar: user.avatar,
            }
          : {},
      )
      .catch(err => {
        throw new InternalServerErrorException(err.message);
      });
  }

  async getByUsername(username: string) {
    return this.profileModel
      .findOne({ username })
      .then(profile => profile)
      .catch(err => {
        throw new InternalServerErrorException(err.message);
      });
  }

  async getByUsernameAndPass(username: string, password: string) {
    return this.profileModel
      .findOne({
        username,
        password: crypto.createHmac("sha256", password).digest("hex"),
      })
      .then(profile => profile)
      .catch(err => {
        throw new InternalServerErrorException(err.message);
      });
  }

  async create(payload: ProfileFillableFields) {
    const user = await this.getByUsername(payload.username);
    if (user) {
      throw new NotAcceptableException(
        "The username specified already exists in system.",
      );
    }
    const createdProfile = new this.profileModel({
      ...payload,
      password: crypto.createHmac("sha256", payload.password).digest("hex"),
      avatar: gravatar.url(payload.email, {
        protocol: "http",
        s: "200",
        r: "pg",
        d: "404",
      }),
    });
    return createdProfile.save();
  }

  async delete(username: string) {
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
