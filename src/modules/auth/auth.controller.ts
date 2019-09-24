import { Controller, Body, Post } from "@nestjs/common";
import { ApiResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginPayload } from "./payload/login.payload";
import { RegisterPayload } from "./payload/register.payload";
import { ProfileService } from "../profile/profile.service";

/**
 * Authentication Controller
 */
@Controller("api/auth")
@ApiUseTags("authentication")
export class AuthController {
  /**
   * Constructor
   * @param {AuthService} authService authentication service
   * @param {ProfileService} profileService profile service
   */
  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService,
  ) {}

  /**
   * Authentication route to login
   * @param {LoginPayload} payload the login dto
   */
  @Post("login")
  @ApiResponse({ status: 201, description: "Login Completed" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async login(@Body() payload: LoginPayload) {
    const user = await this.authService.validateUser(payload);
    return await this.authService.createToken(user);
  }

  /**
   * Authentication route to register
   * @param {RegisterPayload} payload the registration dto
   */
  @Post("register")
  @ApiResponse({ status: 201, description: "Registration Completed" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async register(@Body() payload: RegisterPayload) {
    const user = await this.profileService.create(payload);
    return await this.authService.createToken(user);
  }
}
