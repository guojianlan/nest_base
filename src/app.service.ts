import { Injectable } from '@nestjs/common';
import { CommonService } from '@libs/common';

@Injectable()
export class AppService {
  constructor(private readonly commonService: CommonService) {

  }
  getHello(): string {
    return this.commonService.getHello() + 'Hello World!';
  }
}
