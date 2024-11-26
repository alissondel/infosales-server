import { IsString, IsNotEmpty, MinLength } from 'class-validator'

export class UpdatePasswordDto {
  @IsString({ message: 'O campo necessita ser um string ' })
  @IsNotEmpty({ message: 'O campo senha está vazio!' })
  password: string

  @IsString({ message: 'O campo necessita ser um string ' })
  @MinLength(5)
  @IsNotEmpty({ message: 'O campo nova senha está vazio!' })
  newPassword: string

  @IsString({ message: 'O campo necessita ser um string ' })
  @MinLength(5)
  @IsNotEmpty({ message: 'O campo confirma nova está vazio!' })
  confirmNewPassword: string
}
