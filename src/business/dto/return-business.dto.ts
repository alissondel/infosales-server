import { Business } from '../entities/business.entity'
import { ReturnKambanDto } from 'src/kamban/dto/return-kamban.dto'

export class ReturnBusinessDto {
  id: string
  title: string
  status: boolean
  createdAt: Date
  kamban?: ReturnKambanDto

  constructor(businessEntity: Business) {
    this.id = businessEntity.id
    this.title = businessEntity.title
    this.status = businessEntity.status
    this.createdAt = businessEntity.createdAt
    this.kamban = businessEntity.kamban
      ? new ReturnKambanDto(businessEntity.kamban)
      : undefined
  }
}

export class ReturnBusinessUpdatedDto extends ReturnBusinessDto {
  updatedAt: Date

  constructor(businessEntity: Business) {
    super(businessEntity)
    this.updatedAt = businessEntity.updatedAt
  }
}

export class ReturnBusinessDeletedDto extends ReturnBusinessDto {
  deletedAt: Date

  constructor(businessEntity: Business) {
    super(businessEntity)
    this.deletedAt = businessEntity.deletedAt
  }
}
