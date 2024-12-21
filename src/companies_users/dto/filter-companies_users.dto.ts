import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class FilterCompaniesToUsersDto {
  @IsString()
  @IsOptional()
  id: string

  @IsString()
  @IsOptional()
  companyName: string

  @IsString()
  @IsOptional()
  userName: string

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  status: boolean
}
