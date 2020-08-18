import { HttpException } from '@nestjs/common'

export class ForbiddenException extends HttpException {
  constructor(message: string, errorType?: string) {
    const response = {
      statusCode: 403,
      message: message || 'Forbidden Resource',
      error: 'Forbidden',
      errorType: errorType || 'forbidden',
    }
    super(response, 403)
  }
}
