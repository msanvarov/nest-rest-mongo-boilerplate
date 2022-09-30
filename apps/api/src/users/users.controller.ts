import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { IGenericMessageBody } from '@starter/api-types';

import { CheckPolicies } from '../casl/check-policies.decorator';
import { PoliciesGuard } from '../casl/policies.guard';
import { DeleteUserPolicyHandler } from '../casl/policy-handlers';
import { PatchUserDto } from './dto/patch-user.dto';
import { User } from './user.schema';
import { UsersService } from './users.service';

/**
 * Users Controller
 */
@ApiBearerAuth()
@ApiTags('users')
@Controller('v1/users')
export class UsersController {
  /**
   * Constructor
   * @param usersService
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Retrieves current authenticated user
   * @returns {Promise<User>} queried user data
   */
  @Get('user')
  getUser(@Request() req) {
    return req.user;
  }

  /**
   * Retrieves a particular user
   * @param username the user given username to fetch
   * @returns {Promise<User>} queried user data
   */
  @Get(':username')
  @ApiResponse({ status: 200, description: 'Fetch User Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch User Request Failed' })
  async getUserByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.getByUsername(username);
    if (!user) {
      throw new BadRequestException(
        'The user with that username could not be found.'
      );
    }
    return user;
  }

  /**
   * Edit a user
   * @param {RegisterPayload} payload
   * @returns {Promise<User>} mutated user data
   */
  @Patch()
  @ApiResponse({ status: 200, description: 'Patch User Request Received' })
  @ApiResponse({ status: 400, description: 'Patch User Request Failed' })
  async patchUser(@Body() payload: PatchUserDto): Promise<User> {
    return this.usersService.edit(payload);
  }

  /**
   * Removes a user from the database
   * @param {string} username the username to remove
   * @returns {Promise<IGenericMessageBody>} whether or not the user has been deleted
   */
  @Delete(':username')
  @UseGuards(PoliciesGuard)
  @CheckPolicies(new DeleteUserPolicyHandler())
  @ApiResponse({ status: 200, description: 'Delete User Request Received' })
  @ApiResponse({ status: 400, description: 'Delete User Request Failed' })
  async deleteUserByUsername(
    @Param('username') username: string
  ): Promise<IGenericMessageBody> {
    return this.usersService.delete(username);
  }
}
