import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ForbiddenException } from '../../common/exceptions/forbidden.exception'
import { UsersService } from '../users/users.service'
import { AccessControlOptions } from './access-control-types'

@Injectable()
export class AccessControlGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly logger: Logger,
    private readonly usersServices: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    if (request.user.isAdmin) return true
    const options = this.reflector.get<AccessControlOptions>(
      'access-control-options',
      context.getHandler(),
    )
    const user = await this.usersServices.findOne(request.user.id, {
      relations: ['roles', 'roles.permissions'],
    })
    const permissions = user.roles.reduce((result, role) => {
      return [...result, ...role.permissions.map(p => p.permission)]
    }, [])
    const requiredPermission = `${options.resource}:${options.action}${
      options.possession && ':' + options.possession
    }`
    if (!permissions.includes(requiredPermission))
      throw new ForbiddenException('Không có quyền thực hiện hành động này')
    return true
  }
}
