import { Injectable } from "@nestjs/common";
import { ConfigService } from "../config/config.service";

@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}

  mainRoute(): string {
    return this.config.get("APP_URL");
  }
}
