import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "../config/config.service";
import { ProfileService } from "../profile/profile.service";
import { IProfile } from "../profile/profile.model";
import { LoginPayload } from "./payload/login.payload";

/**
 * Authentication Service
 */
@Injectable()
export class AuthService {
  /**
   * Time in seconds when the token is to expire
   * @type {string}
   */
  private readonly expiration: string;

  /**
   * Constructor
   * @param {JwtService} jwtService jwt service
   * @param {ConfigService} configService
   * @param {ProfileService} profileService profile service
   */
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly profileService: ProfileService,
  ) {
    this.expiration = this.configService.get("WEBTOKEN_EXPIRATION_TIME");
  }

  /**
   * Creates a signed jwt token based on payload
   * @param {Profile} param dto to generate token from
   */
  async createToken({ _id, username, email, avatar }: IProfile) {
    return {
      expires: this.expiration,
      expiresPrettyPrint: this.prettyPrintSeconds(this.expiration),
      token: this.jwtService.sign({ _id, username, email, avatar }),
    };
  }

  /**
   * Formats the time in seconds into human-readable format
   * @param {string} time
   */
  private prettyPrintSeconds(time: string) {
    const ntime = Number(time);
    const hours = Math.floor(ntime / 3600);
    const minutes = Math.floor((ntime % 3600) / 60);
    const seconds = Math.floor((ntime % 3600) % 60);

    return `${hours > 0 ? hours + (hours === 1 ? " hour," : " hours,") : ""} ${
      minutes > 0 ? minutes + (minutes === 1 ? " minute" : " minutes") : ""
    } ${seconds > 0 ? seconds + (seconds === 1 ? " second" : " seconds") : ""}`;
  }

  /**
   * Validates whether or not the profile exists in the database
   * @param {LoginPayload} payload login payload to authenticate with
   */
  async validateUser(payload: LoginPayload) {
    const user = await this.profileService.getByUsernameAndPass(
      payload.username,
      payload.password,
    );
    if (!user) {
      throw new UnauthorizedException(
        "Could not authenticate. Please try again.",
      );
    }
    return user;
  }
}
