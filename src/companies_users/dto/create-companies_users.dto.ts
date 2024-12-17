import { IsString, IsUUID } from 'class-validator'

export class CreateCompaniesToUsersDto {
  @IsString({ message: 'Id da empresa invalido!' })
  @IsUUID('4', { message: 'UUID da empresa invalido' })
  companyId: string

  @IsString({ message: 'Id do usuário Invalido!' })
  @IsUUID('4', { message: 'UUID do usuário invalido' })
  userId: string
}
