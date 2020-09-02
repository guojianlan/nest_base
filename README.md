# nest_base

nestjs 快速初始化

## 目录结构

```html
├── @types 主要编写type类型  
├── README.md  
├── config 配置文件  
├── constants 全局常量  
├── entities 数据库实体  
├── env 环境变量  
├── error 自定义错误  
├── filter 过滤器全局错误捕获  
├── interceptor 这个是拦截器  
├── type typescript外部应用类型  
├── libs 生成libraries工具包  
├── package.json  
├── repository 数据库实体仓库  
├── src 工作目录  
├── tsconfig.build.json  
├── dto 数据传输对象
├── decorator 自定义装饰器  
├── tsconfig.json typescript文件配置  
└── utils 工具函数包
```

---

## nestjs 生命周期

Incoming request  
Globally bound middleware  
Module bound middleware  
Global guards  
Controller guards  
Route guards  
Global interceptors (pre-controller)  
Controller interceptors (pre-controller)  
Route interceptors (pre-controller)  
Global pipes  
Controller pipes  
Route pipes  
Route parameter pipes  
Controller (method handler)  
Service (if exists)  
Route interceptor (post-request)  
Controller interceptor (post-request)  
Global interceptor (post-request)  
Exception filters (route, then controller, then global)  
Server response

---

## cli 命令集合

```bash
Usage: nest generate|g [options] <schematic> [name] [path]

Generate a Nest element.
  Available schematics:
    ┌───────────────┬─────────────┐
    │ name          │ alias       │
    │ application   │ application │
    │ class         │ cl          │
    │ configuration │ config      │
    │ controller    │ co          │
    │ decorator     │ d           │
    │ filter        │ f           │
    │ gateway       │ ga          │
    │ guard         │ gu          │
    │ interceptor   │ in          │
    │ interface     │ interface   │
    │ middleware    │ mi          │
    │ module        │ mo          │
    │ pipe          │ pi          │
    │ provider      │ pr          │
    │ resolver      │ r           │
    │ service       │ s           │
    │ library       │ lib         │
    │ sub-app       │ app         │
    └───────────────┴─────────────┘

Options:
  -d, --dry-run                      Report actions that would be taken without writing out results.
  -p, --project [project]            Project in which to generate files.
  --flat                             Enforce flat structure of generated element.
  --spec                             Enforce spec files generation. (default: true)
  --no-spec                          Disable spec files generation.
  -c, --collection [collectionName]  Schematics collection to use.
  -h, --help                         Output usage information.
```

## 初始化步骤和开发须知

1.npm init -y 初始化 npm  
2.npm install @nestjs/cli -D 安装 cli  
3.创建公共模块 npx nest g library common 然后输入@libs  
4.使用 config 模块,在根目录上创建 config 的目录,npm install nestjs-config -S,然后引入如下代码。注:需要依赖环境变量，在根目录创建 env 文件夹

```js
const ENV = process.env.NODE_ENV;
 ConfigModule.load(
      path.resolve(process.cwd(), 'config', '**', '!(*.d).{ts,js}'),
      {
        path: path.resolve(process.cwd(), 'env', !ENV ? '.env' : `.env.${ENV}`),
      },
    ),
```

5.往公共模块添加数据库@nestjs/typeorm mysql typeorm,添加实体，创建一个公共实体,然后每个实体文件都引入此公共实体，最后引入实体文件,然后公共模块导出,封装公共 repositry,然后自定义一些方法

```js
 TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) =>{
        console.log(config.get('database'))
        return  config.get('database')
      },
      inject: [ConfigService],
    }),
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column } from 'typeorm';
//
export abstract class CommonEntity {
  @Column()
  create_at: number;
  @Column()
  update_at: number;
  @Column()
  delete_at: number;
}
//
import * as entities from 'entities';
const models = TypeOrmModule.forFeature([...Object.values(entities)]);
```

6.往公共模块添加 redis,首先添加 nestjs-redis 模块

```js
 RedisModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('redis'),
      inject: [ConfigService],
    }),
    //然后在commonService封装redis操作
```

7.添加密码框转换函数，新增 utils 文件夹，新增 passowrdtransformer 类，引入 bcrypt 加密类, npm install bcrypt -S，封装到 commomSerive 的静态方法里，全局可以调用

8.在 controller 添加 dto,这个时候要引入 class-validator,只要判断规则不通过，会 emit 出 error,这个时候需要捕获异常，在 app.modules 的 providers 里面引入 filter,捕获异常，这个时候还需要创建 error 文件夹，把所有的自定义错误在里面定义。

9.添加正常请求的拦截器，interceptor，首先添加 transform-data.interceptor.ts 文件，输入一下内容

```js
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class TransformDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        return {
          time: +new Date(),
          data,
        };
      }),
    );
  }
}
```

10。让 utils 文件夹添加新的方法，自定义返回

```js
export class CustomResponse {
  static success(data: any, msg: string = 'success') {
    return {
      data,
      msg: msg,
      code: 0,
    };
  }
  static fail(data: any, msg: string = '', code: number = -1) {
    return {
      data,
      msg,
      code,
    };
  }
}
```

11.创建guard守卫，判断是否有权限或者是否已登录，并且给上下文添加用户信息  

```js
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { CommonService } from '@libs/common';
import { LoginException } from 'error';
import { RoleService } from 'apps/api/src/role/role.service';
import _ = require('lodash');

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly commonService: CommonService,
    private readonly roleService: RoleService,
  ) {

  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    let req = context.switchToHttp().getRequest();
    let authorization = req.headers.authorization;
    if (authorization) {
      let [key, value] = authorization.split(' ');
      if (value != '') {
        const accessToken = await this.commonService.getToken(value);
        if (accessToken) {
          req.tokenValue = JSON.parse(accessToken);
          req.tokenValue.role = _.map(await this.roleService.getRoleByUser(req.tokenValue.user.id), 'name');
          console.log(req.tokenValue)
          // await this.roleService.getRoleByUser(req.tokenValue.user.id))
          return true;
        }
        throw new LoginException();
      }
      throw new LoginException();
    }
    throw new LoginException();
  }
}

```

12.创建装饰器decorator目录，把在守卫里添加上下文的对象通过装饰器引用引入到controller中,例如

```js
import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
export const TokenValue = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    try {
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
```


## 一些问题描述

如果不需要自动生成 spec 文件，在 nest-cli.json 添加一下代码，或者生成代码的时候添加 --spec false

```js
"generateOptions": {
    "spec": false
  },
```
