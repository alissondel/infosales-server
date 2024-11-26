import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { LoginDto } from './dto/login.dto'
import { ReturnLoginDTO } from './dto/return-login.dto'
import { validatePassword } from 'src/utils/encrypt/password'
import { User } from 'src/users/entities/user.entity'
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'
import { LoginPayload } from './dto/login-payload.dto'
import { ReturnUserDto } from 'src/users/dto/return-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto): Promise<ReturnLoginDTO> {
    const user: User | undefined = await this.userService
      .findEmail(data.email)
      .catch(() => undefined)

    const isMatch = await validatePassword(data.password, user?.password || '')

    if (!user || !isMatch)
      throw new NotFoundError('Email ou senha estão invalidos!')

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUserDto(user),
    }
  }
}
