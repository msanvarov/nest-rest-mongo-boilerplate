import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "./../config";
import { ProfileI, ProfileService } from "../profile";
import { LoginPayload } from "./login.payload";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly profileService: ProfileService,
  ) {}

  async createToken(user: ProfileI) {
    return {
      expiresIn: this.configService.get("JWT_EXPIRATION_TIME"),
      accessToken: this.jwtService.sign({ id: user.id }),
      user,
    };
  }

  async validateUser(payload: LoginPayload): Promise<any> {
    const user = await this.profileService.getByEmailAndPass(
      payload.email,
      payload.password,
    );
    if (!user) {
      throw new UnauthorizedException("Wrong login combination!");
    }
    return user;
  }
}
