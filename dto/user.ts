import { IsNotEmpty } from 'class-validator';

export class LoginByEmailDto {
    @IsNotEmpty({
        message: '邮箱不能为空',
    })
    email: string;
    @IsNotEmpty({
        message: '密码不能为空',
    })
    password: string;
    @IsNotEmpty({
        message: '验证码不能为空',
    })
    code: string;
}
export class loginAndRegisterByMobileDto {
    @IsNotEmpty({
        message: '验证码不能为空',
    })
    code: string
    @IsNotEmpty({
        message: '手机号不能为空',
    })
    mobile: string
}