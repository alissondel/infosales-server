import { Roles } from 'src/decorators/roles.decorator'
import { UserId } from 'src/decorators/user-id-decorator'
import { UserType } from 'src/users/enum/user-type.enum'
import { BusinessService } from './business.service'
import { CreateBusinessDto } from './dto/create-business.dto'
import { UpdateBusinessDto } from './dto/update-business.dto'
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common'

import {
  ReturnBusinessDto,
  ReturnBusinessUpdatedDto,
  ReturnBusinessDeletedDto,
} from './dto/return-business.dto'

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger'

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Listar Negócio Por Parametro Id' })
  @ApiResponse({
    status: 200,
    description: 'Negócio listado com sucessos.',
  })
  @ApiResponse({ status: 403, description: 'Sem acesso!' })
  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReturnBusinessDto> {
    return new ReturnBusinessDto(await this.businessService.findOne(id))
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Listar Negócio' })
  @ApiResponse({
    status: 200,
    description: 'Negócio listados com sucessos.',
  })
  @ApiResponse({ status: 403, description: 'Sem acesso!' })
  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Get()
  async findAll(): Promise<ReturnBusinessDto[]> {
    return (await this.businessService.findAll()).map(
      (businessEntity) => new ReturnBusinessDto(businessEntity),
    )
  }

  @ApiBody({ type: CreateBusinessDto })
  @ApiOperation({ summary: 'Criar Kanban' })
  @ApiResponse({
    status: 201,
    description: 'Negócio criado criado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Dado inválido!' })
  @ApiResponse({ status: 403, description: 'Sem acesso!' })
  @ApiResponse({ status: 404, description: 'Negócio já criado !' })
  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Post()
  async create(
    @UserId() userId: string,
    @Body() data: CreateBusinessDto,
  ): Promise<ReturnBusinessDto> {
    return new ReturnBusinessDto(
      await this.businessService.create(userId, data),
    )
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Copiar Negócio' })
  @ApiResponse({
    status: 201,
    description: 'Negócio copiado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Dado inválido!' })
  @ApiResponse({ status: 403, description: 'Sem acesso!' })
  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Post('/copy/:id')
  async copy(
    @Param('id') id: string,
    @UserId() userId: string,
  ): Promise<ReturnBusinessDto> {
    return new ReturnBusinessDto(await this.businessService.copy(id, userId))
  }

  @ApiBody({ type: UpdateBusinessDto })
  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Atualizar Negócio' })
  @ApiResponse({
    status: 201,
    description: 'negócio atualizado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Dado inválido!' })
  @ApiResponse({ status: 403, description: 'Sem acesso!' })
  @Roles(UserType.Admin, UserType.Common, UserType.Root)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @UserId() userId: string,
    @Body() data: UpdateBusinessDto,
  ): Promise<ReturnBusinessUpdatedDto> {
    return new ReturnBusinessUpdatedDto(
      await this.businessService.update(id, userId, data),
    )
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Deletar Negócio' })
  @ApiResponse({
    status: 201,
    description: 'Negócio deletado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Dado inválido!' })
  @ApiResponse({ status: 403, description: 'Sem acesso!' })
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @UserId() userId: string,
  ): Promise<ReturnBusinessDeletedDto> {
    return new ReturnBusinessDeletedDto(
      await this.businessService.remove(id, userId),
    )
  }
}
