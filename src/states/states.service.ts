import { Inject, Injectable } from '@nestjs/common'
import { CreateStateDto } from './dto/create-state.dto'
import { UpdateStateDto } from './dto/update-state.dto'
import { Repository } from 'typeorm'
import { State } from './entities/state.entity'
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate'

@Injectable()
export class StatesService {
  constructor(
    @Inject('STATE_REPOSITORY')
    private stateRepository: Repository<State>,
  ) {}

  async findOne(id: string): Promise<State> {
    const state = await this.stateRepository.findOneBy({ id })

    if (!state) {
      throw new NotFoundError('Estado não encontrado!')
    }

    return state
  }

  async findAll(
    options: IPaginationOptions,
    order: 'ASC' | 'DESC' = 'ASC',
    id: string,
    name: string,
    uf: string,
    status: boolean,
  ): Promise<Pagination<State>> {
    const queryBuilder = this.stateRepository.createQueryBuilder('s')

    const state = await queryBuilder
      .select(['s.id', 's.name', 's.uf', 's.status'])
      .where('s.status = :status', { status: true })

    id && state.andWhere('s.id = :id', { id })
    name && state.andWhere('s.name ILIKE :name', { name: `%${name}%` })
    uf && state.andWhere('s.uf ILIKE :uf', { uf: `%${uf}%` })
    status !== undefined && state.andWhere('s.status = :status', { status })
    order && state.orderBy('s.name', `${order}`)
    state.withDeleted()

    return paginate<State>(state, options)
  }

  async create(userId: string, data: CreateStateDto): Promise<State> {
    const createStateData = {
      ...data,
      createdAt: new Date(),
      createdUser: userId,
    }

    const state = await this.stateRepository.save(createStateData)

    if (!state) {
      throw new NotFoundError('Faltando campos preenchidos!')
    }

    return state
  }

  async update(
    userId: string,
    id: string,
    data: UpdateStateDto,
  ): Promise<State> {
    const stateOld = await this.findOne(id)

    const updatedStateData = {
      ...data,
      status: true,
      updatedAt: new Date(),
      updatedUser: userId,
    }

    return await this.stateRepository.save({
      ...stateOld,
      ...updatedStateData,
    })
  }

  async delete(userId: string, id: string) {
    const state = await this.findOne(id)

    const deletedStateData = {
      deletedAt: new Date(),
      deletedUser: userId,
      status: false,
    }

    return await this.stateRepository.save({
      ...state,
      ...deletedStateData,
    })
  }

  async ufAlreadyExists(uf: string): Promise<boolean> {
    const existingStateUF = await this.stateRepository.findOneBy({ uf })

    return !existingStateUF
  }
}
