import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  mainRoute(): string {
    return "Main Route";
  }
}
