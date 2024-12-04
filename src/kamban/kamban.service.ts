import { Kamban } from './entities/kamban.entity'
import { Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { CreateKambanDto } from './dto/create-kamban.dto'
import { UpdateKambanDto } from './dto/update-kamban.dto'
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'

@Injectable()
export class KambanService {
  constructor(
    @Inject('KAMBAN_REPOSITORY')
    private kambanRepository: Repository<Kamban>,
  ) {}

  async findOne(id: string): Promise<Kamban> {
    const kanbam = await this.kambanRepository.findOneBy({ id })

    if (!kanbam) {
      throw new NotFoundError('Kanbam não existente')
    }

    return kanbam
  }

  async findAll(): Promise<Kamban[]> {
    const kambans = await this.kambanRepository.find({
      relations: {
        business: true,
      },
    })

    if (!kambans || kambans.length === 0) {
      throw new NotFoundError('Kanbam não existente')
    }

    return kambans
  }

  async create(userId: string, data: CreateKambanDto): Promise<Kamban> {
    const createKambanData = {
      ...data,
      createdAt: new Date(),
      createdUser: userId,
    }

    const kamban = await this.kambanRepository.create(createKambanData)

    if (!kamban) throw new NotFoundError('Faltando campos preenchidos!')

    return this.kambanRepository.save(kamban)
  }

  async update(
    id: string,
    userId: string,
    data: UpdateKambanDto,
  ): Promise<Kamban> {
    const kambanOld = await this.findOne(id)

    const UpdatedKanbamData = {
      ...data,
      updatedAt: new Date(),
      updatedUser: userId,
    }

    return await this.kambanRepository.save({
      ...kambanOld,
      ...UpdatedKanbamData,
    })
  }

  async remove(id: string, userId: string): Promise<Kamban> {
    const kamban = await this.findOne(id)

    if (!userId) {
      throw new NotFoundError('Usuário não pode excluir!')
    }

    return await this.kambanRepository.remove(kamban)
  }
}
