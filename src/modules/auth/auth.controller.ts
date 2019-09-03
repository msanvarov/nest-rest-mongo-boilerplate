import { Controller, Body, Post } from "@nestjs/common";
import { ApiResponse, ApiUseTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginPayload } from "./login.payload";
import { RegisterPayload } from "./register.payload";
import { ProfileService } from "../profile/profile.service";

@Controller("api/auth")
@ApiUseTags("authentication")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService,
  ) {}

  @Post("login")
  @ApiResponse({ status: 201, description: "Login Completed" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async login(@Body() payload: LoginPayload) {
    const user = await this.authService.validateUser(payload);
    return await this.authService.createToken(user);
  }

  @Post("register")
  @ApiResponse({ status: 201, description: "Registration Completed" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async register(@Body() payload: RegisterPayload): Promise<object> {
    const user = await this.profileService.create(payload);
    return await this.authService.createToken(user);
  }
}
