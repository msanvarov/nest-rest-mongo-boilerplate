import { Injectable, Module } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { expect } from "chai";
import { WINSTON_MODULE_PROVIDER } from "./winston.constants";
import { WinstonModule } from "./winston.module";

describe("Winston Module", () => {
  it("boots successfully", async () => {
    const rootModule = await Test.createTestingModule({
      imports: [WinstonModule.forRoot({})],
    }).compile();

    expect(rootModule.get(WINSTON_MODULE_PROVIDER)).to.be.an("object");
  });

  it("boots successfully asynchronously", async () => {
    @Injectable()
    // @ts-ignore
    class ConfigService {
      public loggerOptions = {};
    }

    @Module({
      providers: [ConfigService],
      exports: [ConfigService],
    })
    // @ts-ignore
    class FeatureModule {}

    const rootModule = await Test.createTestingModule({
      imports: [
        WinstonModule.forRootAsync({
          imports: [FeatureModule],
          useFactory: (cfg: ConfigService) => cfg.loggerOptions,
          inject: [ConfigService],
        }),
      ],
    }).compile();

    const app = rootModule.createNestApplication();
    await app.init();

    expect(rootModule.get(WINSTON_MODULE_PROVIDER)).to.be.an("object");
  });
});
