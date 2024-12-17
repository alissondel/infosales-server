import { ReturnUserDto } from '../../users/dto/return-user.dto'
import { ReturnCityDto } from '../../cities/dto/return-city.dto'
import { Address } from '../entities/address.entity'

export class ReturnAddressDto {
  id: string
  street: string
  numberAddress: number
  cep: string
  neighborhood: string
  complement: string
  status: boolean
  createdAt: Date
  city?: ReturnCityDto
  user?: ReturnUserDto

  constructor(address: Address) {
    this.id = address.id
    this.street = address.street
    this.numberAddress = address.numberAddress
    this.cep = address.cep
    this.neighborhood = address.neighborhood
    this.complement = address.complement
    this.status = address.status
    this.city = address.city ? new ReturnCityDto(address.city) : undefined
    this.user = address.user ? new ReturnUserDto(address.user) : undefined
  }
}

export class ReturnAddressUpdatedDto extends ReturnAddressDto {
  updatedAt: Date

  constructor(addressEntity: Address) {
    super(addressEntity)
    this.updatedAt = addressEntity.updatedAt
  }
}

export class ReturnAddressDeletedDto extends ReturnAddressDto {
  deletedAt: Date

  constructor(addressEntity: Address) {
    super(addressEntity)
    this.deletedAt = addressEntity.deletedAt
  }
}
