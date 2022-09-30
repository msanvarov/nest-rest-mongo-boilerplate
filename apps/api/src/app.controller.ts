import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

import { IMessage } from '@starter/api-types';

import { AppService } from './app.service';
import { Public } from './auth/public.decorator';

/**
 * App Controller
 */
@ApiBearerAuth()
@Controller()
export class AppController {
  /**
   * Constructor
   * @param {AppService} appService app service
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Returns a welcome message
   * @returns {string} a welcome message
   */
  @Public()
  @Get('/')
  @ApiResponse({ status: 200, description: 'Root Request Completed' })
  @ApiResponse({ status: 400, description: 'Root Request Failed' })
  async getStartingMessage(): Promise<IMessage> {
    return this.appService.startingMessage();
  }
}
