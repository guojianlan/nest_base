# nest_base
nestjs快速初始化
## 初始化步骤和开发须知
1.npm init -y 初始化npm  
2.npm install @nestjs/cli -D 安装cli  
3.创建公共模块 npx nest g library common 然后输入@libs  
4.使用config模块,在根目录上创建config的目录,npm install nestjs-config -S,然后引入如下代码。注:需要依赖环境变量，在根目录创建env文件夹

```js
const ENV = process.env.NODE_ENV;
 ConfigModule.load(
      path.resolve(process.cwd(), 'config', '**', '!(*.d).{ts,js}'),
      {
        path: path.resolve(process.cwd(), 'env', !ENV ? '.env' : `.env.${ENV}`),
      },
    ),
```

## 一些问题描述
如果不需要自动生成spec文件，在nest-cli.json 添加一下代码，或者生成代码的时候添加 --spec false
```js
"generateOptions": {
    "spec": false
  },
```
