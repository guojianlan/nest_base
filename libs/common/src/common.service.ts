import { Injectable } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';

@Injectable()
export class CommonService {
    constructor(private readonly configService:ConfigService){}
    getHello() {
        console.log(this.configService.get('database'))
        return 'hello'
    }
}
