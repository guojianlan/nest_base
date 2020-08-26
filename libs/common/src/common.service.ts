import { Injectable } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import * as bcrypt from 'bcrypt';
import * as constants from 'constants/index'
@Injectable()
export class CommonService {
    constructor(private readonly configService: ConfigService) { }
    getHello() {
        return 'hello'
    }
    public static generateHash(text: string) {
        return bcrypt.hashSync(text, constants.SALT_ROUNDS)

    }
    public static composeHash(text: string, hash: string) {
        return bcrypt.compareSync(text, hash)
    }
}
