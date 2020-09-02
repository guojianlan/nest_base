import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { throwError } from 'rxjs';
import { CustomValidationException } from 'error';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      console.log(errors)
      throw new CustomValidationException('参数错误', errors);
    },
  }))
  await app.listen(3000);
}
bootstrap();
