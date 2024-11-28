import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, MinLength } from 'class-validator'

export class UpdatePasswordDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString({ message: 'O campo necessita ser um string ' })
  @IsNotEmpty({ message: 'O campo senha está vazio!' })
  password: string

  @ApiProperty({
    type: 'string',
  })
  @IsString({ message: 'O campo necessita ser um string ' })
  @MinLength(5)
  @IsNotEmpty({ message: 'O campo nova senha está vazio!' })
  newPassword: string

  @ApiProperty({
    type: 'string',
  })
  @IsString({ message: 'O campo necessita ser um string ' })
  @MinLength(5)
  @IsNotEmpty({ message: 'O campo confirma nova está vazio!' })
  confirmNewPassword: string
}
