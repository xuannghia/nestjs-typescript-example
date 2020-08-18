import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common'
import { Request } from 'express'
import { RegisterUserDto } from './dto/register-user.dto'
import { AuthenticatedResponseType } from './types/authenticated-response.type'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { LoginDto } from './dto/login.dto'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'
import { classToPlain } from 'class-transformer'
import { Public } from './decorators/public.decorator'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Post('/register')
  @Public()
  async register(
    @Body() body: RegisterUserDto,
  ): Promise<AuthenticatedResponseType> {
    const user = await this.usersService.createUser(body)
    const accessToken = await this.authService.login(user)
    return {
      user: classToPlain(user),
      accessToken: accessToken,
    }
  }

  @Post('/login')
  @HttpCode(200)
  @Public()
  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: LoginDto })
  async login(@Req() req: Request): Promise<AuthenticatedResponseType> {
    const accessToken = await this.authService.login(req.user)
    return {
      user: classToPlain(req.user),
      accessToken: accessToken,
    }
  }
}
