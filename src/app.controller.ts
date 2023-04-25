import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getAppName() {
    return 'AXA Insurance API!';
  }
}
