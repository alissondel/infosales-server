import { ReturnUserDto } from '../../users/dto/return-user.dto'

export interface ReturnLoginDTO {
  user: ReturnUserDto
  accessToken: string
}
