import { CustomDecorator, SetMetadata } from '@nestjs/common'

export const Public = (): CustomDecorator =>
  SetMetadata('__is_public_route__', true)
