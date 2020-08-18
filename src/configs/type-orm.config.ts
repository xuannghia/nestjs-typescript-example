import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { DB_TYPE, DB_URL } from '../app.environments'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      keepConnectionAlive: true,
      type: DB_TYPE,
      url: DB_URL,
      entities: [process.cwd() + 'src/modules/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false,
    }
  }
}
