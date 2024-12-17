import { Module } from '@nestjs/common'
import { CompaniesUsersService } from './companies_users.service'
import { CompaniesUsersController } from './companies_users.controller'
import { CompaniesModule } from 'src/companies/companies.module'
import { UsersModule } from 'src/users/users.module'
import { DatabaseModule } from 'src/database/datasource.module'
import { companiesToUsersProviders } from './company_users.providers'

@Module({
  imports: [DatabaseModule, CompaniesModule, UsersModule],
  controllers: [CompaniesUsersController],
  providers: [...companiesToUsersProviders, CompaniesUsersService],
  exports: [CompaniesUsersService],
})
export class CompaniesUsersModule {}
