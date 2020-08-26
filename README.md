# nest_base

nestjs 快速初始化
## 目录结构
|-- @types&emsp;主要编写type类型  
|-- config&emsp;配置文件  
|-- constants&emsp;全局常亮  
|-- entities&emsp;数据库实体  
|-- env&emsp;环境变量  
|-- libs&emsp;生成libraries工具包  
&emsp;└─── common  
|-- repository&emsp;数据库实体仓库  
|-- src&emsp;工作目录  
|-- utils&emsp;工具函数包  
|-- package.json  
|-- README.md  
|-- tsconfig.json&emsp;typescript文件配置  
|-- tsconfig.build.json  
----------------

## cli命令集合  

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

7.添加密码框转换函数，新增 utils 文件夹，新增 passowrdtransformer 类，引入bcrypt加密类, npm install bcrypt -S，封装到commomSerive的静态方法里，全局可以调用
```js

```
## 一些问题描述

如果不需要自动生成 spec 文件，在 nest-cli.json 添加一下代码，或者生成代码的时候添加 --spec false

```js
"generateOptions": {
    "spec": false
  },
```
