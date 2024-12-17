import { State } from '../entities/state.entity'

export class ReturnStateDto {
  id: string
  name: string
  status: boolean
  createdAt: Date

  constructor(stateEntity: State) {
    this.id = stateEntity.id
    this.name = stateEntity.name
    this.status = stateEntity.status
    this.createdAt = stateEntity.createdAt
  }
}

export class ReturnStateUpdatedDto extends ReturnStateDto {
  updatedAt: Date

  constructor(stateEntity: State) {
    super(stateEntity)
    this.updatedAt = stateEntity.updatedAt
  }
}

export class ReturnStateDeletedDto extends ReturnStateDto {
  deletedAt: Date

  constructor(stateEntity: State) {
    super(stateEntity)
    this.deletedAt = stateEntity.deletedAt
  }
}
