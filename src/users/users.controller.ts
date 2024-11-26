import { User } from './entities/user.entity'
import { Roles } from 'src/decorators/roles.decorator'
import { UserId } from 'src/decorators/user-id-decorator'
import { UserType } from './enum/user-type.enum'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UpdatePasswordDto } from './dto/update-password.dto'
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
import { Pagination } from 'nestjs-typeorm-paginate'
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserType.Common, UserType.Root, UserType.Admin)
  @Get('/userId')
  async userTokenId(@UserId() userId: string): Promise<User> {
    return await this.usersService.findOne(userId)
  }

  @Roles(UserType.Admin)
  @Get(':id')
  async userById(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id)
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
    const { email } = data

    const isEmailUnique = await this.usersService.emailAlreadyExists(email)

    if (!isEmailUnique) throw new NotFoundError('Este e-mail já está em uso.')

    return await this.usersService.createCommon(data)
  }

  @Roles(UserType.Admin)
  @Post('/create-user-admin')
  async createUserAdmin(
    @UserId() userId: string,
    @Body() data: CreateUserDto,
  ): Promise<User> {
    return await this.usersService.createAdmin(userId, data)
  }

  @Roles(UserType.Common, UserType.Root, UserType.Admin)
  @Put('/update-user/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(id, data)
  }

  @Roles(UserType.Common, UserType.Root, UserType.Admin)
  @Put('/update-password')
  async updatePassword(
    @UserId() userId: string,
    @Body() data: UpdatePasswordDto,
  ) {
    return await this.usersService.updatePassword(userId, data)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.delete(id)
  }
}
