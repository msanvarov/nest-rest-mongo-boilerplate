import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ACGuard, UseRoles } from "nest-access-control";
import { ApiBearerAuth, ApiResponse, ApiUseTags } from "@nestjs/swagger";
import { ProfileService } from "./profile.service";
import { PatchProfilePayload } from "./payload/patch.profile.payload";

/**
 * Profile Controller
 */
@ApiBearerAuth()
@ApiUseTags("profile")
@Controller("api/profile")
export class ProfileController {
  /**
   * Constructor
   * @param profileService
   */
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Get a particular profile
   * @param username the profile given username to fetch
   */
  @Get(":username")
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 200, description: "Fetch Profile Request Received" })
  @ApiResponse({ status: 400, description: "Fetch Profile Request Failed" })
  async getProfile(@Param("username") username: string) {
    const profile = await this.profileService.getByUsername(username);
    if (!profile) {
      throw new BadRequestException(
        "The profile with that username could not be found.",
      );
    }
    return profile;
  }

  /**
   * Edit profile information
   * @param {RegisterPayload} payload
   */
  @Patch()
  @UseGuards(AuthGuard())
  @UseRoles({
    resource: "profiles",
    action: "update",
    possession: "any",
  })
  @ApiResponse({ status: 200, description: "Patch Profile Request Received" })
  @ApiResponse({ status: 400, description: "Patch Profile Request Failed" })
  async patchProfile(@Body() payload: PatchProfilePayload) {
    return await this.profileService.edit(payload);
  }

  /**
   * Delete route to remove profiles from app
   * @param {string} username the username to remove
   */
  @Delete(":username")
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    resource: "profiles",
    action: "delete",
    possession: "any",
  })
  @ApiResponse({ status: 200, description: "Delete Profile Request Received" })
  @ApiResponse({ status: 400, description: "Delete Profile Request Failed" })
  async delete(@Param("username") username: string) {
    return await this.profileService.delete(username);
  }
}
