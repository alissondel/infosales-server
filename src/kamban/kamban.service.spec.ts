import { Test, TestingModule } from '@nestjs/testing';
import { KambanService } from './kamban.service';

describe('KambanService', () => {
  let service: KambanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KambanService],
    }).compile();

    service = module.get<KambanService>(KambanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
