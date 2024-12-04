import { Inject, Injectable } from '@nestjs/common'
import { CreateBusinessDto } from './dto/create-business.dto'
import { UpdateBusinessDto } from './dto/update-business.dto'
import { Repository } from 'typeorm'
import { Business } from './entities/business.entity'
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'

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

  async findAll(): Promise<Business[]> {
    const businesses = await this.businessRepository.find({
      relations: {
        kamban: true,
      },
    })

    if (!businesses || businesses.length === 0) {
      throw new NotFoundError('Businesses não existente')
    }

    return businesses
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
