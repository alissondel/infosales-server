import { User } from 'src/users/entities/user.entity'
export class LoginPayload {
  id: string
  name: string
  email: string
  typeUser: number
  status: boolean
  createdAt: Date
  avatar_url: string

  constructor(userEntity: User) {
    this.id = userEntity.id
    this.name = userEntity.name
    this.email = userEntity.email
    this.typeUser = userEntity.typeUser
    this.status = userEntity.status
    this.createdAt = userEntity.createdAt
    this.avatar_url = userEntity.avatar_url
  }
}
