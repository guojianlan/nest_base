import { Injectable, Inject } from '@nestjs/common';
import { CommonService } from '@libs/common';

@Injectable()
export class AppService {
  constructor(
    private readonly commonService: CommonService,
  ) {

  }
  getHello() {

    return "hello"
    // return this.commonService.getHello() + 'Hello World!';
  }

}
