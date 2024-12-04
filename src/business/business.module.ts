import { Module } from '@nestjs/common'
import { BusinessService } from './business.service'
import { BusinessController } from './business.controller'
import { DatabaseModule } from 'src/database/datasource.module'
import { businessProviders } from './business.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [BusinessController],
  providers: [...businessProviders, BusinessService],
  exports: [BusinessService],
})
export class BusinessModule {}
