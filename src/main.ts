import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import * as headers from "fastify-helmet";
import * as fastifyRateLimiter from "fastify-rate-limit";
import { AppModule } from "./modules/app/app.module";
import { configureOpenAPI } from "./swagger";
import { ValidationPipe } from "@nestjs/common";

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: console }),
  );
  configureOpenAPI(app);
  app.enableCors();
  app.register(headers);
  app.register(fastifyRateLimiter, {
    max: 100,
    timeWindow: "1 minute",
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(9000, "0.0.0.0");
})();
