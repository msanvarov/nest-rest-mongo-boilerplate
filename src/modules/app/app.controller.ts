import { Controller, Delete, Get, Param, Req, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { ProfileService } from "../profile/profile.service";
import { ACGuard, UseRoles } from "nest-access-control";

/**
 * App Controller
 */
@Controller()
@ApiBearerAuth()
export class AppController {
  /**
   * Constructor
   * @param appService
   * @param profileService
   */
  constructor(
    private readonly appService: AppService,
    private readonly profileService: ProfileService,
  ) {}

  /**
   * Main route
   * @returns {string} the application environment url
   */
  @Get()
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 200, description: "Request Received" })
  @ApiResponse({ status: 400, description: "Request Failed" })
  getString(): string {
    return this.appService.root();
  }

  // These routes can be moved to the profile module.

  /**
   * Debug route
   * @param{Req} req the request body
   */
  @Get("/api/profile")
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 200, description: "Request Received" })
  @ApiResponse({ status: 400, description: "Request Failed" })
  getProfile(@Req() req) {
    return req.user;
  }

  /**
   * Delete route to remove profiles from app
   * @param {string} username the username to remove
   */
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    resource: "profiles",
    action: "delete",
    possession: "any",
  })
  @Delete("/api/profile/:username")
  @ApiResponse({ status: 200, description: "Request Received" })
  @ApiResponse({ status: 400, description: "Request Failed" })
  async delete(@Param("username") username: string) {
    return await this.profileService.delete(username);
  }
}
