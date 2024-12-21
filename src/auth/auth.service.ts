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
import { UnauthorizedError } from 'src/commom/errors/types/UnauthorizedError'
import { authorizantionToLoginPayload } from '../utils/converter/base-64-converter'
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
      accessToken: this.jwtService.sign({
        ...new LoginPayload(user),
      }),
      user: new ReturnUserDto(user),
    }
  }

  async refresh(token: string) {
    const payload: User = await this.verifyRefreshToken(token)
    return this.generarToken(payload)
  }

  private async verifyRefreshToken(token: any) {
    const refreshToken = token

    if (!refreshToken) {
      throw new NotFoundError('Usuário não encontrado')
    }

    const payload = authorizantionToLoginPayload(refreshToken)
    const user = await this.userService.findEmail(payload.email)

    if (!user) {
      throw new NotFoundError('Usuário não encontrado')
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      })

      return user
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedError('Assinatura Inválida')
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedError('Token Expirado')
      }
      throw new UnauthorizedError(err.name)
    }
  }

  async generarToken(payload: User) {
    const accessToken = this.jwtService.sign(
      { email: payload.email },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    )

    const refreshToken = this.jwtService.sign(
      { email: payload.email },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    )
    return { access_token: accessToken, refresh_token: refreshToken }
  }
}
