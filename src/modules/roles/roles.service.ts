import { Injectable } from '@nestjs/common'
import { CrudTypeOrmService } from '../../common/services/crud-type-orm.service'
import { Role } from './role.entity'
import { RoleRepository } from './role.repository'

@Injectable()
export class RolesService extends CrudTypeOrmService<Role> {
  constructor(private readonly roleRepository: RoleRepository) {
    super(roleRepository)
  }
}
