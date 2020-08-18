import { Controller, Get } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AccessControlService } from './access-control.service'
import { AccessControl } from './access-control.decorator'

@ApiTags('Access control')
@Controller('access-control')
export class AccessControlController {
  constructor(private readonly accessControlService: AccessControlService) {}

  @Get('resources')
  @AccessControl({
    resource: 'resource',
    action: 'view',
    possession: 'any',
  })
  @ApiBearerAuth()
  getAccessControlList(): any {
    return this.accessControlService.getResources()
  }
}
