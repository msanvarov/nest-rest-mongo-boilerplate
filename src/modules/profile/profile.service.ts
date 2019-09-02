import * as crypto from "crypto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, NotAcceptableException } from "@nestjs/common";
import { ProfileI, ProfileFillableFields } from "./profile.model";

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel("Profile") private readonly profileModel: Model<ProfileI>,
  ) {}
  async get(id: number): Promise<ProfileI> {
    return this.profileModel.findById(id).exec();
  }

  async getByEmail(email: string) {
    return this.profileModel.findOne({ email }).exec();
  }

  async getByEmailAndPass(email: string, password: string) {
    const passHash = crypto.createHmac("sha256", password).digest("hex");
    return this.profileModel.findOne({ email, password: passHash }).exec();
  }

  async create(payload: ProfileFillableFields) {
    const user = await this.getByEmail(payload.email);
    if (user) {
      throw new NotAcceptableException("The email already exists in system.");
    }
    const createdProfile = new this.profileModel({
      ...payload,
      password: crypto.createHmac("sha256", payload.password).digest("hex"),
    });
    return createdProfile.save();
  }
}
