import { Roles } from 'src/decorators/roles.decorator'
import { State } from './entities/state.entity'
import { UserId } from 'src/decorators/user-id-decorator'
import { UserType } from 'src/users/enum/user-type.enum'
import { Pagination } from 'nestjs-typeorm-paginate'
import { StatesService } from './states.service'
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'
import { CreateStateDto } from './dto/create-state.dto'
import { UpdateStateDto } from './dto/update-state.dto'
import { FilterStateDto } from './dto/filter-state.dto'

import {
  ReturnStateDto,
  ReturnStateUpdatedDto,
  ReturnStateDeletedDto,
} from './dto/return-state.dto'

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

@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Get(':id')
  async state(@Param('id') id: string): Promise<ReturnStateDto> {
    return new ReturnStateDto(await this.statesService.findOne(id))
  }

  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Get()
  async states(
    @Query('page') page = 1,
    @Query('limit') limit = 100,
    @Query('order') order: 'ASC' | 'DESC',
    @Query('filter') filter: FilterStateDto,
  ): Promise<Pagination<State>> {
    limit = limit > 100 ? 100 : limit

    return await this.statesService.findAll({ page, limit }, order, filter)
  }

  @Roles(UserType.Admin)
  @Post()
  async create(
    @UserId() userId: string,
    @Body() data: CreateStateDto,
  ): Promise<ReturnStateDto> {
    const isUFUnique = await this.statesService.ufAlreadyExists(data.uf)

    if (!isUFUnique)
      throw new NotFoundError(`Está sigla ${data.uf} já está em uso.`)

    return new ReturnStateDto(await this.statesService.create(userId, data))
  }

  @Roles(UserType.Admin)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @UserId() userId: string,
    @Body() updateStateDto: UpdateStateDto,
  ): Promise<ReturnStateUpdatedDto> {
    return new ReturnStateUpdatedDto(
      await this.statesService.update(userId, id, updateStateDto),
    )
  }

  @Roles(UserType.Admin)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @UserId() userId: string,
  ): Promise<ReturnStateDeletedDto> {
    return new ReturnStateDeletedDto(
      await this.statesService.delete(userId, id),
    )
  }
}
