import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesUsersService } from './companies_users.service';

describe('CompaniesUsersService', () => {
  let service: CompaniesUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesUsersService],
    }).compile();

    service = module.get<CompaniesUsersService>(CompaniesUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
