import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./modules/app/app.module";
import { configureOpenAPI } from "./swagger";

/**
 * Represents the webpack meta data
 */
declare const module: any;

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: console }),
  );
  configureOpenAPI(app);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(9000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
})();
