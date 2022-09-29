import { Injectable } from '@nestjs/common';
import { Message } from '@starter/api-types';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
