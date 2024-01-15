import * as winston from "winston";
import * as rotateFile from "winston-daily-rotate-file";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule, MongooseModuleFactoryOptions } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "../auth/auth.module";
import { ProfileModule } from "../profile/profile.module";
import { WinstonModule } from "../winston/winston.module";
import { AccessControlModule } from "nest-access-control";
import { roles } from "./app.roles";
import * as joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.development.local", ".env.development", ".env"],
      validationSchema: joi.object({
        APP_ENV: joi.string().valid("dev", "prod").default("dev"),
        APP_URL: joi.string().uri({
          scheme: [/https?/],
        }),
        WEBTOKEN_SECRET_KEY: joi.string().required(),
        WEBTOKEN_EXPIRATION_TIME: joi.number().default(1800),
        DB_URL: joi.string().regex(/^mongodb/),
      }),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService,
      ): MongooseModuleFactoryOptions => {
        return {
          uri: configService.get("DB_URL"),
        };
      },
    }),
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get("APP_ENV") === "dev"
          ? {
              level: "info",
              format: winston.format.json(),
              defaultMeta: { service: "user-service" },
              transports: [
                new winston.transports.Console({
                  format: winston.format.simple(),
                }),
              ],
            }
          : {
              level: "info",
              format: winston.format.json(),
              defaultMeta: { service: "user-service" },
              transports: [
                new winston.transports.File({
                  filename: "logs/error.log",
                  level: "error",
                }),
                new winston.transports.Console({
                  format: winston.format.simple(),
                }),
                new rotateFile({
                  filename: "logs/application-%DATE%.log",
                  datePattern: "YYYY-MM-DD",
                  zippedArchive: true,
                  maxSize: "20m",
                  maxFiles: "14d",
                }),
              ],
            };
      },
    }),
    AccessControlModule.forRoles(roles),
    ConfigModule,
    AuthModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
