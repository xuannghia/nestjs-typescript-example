import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { User } from '../users/user.entity'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(identifier: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ username: identifier })
    if (user && user.validPassword(password)) {
      return user
    }
    return null
  }

  login(user: Partial<User>): string {
    const payload = { username: user.username, id: user.id }
    return this.jwtService.sign(payload)
  }
}
