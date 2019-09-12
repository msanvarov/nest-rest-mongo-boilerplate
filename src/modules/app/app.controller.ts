import { Controller, Delete, Get, Param, Req, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { ProfileService } from "../profile/profile.service";

@Controller()
@ApiBearerAuth()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly profileService: ProfileService,
  ) {}

  @Get()
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 200, description: "Request Received" })
  @ApiResponse({ status: 400, description: "Request Failed" })
  getString(): string {
    return this.appService.mainRoute();
  }

  @Get("/api/profile")
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 200, description: "Request Received" })
  @ApiResponse({ status: 400, description: "Request Failed" })
  getProfile(@Req() req) {
    return req.user;
  }

  @Delete("/api/profile/:username")
  @ApiResponse({ status: 200, description: "Request Received" })
  @ApiResponse({ status: 400, description: "Request Failed" })
  async delete(@Param("username") username: string) {
    return await this.profileService.delete(username);
  }
}
