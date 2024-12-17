import { Module } from '@nestjs/common'
import { StatesService } from './states.service'
import { StatesController } from './states.controller'
import { DatabaseModule } from 'src/database/datasource.module'
import { stateProviders } from './state.providers'
import { CitiesModule } from 'src/cities/cities.module'

@Module({
  imports: [DatabaseModule, CitiesModule],
  controllers: [StatesController],
  providers: [...stateProviders, StatesService],
  exports: [StatesService],
})
export class StatesModule {}
