import { Module, Global } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule, ConfigService } from 'nestjs-config'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as path from 'path'
import * as entities from 'entities';
import * as Repository from 'repository'

const ENV = process.env.NODE_ENV;
const models = TypeOrmModule.forFeature([...Object.values(entities), ...Object.values(Repository)]);
@Global()
@Module({
  imports: [
    ConfigModule.load(
      path.resolve(process.cwd(), 'config', '**', '!(*.d).{ts,js}'),
      {
        path: path.resolve(process.cwd(), 'env', !ENV ? '.env' : `.env.${ENV}`),
      },
    ),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return config.get('database')
      },
      inject: [ConfigService],
    }),
    models
  ],
  providers: [CommonService],
  exports: [CommonService, models],
})
export class CommonModule { }
