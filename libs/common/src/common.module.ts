import { Module, Global } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from 'nestjs-config'
import * as path from 'path'
const ENV = process.env.NODE_ENV;
@Global()
@Module({
  imports: [
    ConfigModule.load(
      path.resolve(process.cwd(), 'config', '**', '!(*.d).{ts,js}'),
      {
        path: path.resolve(process.cwd(), 'env', !ENV ? '.env' : `.env.${ENV}`),
      },
    ),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule { }
