import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class FilterStateDto {
  @IsString()
  @IsOptional()
  id?: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  uf?: string

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  status?: boolean
}
