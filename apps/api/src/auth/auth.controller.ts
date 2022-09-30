import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { IJWTResponseBody } from '@starter/api-types';

import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './public.decorator';

/**
 * Authentication Controller
 */
@ApiTags('authentication')
@Controller('v1/auth')
export class AuthController {
  /**
   * Constructor
   * @param {AuthService} authService authentication service
   * @param {ProfileService} usersService profile service
   */
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Login route to validate and create tokens for users
   * @param {LoginDto} payload the login dto
   */
  @Public()
  @Post('login')
  @ApiResponse({ status: 201, description: 'Login Completed' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() payload: LoginDto): Promise<IJWTResponseBody> {
    const user = await this.authService.validateUser(payload);
    return this.authService.createToken(user);
  }

  /**
   * Authentication route to register
   * @param {RegisterDto} payload the registration dto
   */
  @Public()
  @Post('register')
  @ApiResponse({ status: 201, description: 'Registration Completed' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: RegisterDto) {
    const user = await this.usersService.create(payload);
    return this.authService.createToken(user);
  }
}
