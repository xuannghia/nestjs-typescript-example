import { DB_TYPE, DB_URL } from './src/app.environments'

const ormConfig = {
  keepConnectionAlive: true,
  type: DB_TYPE,
  url: DB_URL,
  entities: ['src/modules/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,

  migrationsTableName: 'migrations',
  migrations: ['src/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations'
  }
}

module.exports = ormConfig
