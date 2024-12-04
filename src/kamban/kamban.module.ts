import { Module } from '@nestjs/common'
import { KambanService } from './kamban.service'
import { KambanController } from './kamban.controller'
import { DatabaseModule } from 'src/database/datasource.module'
import { kambanProviders } from './kamban.providers'
import { BusinessModule } from 'src/business/business.module'

@Module({
  imports: [DatabaseModule, BusinessModule],
  controllers: [KambanController],
  providers: [...kambanProviders, KambanService],
  exports: [KambanService],
})
export class KambanModule {}
