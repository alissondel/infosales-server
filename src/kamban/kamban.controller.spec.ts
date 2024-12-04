import { Test, TestingModule } from '@nestjs/testing';
import { KambanController } from './kamban.controller';
import { KambanService } from './kamban.service';

describe('KambanController', () => {
  let controller: KambanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KambanController],
      providers: [KambanService],
    }).compile();

    controller = module.get<KambanController>(KambanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
