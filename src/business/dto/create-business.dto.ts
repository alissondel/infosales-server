import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateBusinessDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString({ message: 'Titulo invalido!' })
  @Length(3, 20, {
    message: 'Titulo precisa conter no minimo 3 e no maximo 20 caractes',
  })
  readonly title: string

  @IsString({ message: 'Id do Kanban invalido!' })
  @IsNotEmpty({ message: 'Numero Inexistente!' })
  kambanId: string
}
