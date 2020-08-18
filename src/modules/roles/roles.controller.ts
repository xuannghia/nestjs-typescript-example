import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Roles')
@Controller('roles')
export class RolesController {}
