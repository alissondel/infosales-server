import { IsOptional, IsString } from 'class-validator'

export class CreateCompanyDto {
  @IsString()
  companyName: string

  @IsString()
  tradeName: string

  @IsString()
  cnpj: string

  @IsString()
  @IsOptional()
  stateRegistration: string

  @IsString()
  @IsOptional()
  municipalRegistration: string

  @IsString()
  @IsOptional()
  responsibly: string

  @IsString()
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  numberPhone: string

  @IsString()
  cityId: string
}
