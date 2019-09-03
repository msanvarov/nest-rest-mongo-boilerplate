import * as dotenv from "dotenv";
import * as joi from "@hapi/joi";
import * as fs from "fs";

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = ConfigService.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private static validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: joi.ObjectSchema = joi.object({
      APP_ENV: joi
        .string()
        .valid(["dev", "prod"])
        .default("dev"),
      APP_URL: joi
        .string()
        .regex(/:\/\/[0-9a-z-.]+\.[a-z]+\//i)
        .uri({
          scheme: [/https?/],
        }),
      WEBTOKEN_SECRET_KEY: joi.string().required(),
      WEBTOKEN_EXPIRATION_TIME: joi.number().default(1800),
      DB_URL: joi.string().regex(/^mongodb/),
    });

    const { error, value: validatedEnvConfig } = joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
