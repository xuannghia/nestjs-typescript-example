import { Repository } from 'typeorm'
import { EntityRepository } from 'typeorm/decorator/EntityRepository'
import { RolePermission } from './role-permission.entity'

@EntityRepository(RolePermission)
export class RolePermissionRepository extends Repository<RolePermission> {}
