import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolePermission } from './role-permission.entity'
import { RolePermissionRepository } from './role-permission.repository'
import { RolesPermissionsService } from './roles-permissions.service'
import { RolesPermissionsController } from './roles-permissions.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([RolePermission, RolePermissionRepository]),
  ],
  providers: [RolesPermissionsService],
  controllers: [RolesPermissionsController],
  exports: [RolesPermissionsService],
})
export class RolesPermissionsModule {}
