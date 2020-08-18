import { Injectable } from '@nestjs/common'
import { CrudTypeOrmService } from '../../common/services/crud-type-orm.service'
import { RolePermission } from './role-permission.entity'
import { RolePermissionRepository } from './role-permission.repository'

@Injectable()
export class RolesPermissionsService extends CrudTypeOrmService<
  RolePermission
> {
  constructor(
    private readonly rolePermissionRepository: RolePermissionRepository,
  ) {
    super(rolePermissionRepository)
  }
}
