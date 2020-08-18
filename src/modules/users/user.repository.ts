import { Repository } from 'typeorm'
import { EntityRepository } from 'typeorm/decorator/EntityRepository'

import { User } from './user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
