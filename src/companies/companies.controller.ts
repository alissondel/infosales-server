import { CompaniesService } from './companies.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { UserId } from 'src/decorators/user-id-decorator'
import { Roles } from 'src/decorators/roles.decorator'
import { UserType } from 'src/users/enum/user-type.enum'
import { Company } from './entities/company.entity'
import { Pagination } from 'nestjs-typeorm-paginate'
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'

import {
  Get,
  Put,
  Post,
  Body,
  Query,
  Param,
  Delete,
  Controller,
} from '@nestjs/common'

import {
  ReturnCompanyDto,
  ReturnCompanyUpdatedDto,
  ReturnCompanyDeletedDto,
} from './dto/return-company.dto'

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReturnCompanyDto> {
    return new ReturnCompanyDto(await this.companiesService.findOne(id))
  }

  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 100,
    @Query('order') order: 'ASC' | 'DESC',
    @Query('id') id: string,
    @Query('companyName') companyName: string,
    @Query('tradeName') tradeName: string,
    @Query('cnpj') cnpj: string,
    @Query('stateRegistration') stateRegistration: string,
    @Query('municipalRegistration') municipalRegistration: string,
    @Query('responsibly') responsibly: string,
    @Query('email') email: string,
    @Query('numberPhone') numberPhone: string,
    @Query('status') status: boolean,
    @Query('cityName') cityName: string,
  ): Promise<Pagination<Company>> {
    limit = limit > 100 ? 100 : limit

    return await this.companiesService.findAll(
      { page, limit },
      order,
      id,
      companyName,
      tradeName,
      cnpj,
      stateRegistration,
      municipalRegistration,
      responsibly,
      email,
      numberPhone,
      status,
      cityName,
    )
  }

  @Roles(UserType.Admin)
  @Post()
  async create(
    @UserId() userId: string,
    @Body() data: CreateCompanyDto,
  ): Promise<ReturnCompanyDto> {
    const isCNPJUnique = await this.companiesService.cpnjAlreadyExists(
      data.cnpj,
    )

    if (!isCNPJUnique)
      throw new NotFoundError(`Está sigla ${data.cnpj} já está em uso.`)

    return new ReturnCompanyDto(
      await this.companiesService.create(userId, data),
    )
  }

  @Roles(UserType.Admin)
  @Put(':id')
  async update(
    @UserId() userId: string,
    @Param('id') id: string,
    @Body() data: UpdateCompanyDto,
  ): Promise<ReturnCompanyUpdatedDto> {
    return new ReturnCompanyUpdatedDto(
      await this.companiesService.update(userId, id, data),
    )
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @UserId() userId: string,
  ): Promise<ReturnCompanyDeletedDto> {
    return new ReturnCompanyDeletedDto(
      await this.companiesService.delete(userId, id),
    )
  }
}
