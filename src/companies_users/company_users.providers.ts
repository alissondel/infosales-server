import { DataSource } from 'typeorm'
import { CompaniesToUsers } from './entities/companies_users.entity'

export const companiesToUsersProviders = [
  {
    provide: 'COMPANIESTOUSERS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CompaniesToUsers),
    inject: ['DATA_SOURCE'],
  },
]
