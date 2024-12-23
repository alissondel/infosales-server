import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { HelperFile } from 'src/shared/helper'
import { NotFoundError } from 'src/commom/errors/types/NotFoundError'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { FilterUserDto } from './dto/filter-user.dto'
import { UpdatePasswordDto } from './dto/update-password.dto'
import { encryptPassword, validatePassword } from 'src/utils/encrypt/password'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate'

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    })

    if (!user) {
      throw new NotFoundError('Usuário não existente')
    }

    return user
  }

  async findUserWithCompanies(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        companies: {
          company: true,
        },
      },
    })

    if (!user) {
      throw new NotFoundError('Usuário não existente')
    }

    return user
  }

  async findEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: {
        addresses: true,
      },
    })

    if (!user) {
      throw new NotFoundError(`Email: ${email} não existente!`)
    }

    return user
  }

  async findAll(
    options: IPaginationOptions,
    order: 'ASC' | 'DESC' = 'ASC',
    filter: FilterUserDto,
  ): Promise<Pagination<User>> {
    const queryBuilder = this.userRepository.createQueryBuilder('u')

    const user = await queryBuilder
      .select([
        'u.id',
        'u.name',
        'u.email',
        'u.typeUser',
        'u.status',
        'u.createdAt',
      ])
      .where('u.status = :status', { status: true })

    filter.id && user.andWhere('u.id = :id', { id: filter.id })
    filter.name &&
      user.andWhere('u.name ILIKE :name', { name: `%${filter.name}%` })
    filter.email &&
      user.andWhere('u.email ILIKE :email', { email: `%${filter.email}%` })
    filter.typeUser &&
      user.andWhere('u.typeUser = :typeUser', { typeUser: filter.typeUser })
    filter.status !== undefined &&
      user.andWhere('u.status = :status', { status: filter.status })
    filter.createdAt !== undefined &&
      user.andWhere('u.createdAt = :createdAt', { createdAt: filter.createdAt })
    order && user.orderBy('u.name', `${order}`)
    user.withDeleted()

    return paginate<User>(user, options)
  }

  async createCommon(data: CreateUserDto): Promise<User> {
    const { name, email, password } = data

    const cryptPassword = await encryptPassword(password)

    const createUserData = {
      name,
      email: email.trim(),
      password: cryptPassword,
      typeUser: 1,
      createdAt: new Date(),
      createdUser: 'Comum',
    }

    const user = await this.userRepository.create(createUserData)

    if (!user) throw new NotFoundError('Faltando campos preenchidos!')

    return this.userRepository.save(user)
  }

  async createAdmin(userId: string, data: CreateUserDto): Promise<User> {
    const { name, email, password } = data

    const cryptPassword = await encryptPassword(password)

    const createUserData = {
      name,
      email: email.trim(),
      password: cryptPassword,
      typeUser: 1,
      createdAt: new Date(),
      createdUser: userId,
    }

    const user = await this.userRepository.create(createUserData)

    if (!user) throw new NotFoundError('Faltando campos preenchidos!')

    return this.userRepository.save(user)
  }

  async updateAvatar(userId: string, file: string, fileName: string) {
    const user = await this.findOne(userId)

    if (user.avatar === null || user.avatar === '') {
      await this.userRepository.update(userId, {
        avatar: file,
        avatar_url:
          process.env.PATH_IMAGE_HOST + '/users/profile-image/' + fileName,
      })
    } else {
      await HelperFile.removeFile(user.avatar)

      await this.userRepository.update(userId, {
        avatar: file,
        avatar_url:
          process.env.PATH_IMAGE_HOST + '/users/profile-image/' + fileName,
      })
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const userOld = await this.findOne(id)

    const UpdatedUserData = {
      ...data,
      updatedAt: new Date(),
      updatedUser: id,
    }

    return await this.userRepository.save({
      ...userOld,
      ...UpdatedUserData,
    })
  }

  async updatePassword(userId: string, data: UpdatePasswordDto) {
    const user = await this.findOne(userId)

    const cryptNewPassword = await encryptPassword(data.newPassword)
    const isMatch = await validatePassword(data.password, user.password)

    if (!isMatch) {
      throw new BadRequestException(
        'Senha alterada, por favor verificar se está correta!',
      )
    }

    if (data.newPassword !== data.confirmNewPassword) {
      throw new NotFoundError(
        'Nova senha e Confirmar nova senha estão diferentes!',
      )
    }

    return this.userRepository.save({
      ...user,
      password: cryptNewPassword,
    })
  }

  async inactiveUserToken(userId: string): Promise<User> {
    const user = await this.findOne(userId)

    const data = {
      deletedAt: null,
      deletedUser: userId,
      status: false,
    }

    return await this.userRepository.save({
      ...user,
      ...data,
    })
  }

  async inactiveUserId(id: string, userId: string): Promise<User> {
    const user = await this.findOne(id)

    const data = {
      deletedAt: null,
      deletedUser: userId,
      status: false,
    }

    return await this.userRepository.save({
      ...user,
      ...data,
    })
  }

  async emailAlreadyExists(email: string): Promise<boolean> {
    const existingUserEmail = await this.userRepository.findOneBy({ email })

    return !existingUserEmail
  }
}
