import { ReturnStateDto } from '../../states/dto/return-state.dto'
import { City } from '../entities/city.entity'

export class ReturnCityDto {
  id: string
  name: string
  status: boolean
  createdAt: Date
  state?: ReturnStateDto

  constructor(city: City) {
    this.id = city.id
    this.name = city.name
    this.status = city.status
    this.state = city.state ? new ReturnStateDto(city.state) : undefined
  }
}

export class ReturnCityUpdatedDto extends ReturnCityDto {
  updatedAt: Date

  constructor(cityEntity: City) {
    super(cityEntity)
    this.updatedAt = cityEntity.updatedAt
  }
}

export class ReturnCityDeletedDto extends ReturnCityDto {
  deletedAt: Date

  constructor(cityEntity: City) {
    super(cityEntity)
    this.deletedAt = cityEntity.deletedAt
  }
}
