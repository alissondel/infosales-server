import { User } from './entities/user.entity'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Body, Controller, Get, Post, Put, Param, Delete } from '@nestjs/common'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id)
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll()
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<User> {
    return await this.usersService.create(data)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(id, data)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.delete(id)
  }
}
