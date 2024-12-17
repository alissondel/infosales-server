import { Module } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CompaniesController } from './companies.controller'
import { DatabaseModule } from 'src/database/datasource.module'
import { companyProviders } from './company.providers'
import { CitiesModule } from 'src/cities/cities.module'

@Module({
  imports: [DatabaseModule, CitiesModule],
  controllers: [CompaniesController],
  providers: [...companyProviders, CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
