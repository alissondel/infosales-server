import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesUsersController } from './companies_users.controller';
import { CompaniesUsersService } from './companies_users.service';

describe('CompaniesUsersController', () => {
  let controller: CompaniesUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesUsersController],
      providers: [CompaniesUsersService],
    }).compile();

    controller = module.get<CompaniesUsersController>(CompaniesUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
