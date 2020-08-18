import { Entity, Column, OneToMany, JoinColumn } from 'typeorm'
import { AbstractEntity } from '../../common/entities/abstract.entity'
import { RolePermission } from '../roles-permissions/role-permission.entity'

@Entity({ name: 'roles' })
export class Role extends AbstractEntity<Role> {
  @Column({ unique: true })
  key: string

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  icon: string

  @OneToMany(() => RolePermission, rolePermission => rolePermission.role)
  @JoinColumn({ name: 'permissions' })
  permissions: RolePermission[]
}
