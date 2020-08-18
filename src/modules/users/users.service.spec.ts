import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { UserRepository } from './user.repository'
import { TypeOrmConfigService } from '../../configs/type-orm.config'

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useClass: TypeOrmConfigService,
        }),
        TypeOrmModule.forFeature([User, UserRepository]),
      ],
      providers: [UsersService],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', async () => {
    expect(service).toBeDefined()
  })

  it('can create a record', async () => {
    const user = { username: 'test_user', password: 'password' }
    const createdUser = await service.createUser(user)
    expect(createdUser.id).toBeDefined()
  })

  afterEach(() => {
    service.delete({ username: 'test_user' })
  })
})
