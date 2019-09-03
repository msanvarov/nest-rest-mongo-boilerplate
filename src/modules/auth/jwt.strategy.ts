import { ExtractJwt, JwtPayload, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { ConfigService } from "../config/config.service";
import { ProfileService } from "../profile/profile.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly profileService: ProfileService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("WEBTOKEN_SECRET_KEY"),
    });
  }

  async validate({ iat, exp, _id }: JwtPayload, done) {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }

    const user = await this.profileService.get(_id);
    if (Object.entries(user).length === 0 && user.constructor === Object) {
      throw new UnauthorizedException();
    }

    console.log("validation for jwt strategy:", user);
    done(null, user);
  }
}
