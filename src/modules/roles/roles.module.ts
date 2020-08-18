import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './role.entity'
import { RoleRepository } from './role.repository'
import { RolesService } from './roles.service'
import { RolesController } from './roles.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Role, RoleRepository])],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
