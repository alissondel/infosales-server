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

export class ReturnUserUpdatedDto {
  id: string
  name: string
  email: string
  typeUser: number
  status: boolean
  updatedAt: Date

  constructor(userEntity: User) {
    this.id = userEntity.id
    this.name = userEntity.name
    this.email = userEntity.email
    this.typeUser = userEntity.typeUser
    this.status = userEntity.status
    this.updatedAt = userEntity.updatedAt
  }
}

export class ReturnUserDeletedDto {
  id: string
  name: string
  email: string
  typeUser: number
  status: boolean
  deletedAt: Date

  constructor(userEntity: User) {
    this.id = userEntity.id
    this.name = userEntity.name
    this.email = userEntity.email
    this.typeUser = userEntity.typeUser
    this.status = userEntity.status
    this.deletedAt = userEntity.deletedAt
  }
}
