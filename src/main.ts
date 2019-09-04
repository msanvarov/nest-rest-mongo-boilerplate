import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import * as helmet from "fastify-helmet";
import * as fastifyRateLimit from "fastify-rate-limit";
import { AppModule } from "./modules/main/app.module";
import { setupSwagger } from "./swagger";
import { ValidationPipe } from "@nestjs/common";

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: console }),
  );
  setupSwagger(app);
  app.enableCors();
  app.register(helmet);
  app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: "1 minute",
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(9001, "0.0.0.0");
})();
