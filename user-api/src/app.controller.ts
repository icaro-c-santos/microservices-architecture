import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('me')
  getHello() {
    return this.appService.getUser('cea07d0e-55d5-41bb-9c48-3e4f92161015');
  }
}
