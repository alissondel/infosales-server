import { User } from 'src/users/entities/user.entity'
import { Kamban } from 'src/kamban/entities/kamban.entity'
import { DataSource } from 'typeorm'
import { Business } from 'src/business/entities/business.entity'

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        entities: [User, Kamban, Business],
        migrations: [`${__dirname}/migration/{.ts,*.js}`],
        migrationsRun: true,
        synchronize: true,
      })

      return dataSource.initialize()
    },
  },
]
