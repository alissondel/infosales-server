import { Transform } from 'class-transformer'
import { IsBoolean, IsDate, IsInt, IsOptional, IsString } from 'class-validator'

export class FilterUserDto {
  @IsString()
  @IsOptional()
  id?: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  email?: string

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  typeUser?: number

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  status?: boolean

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  createdAt?: Date
}
