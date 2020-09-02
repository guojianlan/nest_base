import { HttpException } from '@nestjs/common';
import { CommonService } from '@libs/common';
import { CustomException } from './custom';
export type CustomExceptionName = 'CommonException' | 'CustomException' | 'CustomValidationException' | 'CustomValidationException'
export class CommonException extends CustomException {
  constructor(message: any) {
    super(CustomException.createBody({ message }, message, 400), 400);
  }
}
export class LoginException extends CustomException {
  constructor(message: string = '你尚未登录', data: any = {}) {
    super(
      CustomException.createBody(
        { message, data },
        message,
        2000,
      ),
      2000,
    );
  }
}
export class CustomValidationException extends CustomException {
  constructor(message: any, data: any = {}) {

    super(
      CustomException.createBody(
        { message, data },
        message,
        700,
      ),
      700,
    );
  }
}
export default CustomException