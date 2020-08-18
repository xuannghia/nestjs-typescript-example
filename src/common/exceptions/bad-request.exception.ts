import { HttpException } from '@nestjs/common'

export class BadRequestException extends HttpException {
  constructor(message: string, errorType?: string, error?: string | any) {
    const response = {
      statusCode: 400,
      message: message || 'Bad Request',
      error,
      errorType: errorType || 'bad_request',
    }
    super(response, 400)
  }
}
