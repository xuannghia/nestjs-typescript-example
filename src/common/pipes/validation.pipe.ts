import { ValidationPipe as ValidatePipe, Injectable } from '@nestjs/common'
import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe'
import exceptionFactory from '../factories/validation-exeption.factory'

@Injectable()
export class ValidationPipe extends ValidatePipe {
  constructor(options?: ValidationPipeOptions) {
    options.exceptionFactory = options.exceptionFactory || exceptionFactory
    super(options)
  }
}
