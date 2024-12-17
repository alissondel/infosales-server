import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { CompaniesUsersService } from './companies_users.service'
import { CreateCompaniesToUsersDto } from './dto/create-companies_users.dto'
import { UpdateCompaniesToUserDto } from './dto/update-companies_user.dto'
import { UserId } from 'src/decorators/user-id-decorator'
import { UserType } from 'src/users/enum/user-type.enum'
import { Roles } from 'src/decorators/roles.decorator'
import {
  ReturnCompaniesToUsersDto,
  ReturnCompaniesToUsersUpdatedDto,
  ReturnCompaniesToUsersDeletedDto,
} from './dto/return-create-companies_users.dto'

@Controller('companies-users')
export class CompaniesUsersController {
  constructor(private readonly companiesUsersService: CompaniesUsersService) {}

  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReturnCompaniesToUsersDto> {
    return new ReturnCompaniesToUsersDto(
      await this.companiesUsersService.findOne(id),
    )
  }

  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Get()
  findAll() {
    return this.companiesUsersService.findAll()
  }

  @Roles(UserType.Admin)
  @Post()
  async create(
    @UserId() userId: string,
    @Body() data: CreateCompaniesToUsersDto,
  ): Promise<ReturnCompaniesToUsersDto> {
    return new ReturnCompaniesToUsersDto(
      await this.companiesUsersService.create(userId, data),
    )
  }

  @Roles(UserType.Admin)
  @Put(':id')
  async update(
    @UserId() userId: string,
    @Param('id') id: string,
    @Body() data: UpdateCompaniesToUserDto,
  ): Promise<ReturnCompaniesToUsersUpdatedDto> {
    return new ReturnCompaniesToUsersUpdatedDto(
      await this.companiesUsersService.update(userId, id, data),
    )
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  async delete(
    @UserId() userId: string,
    @Param('id') id: string,
  ): Promise<ReturnCompaniesToUsersDeletedDto> {
    return new ReturnCompaniesToUsersDeletedDto(
      await this.companiesUsersService.delete(userId, id),
    )
  }
}
