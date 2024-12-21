import { Repository } from 'typeorm'
import { Business } from './entities/business.entity'
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'
import { CreateBusinessDto } from './dto/create-business.dto'
import { UpdateBusinessDto } from './dto/update-business.dto'
import { FilterBusinessDto } from './dto/filter-business.dto'
import { Inject, Injectable } from '@nestjs/common'

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate'

@Injectable()
export class BusinessService {
  constructor(
    @Inject('BUSINESS_REPOSITORY')
    private businessRepository: Repository<Business>,
  ) {}

  async findOne(id: string): Promise<Business> {
    const business = await this.businessRepository.findOneBy({ id })

    if (!business) {
      throw new NotFoundError('Business não existente')
    }

    return business
  }

  async findAll(
    options: IPaginationOptions,
    order: 'ASC' | 'DESC' = 'ASC',
    filter: FilterBusinessDto,
  ): Promise<Pagination<Business>> {
    const queryBuilder = this.businessRepository.createQueryBuilder('b')

    const businesses = await queryBuilder
      .select([
        'b.id',
        'b.title',
        'b.status',
        'b.status',
        'kamban.id',
        'kamban.title',
        'kamban.observation',
      ])
      .where('b.status = :status', { status: true })
      .leftJoin('b.kamban', 'kamban', undefined, { withDeleted: true })

    filter.id && businesses.andWhere('b.id = :id', { id: filter.id })
    filter.title &&
      businesses.andWhere('b.name ILIKE :name', { title: `%${filter.title}%` })
    filter.status !== undefined &&
      businesses.andWhere('b.status = :status', { status: filter.status })
    order && businesses.orderBy('b.title', `${order}`)
    filter.titleKamban &&
      businesses.andWhere('kamban.title ILIKE :titleKamban', {
        titleKamban: `%${filter.titleKamban}%`,
      })
    businesses.withDeleted()

    return paginate<Business>(businesses, options)
  }

  async create(userId: string, data: CreateBusinessDto): Promise<Business> {
    const createBusinessData = {
      ...data,
      createdAt: new Date(),
      createdUser: userId,
    }

    const business = await this.businessRepository.create(createBusinessData)

    if (!business) throw new NotFoundError('Faltando campos preenchidos!')

    return this.businessRepository.save(business)
  }

  async copy(id: string, userId: string): Promise<Business> {
    const copyBusiness = await this.findOne(id)

    const createBusinessData = {
      title: copyBusiness.title,
      status: copyBusiness.status,
      createdAt: new Date(),
      createdUser: userId,
    }

    const business = this.businessRepository.create(createBusinessData)

    if (!business) throw new NotFoundError('Faltando campos preenchidos!')

    return this.businessRepository.save(business)
  }

  async update(
    id: string,
    userId: string,
    data: UpdateBusinessDto,
  ): Promise<Business> {
    const businessOld = await this.findOne(id)

    const UpdatedBusinessData = {
      ...data,
      updatedAt: new Date(),
      updatedUser: userId,
    }

    return await this.businessRepository.save({
      ...businessOld,
      ...UpdatedBusinessData,
    })
  }

  async remove(id: string, userId: string): Promise<Business> {
    const business = await this.findOne(id)

    const data = {
      deletedAt: new Date(),
      deletedUser: userId,
      status: false,
    }

    return await this.businessRepository.save({
      ...business,
      ...data,
    })
  }
}
