import { City } from './entities/city.entity'
import { Roles } from 'src/decorators/roles.decorator'
import { UserId } from 'src/decorators/user-id-decorator'
import { UserType } from 'src/users/enum/user-type.enum'
import { Pagination } from 'nestjs-typeorm-paginate'
import { CitiesService } from './cities.service'
import { CreateCityDto } from './dto/create-city.dto'
import { UpdateCityDto } from './dto/update-city.dto'
import { FilterCityDto } from './dto/filter-city.dto'

import {
  ReturnCityDto,
  ReturnCityUpdatedDto,
  ReturnCityDeletedDto,
} from './dto/return-city.dto'

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common'

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Get(':id')
  async city(@Param('id') id: string): Promise<ReturnCityDto> {
    return new ReturnCityDto(await this.citiesService.findOne(id))
  }

  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Get()
  async cities(
    @Query('page') page = 1,
    @Query('limit') limit = 100,
    @Query('order') order: 'ASC' | 'DESC',
    @Query('filter') filter: FilterCityDto,
  ): Promise<Pagination<City>> {
    limit = limit > 100 ? 100 : limit

    return await this.citiesService.findAll({ page, limit }, order, filter)
  }

  @Roles(UserType.Admin)
  @Post()
  async create(
    @UserId() userId: string,
    @Body() data: CreateCityDto,
  ): Promise<ReturnCityDto> {
    const city = await this.citiesService.create(userId, data)
    const cityWithState = await this.citiesService.findOne(city.id)

    return new ReturnCityDto(cityWithState)
  }

  @Roles(UserType.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @UserId() userId: string,
    @Body() data: UpdateCityDto,
  ): Promise<ReturnCityUpdatedDto> {
    const city = await this.citiesService.update(id, userId, data)
    const cityWithState = await this.citiesService.findOne(city.id)

    return new ReturnCityUpdatedDto(cityWithState)
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @UserId() userId: string,
  ): Promise<ReturnCityDeletedDto> {
    const city = await await this.citiesService.delete(userId, id)
    const cityWithState = await this.citiesService.findOne(city.id)

    return new ReturnCityDeletedDto(cityWithState)
  }
}
