import { Address } from './entities/address.entity'
import { Repository } from 'typeorm'
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'
import { ConflictError } from 'src/commom/errors/types/ConflictError'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { FilterAddressDto } from './dto/filter-address.dto'
import { Inject, Injectable } from '@nestjs/common'

import {
  paginate,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate'

@Injectable()
export class AddressesService {
  constructor(
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<Address>,
  ) {}

  async findOne(id: string): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: {
        city: true,
        user: true,
      },
    })

    if (!address) {
      throw new NotFoundError('Endereço não encontrado!')
    }

    return address
  }

  async findAll(
    options: IPaginationOptions,
    order: 'ASC' | 'DESC' = 'ASC',
    filter: FilterAddressDto,
  ): Promise<Pagination<Address>> {
    const queryBuilder = this.addressRepository.createQueryBuilder('a')

    const address = await queryBuilder
      .withDeleted()
      .select([
        'a.id',
        'a.street',
        'a.numberAddress',
        'a.cep',
        'a.neighborhood',
        'a.complement',
        'a.status',
        'city.id',
        'city.name',
        'city.status',
        'user.id',
        'user.name',
        'user.status',
      ])
      .where('a.status = :status', { status: true })
      .leftJoin(
        'a.city',
        'city',
        undefined, // Sem filtro adicional para 'city'
        { withDeleted: true }, // Inclui registros "soft-deleted" em city
      )
      .leftJoin(
        'a.user',
        'user',
        undefined, // Sem filtro adicional para 'user'
        { withDeleted: true }, // Inclui registros "soft-deleted" em user
      )

    filter.id && address.andWhere('a.id = :id', { id: filter.id })
    filter.street &&
      address.andWhere('a.street ILIKE :street', {
        street: `%${filter.street}%`,
      })
    filter.status !== undefined &&
      address.andWhere('a.status = :status', { status: filter.status })
    order && address.orderBy('a.street', `${order}`)
    filter.cityName &&
      address.andWhere('city.name ILIKE :cityName', {
        cityName: `%${filter.cityName}%`,
      })
    filter.userName &&
      address.andWhere('user.name ILIKE :userName', {
        userName: `%${filter.userName}%`,
      })

    return paginate<Address>(address, options)
  }

  async create(userId: string, data: CreateAddressDto): Promise<Address> {
    const UserHasAddress = await this.addressRepository.findOneBy({ userId })

    // Verifica se o usuário já possui endereço
    if (UserHasAddress) {
      throw new ConflictError('Usuário já possui um endereço cadastrado!')
    }

    const createAddressData = {
      ...data,
      createdAt: new Date(),
      createdUser: userId,
      userId,
    }

    const address = await this.addressRepository.save(createAddressData)

    if (!address) {
      throw new NotFoundError('Faltando campos preenchidos!')
    }

    return address
  }

  async update(
    id: string,
    userId: string,
    data: UpdateAddressDto,
  ): Promise<Address> {
    const addressOld = await this.findOne(id)

    const updatedAddressData = {
      ...data,
      status: true,
      updatedAt: new Date(),
      updatedUser: userId,
      userId,
    }

    return await this.addressRepository.save({
      ...addressOld,
      ...updatedAddressData,
    })
  }

  async delete(userId: string, id: string): Promise<Address> {
    const address = await this.findOne(id)

    const deletedAddressData = {
      deletedAt: null,
      deletedUser: userId,
      status: false,
      userId,
    }

    return await this.addressRepository.save({
      ...address,
      ...deletedAddressData,
    })
  }
}
