import { Roles } from 'src/decorators/roles.decorator'
import { UserId } from 'src/decorators/user-id-decorator'
import { UserType } from 'src/users/enum/user-type.enum'
import { Pagination } from 'nestjs-typeorm-paginate'
import { CompaniesToUsers } from './entities/companies_users.entity'
import { CompaniesUsersService } from './companies_users.service'
import { CreateCompaniesToUsersDto } from './dto/create-companies_users.dto'
import { UpdateCompaniesToUserDto } from './dto/update-companies_user.dto'
import { FilterCompaniesToUsersDto } from './dto/filter-companies_users.dto'

import {
  ReturnCompaniesToUsersDto,
  ReturnCompaniesToUsersUpdatedDto,
  ReturnCompaniesToUsersDeletedDto,
} from './dto/return-create-companies_users.dto'

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common'

@Controller('companies-users')
export class CompaniesUsersController {
  constructor(private readonly companiesUsersService: CompaniesUsersService) {}

  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Get('/companiestousers')
  async findOneByToken(
    @UserId() userId: string,
  ): Promise<ReturnCompaniesToUsersDto> {
    return new ReturnCompaniesToUsersDto(
      await this.companiesUsersService.findOne(userId),
    )
  }

  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Get(':id')
  async findOneById(
    @Param('id') id: string,
  ): Promise<ReturnCompaniesToUsersDto> {
    return new ReturnCompaniesToUsersDto(
      await this.companiesUsersService.findOne(id),
    )
  }

  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 100,
    @Query('order') order: 'ASC' | 'DESC',
    @Query('filter') filter: FilterCompaniesToUsersDto,
  ): Promise<Pagination<CompaniesToUsers>> {
    limit = limit > 100 ? 100 : limit

    return await this.companiesUsersService.findAll(
      { page, limit },
      order,
      filter,
    )
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
