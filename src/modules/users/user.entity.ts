import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { AbstractEntity } from '../../common/entities/abstract.entity'
import { Exclude } from 'class-transformer'
import * as crypto from 'crypto'
import { Role } from '../roles/role.entity'

@Entity({ name: 'users' })
export class User extends AbstractEntity<User> {
  @Column({ unique: true })
  username: string

  @Exclude()
  @Column({ nullable: true })
  password: string

  @Exclude()
  @Column({ nullable: true })
  salt: string

  @Column({ nullable: true })
  email: string

  @Column({ name: 'display_name', default: '' })
  displayName: string

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @Column({ name: 'is_admin', default: false })
  isAdmin: boolean

  @Column({ name: 'is_staff', default: false })
  isStaff: boolean

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[]

  @OneToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User

  @OneToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User

  @OneToOne(() => User)
  @JoinColumn({ name: 'deleted_by' })
  deletedBy: User

  setPassword(password: string): void {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.password = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
      .toString('hex')
  }

  validPassword(password: string): boolean {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
      .toString('hex')
    return this.password === hash
  }
}
