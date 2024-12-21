import { Roles } from 'src/decorators/roles.decorator'
import { UserId } from 'src/decorators/user-id-decorator'
import { Address } from './entities/address.entity'
import { UserType } from 'src/users/enum/user-type.enum'
import { Pagination } from 'nestjs-typeorm-paginate'
import { AddressesService } from './addresses.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { ReturnAddressDto } from './dto/return-address.dto'
import { FilterAddressDto } from './dto/filter-address.dto'

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
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Get(':id')
  async address(@Param('id') id: string): Promise<ReturnAddressDto> {
    return new ReturnAddressDto(await this.addressesService.findOne(id))
  }

  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Get()
  async addresses(
    @Query('page') page = 1,
    @Query('limit') limit = 100,
    @Query('order') order: 'ASC' | 'DESC',
    @Query('filter') filter: FilterAddressDto,
  ): Promise<Pagination<Address>> {
    limit = limit > 100 ? 100 : limit

    return await this.addressesService.findAll({ page, limit }, order, filter)
  }

  @Roles(UserType.Admin)
  @Post()
  async create(
    @UserId() userId: string,
    @Body() data: CreateAddressDto,
  ): Promise<ReturnAddressDto> {
    const address = await this.addressesService.create(userId, data)
    const addressWithCityAndUser = await this.addressesService.findOne(
      address.id,
    )

    return new ReturnAddressDto(addressWithCityAndUser)
  }

  @Roles(UserType.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @UserId() userId: string,
    @Body() data: UpdateAddressDto,
  ): Promise<ReturnAddressDto> {
    const address = await this.addressesService.update(id, userId, data)
    const addressWithCityAndUser = await this.addressesService.findOne(
      address.id,
    )
    return new ReturnAddressDto(addressWithCityAndUser)
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @UserId() userId: string,
  ): Promise<ReturnAddressDto> {
    const address = await this.addressesService.delete(userId, id)
    const addressWithCityAndUser = await this.addressesService.findOne(
      address.id,
    )

    return new ReturnAddressDto(addressWithCityAndUser)
  }
}
