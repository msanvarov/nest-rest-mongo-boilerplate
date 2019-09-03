import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "../config";
import { IProfile, ProfileService } from "../profile";
import { LoginPayload } from "./login.payload";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly profileService: ProfileService,
  ) {}

  async createToken({ _id, username, email, avatar }: IProfile) {
    return {
      expiresIn: this.configService.get("JWT_EXPIRATION_TIME"),
      accessToken: this.jwtService.sign({ _id, username, email, avatar }),
    };
  }

  async validateUser(payload: LoginPayload) {
    const user = await this.profileService.getByUsernameAndPass(
      payload.username,
      payload.password,
    );
    if (!user) {
      throw new UnauthorizedException("Wrong login combination!");
    }
    return user;
  }
}
