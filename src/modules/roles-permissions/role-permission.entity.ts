import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { AbstractEntity } from '../../common/entities/abstract.entity'
import { Role } from '../roles/role.entity'

@Entity({ name: 'roles-permissions' })
export class RolePermission extends AbstractEntity<RolePermission> {
  @ManyToOne(() => Role, role => role.permissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role' })
  role: number

  @Column()
  permission: string

  @Column({ nullable: true })
  description: string
}
