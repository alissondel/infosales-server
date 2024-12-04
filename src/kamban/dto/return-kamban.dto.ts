import { Kamban } from '../entities/kamban.entity'
import { ReturnBusinessDto } from 'src/business/dto/return-business.dto'

export class ReturnKambanDto {
  id: string
  title: string
  observation: string
  createdAt: Date
  business?: ReturnBusinessDto[]

  constructor(kambanEntity: Kamban) {
    this.id = kambanEntity.id
    this.title = kambanEntity.title
    this.observation = kambanEntity.observation
    this.createdAt = kambanEntity.createdAt
    this.business = kambanEntity.business
      ? kambanEntity.business.map((business) => new ReturnBusinessDto(business))
      : undefined
  }
}

export class ReturnKambanUpdatedDto extends ReturnKambanDto {
  updatedAt: Date

  constructor(kambanEntity: Kamban) {
    super(kambanEntity)
    this.updatedAt = kambanEntity.updatedAt
  }
}

export class ReturnKambanDeletedDto extends ReturnKambanDto {
  deletedAt: Date

  constructor(kambanEntity: Kamban) {
    super(kambanEntity)
    this.deletedAt = kambanEntity.deletedAt
  }
}
