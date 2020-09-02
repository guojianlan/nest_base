import { Controller, Get, Param, Post, Inject, Optional } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Optional() @Inject('HTTP_OPTIONS') private readonly httpClient: any
  ) { }

  @Get()
  getHello() {
    console.log(this.httpClient)
    return this.appService.getHello();
  }
}
