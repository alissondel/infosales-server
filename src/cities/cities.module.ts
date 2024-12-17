import { Module } from '@nestjs/common'
import { CitiesService } from './cities.service'
import { CitiesController } from './cities.controller'
import { DatabaseModule } from 'src/database/datasource.module'
import { cityProviders } from './city.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [CitiesController],
  providers: [...cityProviders, CitiesService],
  exports: [CitiesService],
})
export class CitiesModule {}
