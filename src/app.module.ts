import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '@libs/common'
import { AllExceptionsFilter } from 'filter/index'
import { UserModule } from './user/user.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformDataInterceptor } from 'interceptor/transform-data.interceptor';
@Module({
  imports: [CommonModule, UserModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter
  }, {
      provide: APP_INTERCEPTOR,
      useClass: TransformDataInterceptor
    }],

  exports: []
})
export class AppModule { }
