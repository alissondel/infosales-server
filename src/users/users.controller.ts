import { User } from './entities/user.entity'
import { Roles } from 'src/decorators/roles.decorator'
import { UserId } from 'src/decorators/user-id-decorator'
import { UserType } from './enum/user-type.enum'
import { Pagination } from 'nestjs-typeorm-paginate'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'
import { UpdatePasswordDto } from './dto/update-password.dto'

import {
  ReturnUserDto,
  ReturnUserUpdatedDto,
  ReturnUserDeletedDto,
} from './dto/return-user.dto'

import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common'

import {
  ApiBody,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Listar Usuário Recebido Token' })
  @ApiResponse({
    status: 200,
    description: 'Usários listado com sucessos.',
  })
  @ApiResponse({ status: 403, description: 'Sem acesso!' })
  @Roles(UserType.Common, UserType.Root, UserType.Admin)
  @Get('/userId')
  async userTokenId(@UserId() userId: string): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.usersService.findOne(userId))
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Listar Usuário Por Parametro Id' })
  @ApiResponse({
    status: 200,
    description: 'Usários listado com sucessos.',
  })
  @ApiResponse({ status: 403, description: 'Sem acesso!' })
  @Roles(UserType.Admin)
  @Get(':id')
  async userById(@Param('id') id: string): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.usersService.findOne(id))
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Listar Usuários' })
  @ApiResponse({
    status: 200,
    description: 'Usários listados com sucessos.',
  })
  @ApiResponse({ status: 403, description: 'Sem acesso!' })
  @Roles(UserType.Admin)
  @Get()
  async users(
    @Query('page') page = 1,
    @Query('limit') limit = 100,
    @Query('order') order: 'ASC' | 'DESC',
    @Query('id') id: string,
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('typeUser') typeUser: number,
    @Query('status') status: boolean,
  ): Promise<Pagination<User>> {
    limit = limit > 100 ? 100 : limit
    return await this.usersService.findAll(
      { page, limit },
      order,
      id,
      name,
      email,
      typeUser,
      status,
    )
  }

  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Criar Usuário Comum' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado comum criado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Dado inválido!' })
  @ApiResponse({ status: 403, description: 'Sem acesso!' })
  @ApiResponse({ status: 404, description: 'Usuário já criado !' })
  @Post('/create-user-common')
  async createUserCommon(@Body() data: CreateUserDto): Promise<User> {
    const isEmailUnique = await this.usersService.emailAlreadyExists(data.email)

    if (!isEmailUnique) throw new NotFoundError('Este e-mail já está em uso.')

    return await this.usersService.createCommon(data)
  }

  @ApiBody({ type: CreateUserDto })
  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Criar Usuário Admin' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado adminstrador criado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Dado inválido!' })
  @ApiResponse({ status: 403, description: 'Sem acesso!' })
  @ApiResponse({ status: 404, description: 'Usuário já criado !' })
  @Roles(UserType.Admin)
  @Post('/create-user-admin')
  async createUserAdmin(@UserId() userId: string, @Body() data: CreateUserDto) {
    const isEmailUnique = await this.usersService.emailAlreadyExists(data.email)

    if (!isEmailUnique) throw new NotFoundError('Este e-mail já está em uso.')

    return await this.usersService.createAdmin(userId, data)
  }

  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Atualizar Usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário atualizado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Dado inválido!' })
  @ApiResponse({ status: 403, description: 'Sem acesso!' })
  @Roles(UserType.Common, UserType.Root, UserType.Admin)
  @Put('/update-user')
  async update(
    @UserId() userId: string,
    @Body() data: UpdateUserDto,
  ): Promise<ReturnUserUpdatedDto> {
    return new ReturnUserUpdatedDto(
      await this.usersService.update(userId, data),
    )
  }

  @ApiBody({ type: UpdatePasswordDto })
  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Atualizar Senha Usuário' })
  @ApiResponse({
    status: 201,
    description: 'Senha do usuário foi alterada com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Dado inválido!' })
  @ApiResponse({ status: 403, description: 'Sem acesso!' })
  @Roles(UserType.Common, UserType.Root, UserType.Admin)
  @Put('/update-password')
  async updatePassword(
    @UserId() userId: string,
    @Body() data: UpdatePasswordDto,
  ): Promise<ReturnUserUpdatedDto> {
    return new ReturnUserUpdatedDto(
      await this.usersService.updatePassword(userId, data),
    )
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Inativar Usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário foi inativado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Dado inválido!' })
  @ApiResponse({ status: 403, description: 'Sem acesso!' })
  @Delete('/delete-user')
  async inactive(@UserId() userId: string) {
    return new ReturnUserDeletedDto(await this.usersService.delete(userId))
  }
}
