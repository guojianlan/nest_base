import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { CommonService } from '@libs/common';
import { LoginException } from 'error';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly commonService: CommonService,
    ) {

    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        let req = context.switchToHttp().getRequest();
        //获取头部的值，验证是否过期
        let authorization = req.headers.authorization;
        if (authorization) {
            let [key, value] = authorization.split(' ');
            throw new LoginException();
        }
        throw new LoginException();
    }
}
