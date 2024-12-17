import { IsString } from 'class-validator'

export class CreateStateDto {
  @IsString({ message: 'Nome invalido!' })
  name: string

  @IsString({ message: 'Sigla invalido!' })
  uf: string
}
