import { Injectable } from '@nestjs/common'
import { User } from './user.entity'
import { UserRepository } from './user.repository'
import { CrudTypeOrmService } from '../../common/services/crud-type-orm.service'
import { BadRequestException } from '../../common/exceptions/bad-request.exception'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService extends CrudTypeOrmService<User> {
  constructor(private userRepository: UserRepository) {
    super(userRepository)
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const existUser = await this.findOne({ username: user.username })
    if (existUser) {
      throw new BadRequestException(
        'Tài khoản đã tồn tại!',
        'user_already_exists',
        { username: 'Tên tài khoản bị trùng!' },
      )
    }
    const createdUser = new User(user)
    createdUser.setPassword(user.password)
    return this.save(createdUser)
  }
}
