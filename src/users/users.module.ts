import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { DatabaseModule } from 'src/database/datasource.module'
import { userProviders } from './user.providers'
import { EmailIsUnique } from './validators/email-is-unique.validator'

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...userProviders, UsersService, EmailIsUnique],
  exports: [UsersService],
})
export class UsersModule {}
