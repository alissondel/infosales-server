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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserType.Common, UserType.Root, UserType.Admin)
  @Get('/userId')
  async userTokenId(@UserId() userId: string): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.usersService.findOne(userId))
  }

  @Roles(UserType.Admin)
  @Get(':id')
  async userById(@Param('id') id: string): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.usersService.findOne(id))
  }

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

  @Post('/create-user-common')
  async createUserCommon(@Body() data: CreateUserDto): Promise<User> {
    const isEmailUnique = await this.usersService.emailAlreadyExists(data.email)

    if (!isEmailUnique) throw new NotFoundError('Este e-mail já está em uso.')

    return await this.usersService.createCommon(data)
  }

  @Roles(UserType.Admin)
  @Post('/create-user-admin')
  async createUserAdmin(@UserId() userId: string, @Body() data: CreateUserDto) {
    return await this.usersService.createAdmin(userId, data)
  }

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

  @Delete('/delete-user')
  async inactive(@UserId() userId: string) {
    return new ReturnUserDeletedDto(await this.usersService.delete(userId))
  }
}
