import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import CustomException, { CustomValidationException, CustomExceptionName } from 'error';
import { CustomResponse } from 'utils';

function isCustomException(exception): exception is CustomException {
  return exception instanceof CustomException;
}
function isGlobalError(exception): exception is Error {
  return exception instanceof Error;
}
function isCustomValidationException(exception): exception is CustomValidationException {
  return exception instanceof CustomValidationException;
}
@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const request: Request = ctx.getRequest();
    // 自定义错误
    if (isCustomException(exception)) {
      let name = exception.getName()

      switch (name) {
        case 'CustomValidationException':
          return response.status(200).json(CustomResponse.fail(
            exception.getData(),
            exception.message,
            exception.getStatus()
          ))
        default:
          return response.status(200).json({
            custom: 2
          })

      }
    }
    if (isGlobalError(exception)) {
      // 不知道的错误
      // logError(exception);
      return response
        .status(500)
        .send(exception.message);
    }
  }
}
