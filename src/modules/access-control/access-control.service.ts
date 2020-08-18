import { Injectable } from '@nestjs/common'
import * as accessControlResources from './access-control.resources'

@Injectable()
export class AccessControlService {
  getResources(): any {
    return accessControlResources
  }
}
