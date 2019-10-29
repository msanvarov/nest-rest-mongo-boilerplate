import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import * as headers from "fastify-helmet";
import * as fastifyRateLimiter from "fastify-rate-limit";
import { AppModule } from "./modules/app/app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

/**
 * The url endpoint for open api ui
 * @type {string}
 */
export const SWAGGER_API_ROOT = "api/docs";
/**
 * The name of the api
 * @type {string}
 */
export const SWAGGER_API_NAME = "API";
/**
 * A short description of the api
 * @type {string}
 */
export const SWAGGER_API_DESCRIPTION = "API Description";
/**
 * Current version of the api
 * @type {string}
 */
export const SWAGGER_API_CURRENT_VERSION = "1.0";
/**
 * The default authentication method
 * @type {string}
 */
export const SWAGGER_API_AUTH_NAME = "Authorization";
/**
 * Where the SWAGGER_API_AUTH_NAME will be used in the request
 * @type {string}
 */
export const SWAGGER_API_AUTH_LOCATION = "header";
/**
 * Types of api schemes
 * @type {string[]}
 */
export const SWAGGER_API_SCHEMES: Array<"http" | "https"> = ["http", "https"];

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: console }),
  );
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .setSchemes(...SWAGGER_API_SCHEMES)
    .addBearerAuth(SWAGGER_API_AUTH_NAME, SWAGGER_API_AUTH_LOCATION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);
  app.enableCors();
  app.register(headers);
  app.register(fastifyRateLimiter, {
    max: 100,
    timeWindow: "1 minute",
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(9000, "0.0.0.0");
})();
