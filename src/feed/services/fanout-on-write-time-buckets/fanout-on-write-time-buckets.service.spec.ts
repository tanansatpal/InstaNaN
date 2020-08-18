import { Test, TestingModule } from '@nestjs/testing';
import { FanoutOnWriteTimeBucketsService } from './fanout-on-write-time-buckets.service';

describe('FanoutOnWriteTimeBucketsService', () => {
  let service: FanoutOnWriteTimeBucketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FanoutOnWriteTimeBucketsService],
    }).compile();

    service = module.get<FanoutOnWriteTimeBucketsService>(FanoutOnWriteTimeBucketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
