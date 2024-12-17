import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCityDto {
  @IsString({ message: 'Nome invalido!' })
  name: string

  @IsString()
  @IsNotEmpty({ message: 'Numero Inexistente!' })
  stateId: string
}
