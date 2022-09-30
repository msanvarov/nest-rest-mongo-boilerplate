import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../users/user.schema';
import { UsersService } from '../users/users.service';

/**
 * Jwt Strategy Class
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor
   * @param {ConfigService} configService
   * @param {ProfileService} usersService
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('WEBTOKEN_ENCRYPTION_KEY'),
    });
  }

  /**
   * Checks if the bearer token is a valid token
   * @param {Record<string, unknown>} jwtPayload validation method for jwt token
   * @returns {Promise<Record<string, unknown>>} a object to be signed
   */
  async validate({ iat, exp, id }: Record<string, number>): Promise<User> {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.get(id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
