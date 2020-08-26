import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    return this.appService.getHello();
  }
  @Get('user')
  createUser(){
    return this.appService.createUser();
  }
  @Get('user2')
  async updateUser(){
    return this.appService.updateUser();
  }
  @Post('user/:id')
  async deleteUser(@Param('id') id){
    return this.appService.deleteUser(id);
  }
  @Get('user/:id')
  async getUser(@Param('id') id){
    return this.appService.getUser(id);
  }
}
