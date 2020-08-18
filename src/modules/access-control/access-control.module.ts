import { Logger, Module } from '@nestjs/common'
import { AccessControlService } from './access-control.service'
import { AccessControlController } from './access-control.controller'
import { UsersModule } from '../users/users.module'
import { RolesPermissionsModule } from '../roles-permissions/roles-permissions.module'

@Module({
  imports: [UsersModule, RolesPermissionsModule],
  providers: [AccessControlService, Logger],
  controllers: [AccessControlController],
  exports: [AccessControlService],
})
export class AccessControlModule {}
