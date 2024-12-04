import { Module, ValidationPipe } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { RolesGuard } from './guards/roles.guard'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD, APP_PIPE } from '@nestjs/core'
import { KambanModule } from './kamban/kamban.module'
import { BusinessModule } from './business/business.module'

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
