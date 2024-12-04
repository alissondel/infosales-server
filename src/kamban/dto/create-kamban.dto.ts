import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class CreateKambanDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString({ message: 'Titulo invalido!' })
  @Length(3, 30, {
    message: 'Nome precisa conter no minimo 3 e no maximo 20 caractes',
  })
  readonly title: string

  @ApiProperty({
    type: 'string',
  })
  @IsString({ message: 'Observação invalida!' })
  @Length(3, 20, {
    message: 'Nome precisa conter no minimo 3 e no maximo 20 caractes',
  })
  readonly observation: string
}
