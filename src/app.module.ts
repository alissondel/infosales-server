import { Module, ValidationPipe } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { RolesGuard } from './guards/roles.guard'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD, APP_PIPE } from '@nestjs/core'
import { KambanModule } from './kamban/kamban.module'
import { BusinessModule } from './business/business.module'
import { CompaniesModule } from './companies/companies.module'
import { StatesModule } from './states/states.module'
import { CitiesModule } from './cities/cities.module'
import { AddressesModule } from './addresses/addresses.module';
import { CompaniesUsersModule } from './companies_users/companies_users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    UsersModule,
    AuthModule,
    JwtModule,
    BusinessModule,
    KambanModule,
    CompaniesModule,
    StatesModule,
    CitiesModule,
    AddressesModule,
    CompaniesUsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
