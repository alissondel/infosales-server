import { Company } from '../entities/company.entity'
import { ReturnCityDto } from 'src/cities/dto/return-city.dto'
import { ReturnCompanyEntityDto } from 'src/companies_users/dto/return-create-companies_users.dto'

export class ReturnCompanyDto {
  id: string
  companyName: string
  tradeName: string
  cnpj: string
  stateRegistration: string
  municipalRegistration: string
  responsibly: string
  email: string
  numberPhone: string
  status: boolean
  createdAt: Date
  city?: ReturnCityDto

  constructor(companyEntity: Company) {
    this.id = companyEntity.id
    this.companyName = companyEntity.companyName
    this.tradeName = companyEntity.tradeName
    this.cnpj = companyEntity.cnpj
    this.stateRegistration = companyEntity.stateRegistration
    this.municipalRegistration = companyEntity.municipalRegistration
    this.responsibly = companyEntity.responsibly
    this.email = companyEntity.email
    this.numberPhone = companyEntity.numberPhone
    this.status = companyEntity.status
    this.createdAt = companyEntity.createdAt
    this.city = companyEntity.city
      ? new ReturnCityDto(companyEntity.city)
      : undefined
  }
}

export class ReturnCompanyUpdatedDto extends ReturnCompanyDto {
  updatedAt: Date

  constructor(companyEntity: Company) {
    super(companyEntity)
    this.updatedAt = companyEntity.updatedAt
  }
}

export class ReturnCompanyDeletedDto extends ReturnCompanyDto {
  deletedAt: Date

  constructor(companyEntity: Company) {
    super(companyEntity)
    this.deletedAt = companyEntity.deletedAt
  }
}

export class ReturnCompanyWithUsersDto extends ReturnCompanyDto {
  companiesToUser: ReturnCompanyEntityDto[]

  constructor(companyEntity: Company) {
    super(companyEntity)
    this.companiesToUser = companyEntity?.users
      ? companyEntity?.users.map(
          (companyEntity) => new ReturnCompanyEntityDto(companyEntity),
        )
      : undefined
  }
}
