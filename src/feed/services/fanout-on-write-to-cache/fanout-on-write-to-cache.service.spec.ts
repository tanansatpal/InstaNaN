import { Test, TestingModule } from '@nestjs/testing';
import { FanoutOnWriteToCacheService } from './fanout-on-write-to-cache.service';

describe('FanoutOnWriteToCacheService', () => {
  let service: FanoutOnWriteToCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FanoutOnWriteToCacheService],
    }).compile();

    service = module.get<FanoutOnWriteToCacheService>(FanoutOnWriteToCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
