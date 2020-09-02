import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
export const TokenValue = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        try {
            // 获取上下文对象
            const req = ctx.switchToHttp().getRequest();
            const tokenValue = req.tokenValue;
            return data ? tokenValue && tokenValue[data] : tokenValue;
        } catch (error) {
            console.log('TokenValue-error', error);
            return '';
        }
    },
);

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);