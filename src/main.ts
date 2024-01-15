import { NestFactory } from "@nestjs/core";
import headers from "helmet";
import rateLimiter from "express-rate-limit";
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

(async () => {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  app.use(headers());
  app.use(
    rateLimiter({
      windowMs: 60, // 1 minutes
      limit: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addBearerAuth()
    .addServer("http://localhost:9000/", "Local environment")
    .addServer("https://staging.yourapi.com/", "Staging")
    .addServer("https://production.yourapi.com/", "Production")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);

  await app.listen(9000, "0.0.0.0");
})();
