import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { JWT_SECRET } from '../../app.environments'
import { LocalStrategy } from './strargeties/local.strategy'
import { JwtStrategy } from './strargeties/jwt.strargety'
import { AuthService } from './auth.service'

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
