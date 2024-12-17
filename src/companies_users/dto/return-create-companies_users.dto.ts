import { ReturnUserDto } from 'src/users/dto/return-user.dto'
import { CompaniesToUsers } from '../entities/companies_users.entity'
import { ReturnCompanyDto } from 'src/companies/dto/return-company.dto'

export class ReturnCompaniesToUsersDto {
  id: string
  status: boolean
  createdAt: Date
  company?: ReturnCompanyDto
  user?: ReturnUserDto

  constructor(CompaniesToUsersEntity: CompaniesToUsers) {
    this.id = CompaniesToUsersEntity.id
    this.status = CompaniesToUsersEntity.status
    this.createdAt = CompaniesToUsersEntity.createdAt
    this.company = CompaniesToUsersEntity.company
      ? new ReturnCompanyDto(CompaniesToUsersEntity.company)
      : undefined
    this.user = CompaniesToUsersEntity.user
      ? new ReturnUserDto(CompaniesToUsersEntity.user)
      : undefined
  }
}

export class ReturnCompaniesToUsersUpdatedDto extends ReturnCompaniesToUsersDto {
  updatedAt: Date

  constructor(CompaniesToUsersEntity: CompaniesToUsers) {
    super(CompaniesToUsersEntity)
    this.updatedAt = CompaniesToUsersEntity.updatedAt
  }
}

export class ReturnCompaniesToUsersDeletedDto extends ReturnCompaniesToUsersDto {
  deletedAt: Date

  constructor(CompaniesToUsersEntity: CompaniesToUsers) {
    super(CompaniesToUsersEntity)
    this.deletedAt = CompaniesToUsersEntity.deletedAt
  }
}
