import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './modules/users/users.module'
import { TypeOrmConfigService } from './configs/type-orm.config'
import { AuthModule } from './modules/auth/auth.module'
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE, Reflector } from '@nestjs/core'
import { GlobalAuthGuard } from './modules/auth/guards/global-auth.guard'
import { ValidationPipe } from './common/pipes/validation.pipe'
import { AccessControlModule } from './modules/access-control/access-control.module'
import { RolesModule } from './modules/roles/roles.module'
import { RolesPermissionsModule } from './modules/roles-permissions/roles-permissions.module'

@Module({
  imports: [
    Logger,
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AuthModule,
    UsersModule,
    AccessControlModule,
    RolesModule,
    RolesPermissionsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useFactory: ref => new GlobalAuthGuard(ref),
      inject: [Reflector],
    },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({ transform: true, whitelist: true }),
    },
    {
      provide: APP_INTERCEPTOR,
      useFactory: ref => new ClassSerializerInterceptor(ref),
      inject: [Reflector],
    },
  ],
})
export class AppModule {}
