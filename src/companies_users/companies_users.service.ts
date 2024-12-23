import { Repository } from 'typeorm'
import { UsersService } from 'src/users/users.service'
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'
import { CompaniesService } from 'src/companies/companies.service'
import { CompaniesToUsers } from './entities/companies_users.entity'
import { UpdateCompaniesToUserDto } from './dto/update-companies_user.dto'
import { CreateCompaniesToUsersDto } from './dto/create-companies_users.dto'
import { FilterCompaniesToUsersDto } from './dto/filter-companies_users.dto'
import { forwardRef, Inject, Injectable } from '@nestjs/common'

import {
  paginate,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate'

@Injectable()
export class CompaniesUsersService {
  constructor(
    @Inject('COMPANIESTOUSERS_REPOSITORY')
    private companyToUserRepository: Repository<CompaniesToUsers>,

    @Inject(forwardRef(() => CompaniesService))
    private companiesService: CompaniesService,

    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async findOne(id: string): Promise<CompaniesToUsers> {
    const companyToUser = await this.companyToUserRepository.findOne({
      where: { id },
      relations: {
        user: true,
        company: true,
      },
    })

    if (!companyToUser) {
      throw new NotFoundError('Usuário e Empresa não encontrada!')
    }

    return companyToUser
  }

  async companiesToUsers(userId: string): Promise<CompaniesToUsers> {
    const companyToUser = await this.companyToUserRepository.findOne({
      where: { user: { id: userId } },
      relations: {
        user: true,
        company: true,
      },
    })

    if (!companyToUser) {
      throw new NotFoundError('Usuário e Empresa não encontrada!')
    }

    return companyToUser
  }

  async findAll(
    options: IPaginationOptions,
    order: 'ASC' | 'DESC' = 'ASC',
    filter: FilterCompaniesToUsersDto,
  ): Promise<Pagination<CompaniesToUsers>> {
    const queryBuilder = this.companyToUserRepository.createQueryBuilder('cu')

    const companiesToUsers = await queryBuilder
      .select([
        'cu.id',
        'cu.status',
        'company.id',
        'company.tradeName',
        'company.status',
        'user.id',
        'user.name',
        'user.status',
      ])
      .where('cu.status = :status', { status: true })
      .leftJoin('cu.company', 'company', undefined, { withDeleted: true })
      .leftJoin('cu.user', 'user', undefined, { withDeleted: true })

    filter.id && companiesToUsers.andWhere('cu.id = :id', { id: filter.id })
    filter.status !== undefined &&
      companiesToUsers.andWhere('cu.status = :status', {
        status: filter.status,
      })
    order && companiesToUsers.orderBy('cu.id', `${order}`)
    filter.companyName &&
      companiesToUsers.andWhere('company.tradeName ILIKE :companyName', {
        companyName: `%${filter.companyName}%`,
      })
    filter.userName &&
      companiesToUsers.andWhere('user.name ILIKE :userName', {
        userName: `%${filter.userName}%`,
      })
    companiesToUsers.withDeleted()

    return paginate<CompaniesToUsers>(companiesToUsers, options)
  }

  async create(
    userId: string,
    data: CreateCompaniesToUsersDto,
  ): Promise<CompaniesToUsers> {
    // Verifica se o ID do usuário existe
    const userExists = await this.usersService.findOne(data.userId)

    // Verifica se o ID da empresa existe
    const companyExists = await this.companiesService.findOne(data.companyId)

    if (!companyExists || !userExists) {
      throw new NotFoundError(
        'O ID da empresa ou do usuário fornecido não existe!',
      )
    }

    const existingRelation = await this.companyToUserRepository.findOne({
      where: { userId: data.userId, companyId: data.companyId },
    })

    if (existingRelation) {
      throw new NotFoundError('A empresa já está vinculada ao usuário!')
    }

    const createdData = {
      ...data,
      createdAt: new Date(),
      createdUser: userId,
      updatedAt: null,
    }

    const companyToUser = await this.companyToUserRepository.save(createdData)

    if (!companyToUser) {
      throw new NotFoundError('Faltando campos preenchidos!')
    }

    return companyToUser
  }

  async update(
    userId: string,
    id: string,
    data: UpdateCompaniesToUserDto,
  ): Promise<CompaniesToUsers> {
    const companyToUserOld = await this.findOne(id)

    if (!companyToUserOld) {
      throw new NotFoundError(
        'A relação entre o usuário e a empresa não foi encontrada!',
      )
    }

    const userExists = await this.usersService.findOne(data.userId)
    const companyExists = await this.companiesService.findOne(data.companyId)

    if (!companyExists || !userExists) {
      throw new NotFoundError(
        'O ID da empresa ou do usuário fornecido não existe!',
      )
    }

    const updatedData = {
      ...data,
      status: true,
      updatedAt: new Date(),
      updatedUser: userId,
    }

    return await this.companyToUserRepository.save({
      ...companyToUserOld,
      ...updatedData,
    })
  }

  async delete(userId: string, id: string): Promise<CompaniesToUsers> {
    const companyToUser = await this.findOne(id)

    const deletedData = {
      deletedAt: new Date(),
      deletedUser: userId,
      status: false,
    }

    return await this.companyToUserRepository.save({
      ...companyToUser,
      ...deletedData,
    })
  }
}
