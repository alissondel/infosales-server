import { City } from './entities/city.entity'
import { Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { CreateCityDto } from './dto/create-city.dto'
import { UpdateCityDto } from './dto/update-city.dto'
import { FilterCityDto } from './dto/filter-city.dto'
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'

import {
  paginate,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate'

@Injectable()
export class CitiesService {
  constructor(
    @Inject('CITY_REPOSITORY')
    private cityRepository: Repository<City>,
  ) {}

  async findOne(id: string): Promise<City> {
    const city = await this.cityRepository.findOne({
      where: { id },
      relations: {
        state: true,
      },
    })

    if (!city) {
      throw new NotFoundError('Cidade não encontrada!')
    }

    return city
  }

  async findAll(
    options: IPaginationOptions,
    order: 'ASC' | 'DESC' = 'ASC',
    filter: FilterCityDto,
  ): Promise<Pagination<City>> {
    const queryBuilder = this.cityRepository.createQueryBuilder('c')

    const city = await queryBuilder
      .select([
        'c.id',
        'c.name',
        'c.status',
        'state.id',
        'state.name',
        'state.uf',
        'state.status',
      ])
      .where('c.status = :status', { status: true })
      .leftJoin('c.state', 'state', undefined, { withDeleted: true })

    filter.id && city.andWhere('c.id = :id', { id: filter.id })
    filter.name &&
      city.andWhere('c.name ILIKE :name', { name: `%${filter.name}%` })
    filter.status !== undefined &&
      city.andWhere('c.status = :status', { status: filter.status })
    order && city.orderBy('c.name', `${order}`)
    filter.stateName &&
      city.andWhere('state.name ILIKE :stateName', {
        stateName: `%${filter.stateName}%`,
      })
    city.withDeleted()

    return paginate<City>(city, options)
  }

  async create(userId: string, data: CreateCityDto): Promise<City> {
    const createCityData = {
      ...data,
      createdAt: new Date(),
      createdUser: userId,
    }

    const city = await this.cityRepository.save(createCityData)

    if (!city) {
      throw new NotFoundError('Faltando campos preenchidos!')
    }

    return city
  }

  async update(id: string, userId: string, data: UpdateCityDto): Promise<City> {
    const cityOld = await this.findOne(id)

    const updatedCityData = {
      ...data,
      status: true,
      updatedAt: new Date(),
      updatedUser: userId,
    }

    return await this.cityRepository.save({
      ...cityOld,
      ...updatedCityData,
    })
  }

  async delete(userId: string, id: string): Promise<City> {
    const city = await this.findOne(id)

    const deletedCityData = {
      deletedAt: null,
      deletedUser: userId,
      status: false,
    }

    return await this.cityRepository.save({
      ...city,
      ...deletedCityData,
    })
  }
}
