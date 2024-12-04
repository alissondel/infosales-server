import { User } from '../entities/user.entity'

export class ReturnUserDto {
  id: string
  name: string
  email: string
  typeUser: number
  status: boolean
  createdAt: Date

  constructor(userEntity: User) {
    this.id = userEntity.id
    this.name = userEntity.name
    this.email = userEntity.email
    this.typeUser = userEntity.typeUser
    this.status = userEntity.status
    this.createdAt = userEntity.createdAt
  }
}

export class ReturnUserUpdatedDto extends ReturnUserDto {
  updatedAt: Date

  constructor(userEntity: User) {
    super(userEntity)
    this.updatedAt = userEntity.updatedAt
  }
}

export class ReturnUserDeletedDto extends ReturnUserDto {
  deletedAt: Date

  constructor(userEntity: User) {
    super(userEntity)
    this.deletedAt = userEntity.deletedAt
  }
}
