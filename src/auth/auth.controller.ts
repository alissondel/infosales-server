import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { ReturnLoginDTO } from './dto/return-login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() data: LoginDto): Promise<ReturnLoginDTO> {
    return this.authService.login(data)
  }
}
