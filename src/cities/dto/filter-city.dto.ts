import { Transform } from 'class-transformer'
import { IsString, IsOptional, IsBoolean } from 'class-validator'

export class FilterCityDto {
  @IsString()
  @IsOptional()
  id?: string

  @IsString()
  @IsOptional()
  name?: string

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  status?: boolean

  @IsString()
  @IsOptional()
  stateName?: string
}
