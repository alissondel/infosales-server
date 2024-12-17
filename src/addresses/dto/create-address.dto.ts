import {
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateAddressDto {
  @IsString({ message: 'Rua Invalida! ' })
  @IsNotEmpty({ message: 'O campo rua não pode estar vazio!' })
  street: string

  @IsInt({ message: 'Numero de Endereço Invalido! ' })
  @IsNotEmpty({ message: 'O campo numero de endereço não pode estar vazio!' })
  numberAddress: number

  @IsString({ message: 'CEP Invalido! ' })
  @IsNotEmpty({ message: 'O campo cep não pode estar vazio!' })
  cep: string

  @IsString({ message: 'Bairro Invalido! ' })
  @IsNotEmpty({ message: 'O campo bairro não pode estar vazio!' })
  neighborhood: string

  @IsString({ message: 'Complemento Invalido! ' })
  @IsOptional()
  @IsEmpty({ message: 'O campo completo não pode estar vazio!' })
  complement?: string

  @IsString({ message: 'Cidade Invalida! ' })
  @IsNotEmpty({ message: 'O campo cidade não pode estar vazio!' })
  cityId: string
}
