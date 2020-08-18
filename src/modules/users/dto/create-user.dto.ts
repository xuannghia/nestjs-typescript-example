import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @IsNotEmpty({ message: 'Tên tài khoản không được bỏ trống' })
  @ApiProperty()
  username: string

  @IsNotEmpty({ message: 'Mật khẩu không được bỏ trống' })
  @ApiProperty()
  password: string
}
