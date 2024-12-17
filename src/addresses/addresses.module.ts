import { Module } from '@nestjs/common'
import { AddressesService } from './addresses.service'
import { AddressesController } from './addresses.controller'
import { DatabaseModule } from 'src/database/datasource.module'
import { addressProviders } from './address.providers'
import { UsersModule } from 'src/users/users.module'
import { CitiesModule } from 'src/cities/cities.module'

@Module({
  imports: [DatabaseModule, UsersModule, CitiesModule],
  controllers: [AddressesController],
  providers: [...addressProviders, AddressesService],
  exports: [AddressesService],
})
export class AddressesModule {}
