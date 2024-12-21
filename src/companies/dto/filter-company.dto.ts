import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator'
import { Transform } from 'class-transformer'

export class FilterCompanyDto {
  @IsUUID()
  @IsOptional()
  id?: string

  @IsString()
  @IsOptional()
  companyName?: string

  @IsString()
  @IsOptional()
  tradeName?: string

  @IsString()
  @IsOptional()
  cnpj?: string

  @IsString()
  @IsOptional()
  stateRegistration?: string

  @IsString()
  @IsOptional()
  municipalRegistration?: string

  @IsString()
  @IsOptional()
  responsibly?: string

  @IsString()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  numberPhone?: string

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  status?: boolean

  @IsString()
  @IsOptional()
  cityName?: string
}
