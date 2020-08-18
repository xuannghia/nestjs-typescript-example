import { AuthGuard } from '@nestjs/passport'
import { ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

export class GlobalAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super()
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean | undefined>(
      '__is_public_route__',
      context.getHandler(),
    )
    if (isPublic) return true
    return super.canActivate(context)
  }
}
