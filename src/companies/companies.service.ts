import { Company } from './entities/company.entity'
import { Repository } from 'typeorm'
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'
import { Inject, Injectable } from '@nestjs/common'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { FilterCompanyDto } from './dto/filter-company.dto'

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate'
@Injectable()
export class CompaniesService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: Repository<Company>,
  ) {}

  async findOne(id: string): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: {
        city: true,
      },
    })

    if (!company) {
      throw new NotFoundError('Empresa não encontrada!')
    }

    return company
  }

  async findCompanyWithUsers(id: string): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: {
        users: true,
        city: true,
      },
    })

    if (!company) {
      throw new NotFoundError('Empresa não encontrada!')
    }

    return company
  }

  async findAll(
    options: IPaginationOptions,
    order: 'ASC' | 'DESC' = 'ASC',
    filter: FilterCompanyDto,
  ): Promise<Pagination<Company>> {
    const queryBuilder = this.companyRepository.createQueryBuilder('co')

    const company = await queryBuilder
      .withDeleted()
      .select([
        'co.id',
        'co.companyName',
        'co.tradeName',
        'co.cnpj',
        'co.stateRegistration',
        'co.municipalRegistration',
        'co.responsibly',
        'co.email',
        'co.numberPhone',
        'co.status',
        'city.id',
        'city.name',
        'city.status',
      ])
      .where('co.status = :status', { status: true })
      .leftJoin(
        'co.city',
        'city',
        undefined, // Sem filtro adicional para 'city'
        { withDeleted: true }, // Inclui registros "soft-deleted" em city
      )

    filter.id &&
      company.andWhere('co.id = :id', {
        id: filter.id,
      })
    filter.companyName &&
      company.andWhere('co.companyName ILIKE :companyName', {
        companyName: `%${filter.companyName}%`,
      })
    filter.tradeName &&
      company.andWhere('co.tradeName ILIKE :tradeName', {
        tradeName: `%${filter.tradeName}%`,
      })
    filter.cnpj &&
      company.andWhere('co.cnpj ILIKE :cnpj', { cnpj: `%${filter.cnpj}%` })
    filter.stateRegistration &&
      company.andWhere('co.stateRegistration ILIKE :stateRegistration', {
        stateRegistration: `%${filter.stateRegistration}%`,
      })
    filter.municipalRegistration &&
      company.andWhere(
        'co.municipalRegistration ILIKE :municipalRegistration',
        {
          municipalRegistration: `%${filter.municipalRegistration}%`,
        },
      )
    filter.responsibly &&
      company.andWhere('co.responsibly ILIKE :responsibly', {
        responsibly: `%${filter.responsibly}%`,
      })
    filter.email &&
      company.andWhere('co.email ILIKE :email', { email: `%${filter.email}%` })
    filter.numberPhone &&
      company.andWhere('co.numberPhone ILIKE :numberPhone', {
        numberPhone: `%${filter.numberPhone}%`,
      })
    filter.status !== undefined &&
      company.andWhere('co.status = :status', {
        status: filter.status,
      })
    order && company.orderBy('co.tradeName', `${order}`)
    filter.cityName &&
      company.andWhere('city.name ILIKE :cityName', {
        cityName: `%${filter.cityName}%`,
      })

    return paginate<Company>(company, options)
  }

  async create(userId: string, data: CreateCompanyDto): Promise<Company> {
    const createCompanyData = {
      ...data,
      createdAt: new Date(),
      createdUser: userId,
    }

    const company = await this.companyRepository.save(createCompanyData)

    if (!company) {
      throw new NotFoundError('Faltando campos preenchidos!')
    }

    return company
  }

  async update(
    userId: string,
    id: string,
    data: UpdateCompanyDto,
  ): Promise<Company> {
    const companyOld = await this.findOne(id)

    const updatedCompanyData = {
      ...data,
      status: true,
      updatedAt: new Date(),
      updatedUser: userId,
    }

    return await this.companyRepository.save({
      ...companyOld,
      ...updatedCompanyData,
    })
  }

  async delete(userId: string, id: string): Promise<Company> {
    const company = await this.findOne(id)

    const deletedCompanyData = {
      deletedAt: new Date(),
      deletedUser: userId,
      status: false,
    }

    return await this.companyRepository.save({
      ...company,
      ...deletedCompanyData,
    })
  }

  async cpnjAlreadyExists(cnpj: string): Promise<boolean> {
    const existingStateCNPJ = await this.companyRepository.findOneBy({ cnpj })

    return !existingStateCNPJ
  }
}
