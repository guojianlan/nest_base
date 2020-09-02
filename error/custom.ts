import { isString, isObject } from 'util';
import { CustomExceptionName } from './index'
export class CustomException extends Error {
  constructor(
    private readonly response: string | Record<string, any>,
    private readonly status: number,
  ) {
    super();
    this.initMessage();
  }

  public initMessage() {
    if (isString(this.response)) {
      this.message = this.response;
    } else if (
      isObject(this.response) &&
      isString((this.response as Record<string, any>).message)
    ) {
      this.message = (this.response as Record<string, any>).message;
    } else if (this.constructor) {
      this.message = this.constructor.name
        .match(/[A-Z][a-z]+|[0-9]+/g)
        .join(' ');
    }
  }
  public getName() {
    return this.constructor.name
  }
  public getResponse(): string | object {
    return this.response;
  }
  public getData(): any {
    return (this.response as Record<string, any>).data
  }
  public getStatus(): number {
    return this.status;
  }

  public static createBody(
    objectOrError: object | string,
    message?: string,
    statusCode?: number,
  ) {
    if (!objectOrError) {
      return { statusCode, message };
    }
    return isObject(objectOrError) && !Array.isArray(objectOrError)
      ? objectOrError
      : { statusCode, message: objectOrError, error: message };
  }
}
