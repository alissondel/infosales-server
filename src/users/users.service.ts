import { NotFoundError } from 'src/commom/errors/types/NotFoundError'
import { encryptPassword } from 'src/utils/encrypt/password'
import { Inject, Injectable } from '@nestjs/common'

import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new NotFoundError('Usuário não existente')
    }

    return user
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async create(data: CreateUserDto): Promise<User> {
    const { name, email, password } = data

    const cryptPassword = await encryptPassword(password)

    const createUserData = {
      name,
      email: email.trim(),
      password: cryptPassword,
      typeUser: 1,
      createdAt: new Date(),
      createdUser: 0,
    }

    const user = await this.userRepository.create(createUserData)

    if (!user) {
      throw new NotFoundError('Faltando campos preenchidos!')
    }

    return this.userRepository.save(user)
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const userOld = await this.findOne(id)

    const UpdatedUserData = {
      ...data,
      updatedAt: new Date(),
      updatedUser: 0,
    }

    return await this.userRepository.save({
      ...userOld,
      ...UpdatedUserData,
    })
  }

  async delete(id: string): Promise<User> {
    const user = await this.findOne(id)

    const data = {
      deletedAt: new Date(),
      deletedUser: 0,
      status: false,
    }

    return await this.userRepository.save({
      ...user,
      ...data,
    })
  }

  async emailAlreadyExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email })
    if (user !== null) {
      return true
    }
    return false
  }
}
