import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { APP_GUARD, APP_PIPE } from '@nestjs/core'
import { AuthModule } from './auth/auth.module'
import { RolesGuard } from './guards/roles.guard'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    UsersModule,
    AuthModule,
    JwtModule,
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
