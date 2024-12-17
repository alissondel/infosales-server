import { PartialType } from '@nestjs/swagger'
import { CreateCompaniesToUsersDto } from './create-companies_users.dto'

export class UpdateCompaniesToUserDto extends PartialType(
  CreateCompaniesToUsersDto,
) {}
