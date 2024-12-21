import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class FilterBusinessDto {
  @IsString()
  @IsOptional()
  id: string

  @IsString()
  @IsOptional()
  title: string

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  status: boolean

  @IsString()
  @IsOptional()
  titleKamban: string
}
