import { Transform } from 'class-transformer'
import { IsString, IsOptional, IsBoolean } from 'class-validator'

export class FilterAddressDto {
  @IsString()
  @IsOptional()
  id?: string

  @IsString()
  @IsOptional()
  street?: string

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  status?: boolean

  @IsString()
  @IsOptional()
  cityName?: string

  @IsString()
  @IsOptional()
  userName?: string
}
