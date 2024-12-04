import { Roles } from 'src/decorators/roles.decorator'
import { UserId } from 'src/decorators/user-id-decorator'
import { UserType } from 'src/users/enum/user-type.enum'
import { KambanService } from './kamban.service'
import { CreateKambanDto } from './dto/create-kamban.dto'
import { UpdateKambanDto } from './dto/update-kamban.dto'

import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common'

import {
  ReturnKambanDto,
  ReturnKambanUpdatedDto,
  ReturnKambanDeletedDto,
} from './dto/return-kamban.dto'

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger'

@Controller('kamban')
export class KambanController {
  constructor(private readonly kambanService: KambanService) {}

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Listar Kanban Por Parametro Id' })
  @ApiResponse({
    status: 200,
    description: 'Kanban listado com sucessos.',
  })
  @ApiResponse({ status: 403, description: 'Sem acesso!' })
  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReturnKambanDto> {
    return new ReturnKambanDto(await this.kambanService.findOne(id))
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Listar Kanban' })
  @ApiResponse({
    status: 200,
    description: 'Kanban listados com sucessos.',
  })
  @ApiResponse({ status: 403, description: 'Sem acesso!' })
  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Get()
  async findAll(): Promise<ReturnKambanDto[]> {
    return (await this.kambanService.findAll()).map(
      (kambanEntity) => new ReturnKambanDto(kambanEntity),
    )
  }

  @ApiBody({ type: CreateKambanDto })
  @ApiOperation({ summary: 'Criar Kanban' })
  @ApiResponse({
    status: 201,
    description: 'Kanban criado criado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Dado inválido!' })
  @ApiResponse({ status: 403, description: 'Sem acesso!' })
  @ApiResponse({ status: 404, description: 'Kanban já criado !' })
  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Post()
  async create(
    @UserId() userId: string,
    @Body() data: CreateKambanDto,
  ): Promise<ReturnKambanDto> {
    return new ReturnKambanDto(await this.kambanService.create(userId, data))
  }

  @ApiBody({ type: UpdateKambanDto })
  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Atualizar Kanban' })
  @ApiResponse({
    status: 201,
    description: 'Kanban atualizado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Dado inválido!' })
  @ApiResponse({ status: 403, description: 'Sem acesso!' })
  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @UserId() userId: string,
    @Body() data: UpdateKambanDto,
  ): Promise<ReturnKambanUpdatedDto> {
    return new ReturnKambanUpdatedDto(
      await this.kambanService.update(id, userId, data),
    )
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Deletar Kanban' })
  @ApiResponse({
    status: 201,
    description: 'Kanban deletado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Dado inválido!' })
  @ApiResponse({ status: 403, description: 'Sem acesso!' })
  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @UserId() userId: string,
  ): Promise<ReturnKambanDeletedDto> {
    return new ReturnKambanDeletedDto(
      await this.kambanService.remove(id, userId),
    )
  }
}
