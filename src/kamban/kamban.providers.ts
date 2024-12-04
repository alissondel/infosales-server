import { DataSource } from 'typeorm'
import { Kamban } from './entities/kamban.entity'

export const kambanProviders = [
  {
    provide: 'KAMBAN_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Kamban),
    inject: ['DATA_SOURCE'],
  },
]
