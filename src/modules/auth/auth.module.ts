import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ProfileModule } from "../profile/profile.module";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./auth.controller";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ProfileModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get("WEBTOKEN_SECRET_KEY"),
          signOptions: {
            ...(configService.get("WEBTOKEN_EXPIRATION_TIME")
              ? {
                  expiresIn: Number(
                    configService.get("WEBTOKEN_EXPIRATION_TIME"),
                  ),
                }
              : {}),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule.register({ defaultStrategy: "jwt" })],
})
export class AuthModule {}
