import { HttpException, ValidationError } from '@nestjs/common'
import { BadRequestException } from '../exceptions/bad-request.exception'

const exceptionFactory = (errors: ValidationError[]): HttpException => {
  const result = {}
  errors.forEach(el => {
    const prop = el.property
    result[prop] = []
    Object.entries(el.constraints).forEach(constraint => {
      result[prop].push(`${constraint[1]}`)
    })
  })
  return new BadRequestException(
    'Dữ liệu gửi lên không đúng!',
    'invalid_input_data',
    result,
  )
}

export default exceptionFactory
