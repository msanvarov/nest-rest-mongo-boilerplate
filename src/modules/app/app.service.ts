import { Injectable, Inject } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import { Logger } from "winston";

/**
 * Application Service
 */
@Injectable()
export class AppService {
  /**
   * Constructor
   * @param {ConfigService} config configuration service
   * @param {Logger} logger logger service
   */
  constructor(
    private config: ConfigService,
    @Inject("winston") private readonly logger: Logger,
  ) {}

  /**
   * Fetches and logs the APP_URL environment variable from the configuration file.
   * @returns {string} the application url
   */
  root(): string {
    const appURL = this.config.get("APP_URL");
    this.logger.info("Logging the APP_URL -> " + appURL);
    return appURL;
  }
}
