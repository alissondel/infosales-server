import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @IsString({ message: 'Nome invalido!' })
  @Length(3, 60, {
    message: 'Nome precisa conter no minimo 3 e no maximo 60 caractes',
  })
  readonly name: string

  @IsEmail({}, { message: 'E-mail inválido' })
  readonly email: string

  @IsString({ message: 'Senha deve ser uma string' })
  @Length(3, 12, {
    message: 'Senha precisa conter no minimo 3 e no maximo 12 caractes',
  })
  readonly password: string
}
