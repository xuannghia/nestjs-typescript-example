import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { AccessControlGuard } from './access-control.guard'
import { AccessControlOptions } from './access-control-types'

export function AccessControl(options: AccessControlOptions): any {
  return applyDecorators(
    SetMetadata('access-control-options', options),
    UseGuards(AccessControlGuard),
  )
}
