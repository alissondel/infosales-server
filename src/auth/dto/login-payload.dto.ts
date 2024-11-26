import { User } from '../../users/entities/user.entity'

export class LoginPayload {
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
