import { Test, TestingModule } from '@nestjs/testing';
import { FanoutOnWriteSizedBucketsService } from './fanout-on-write-sized-buckets.service';

describe('FanoutOnWriteSizedBucketsService', () => {
  let service: FanoutOnWriteSizedBucketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FanoutOnWriteSizedBucketsService],
    }).compile();

    service = module.get<FanoutOnWriteSizedBucketsService>(FanoutOnWriteSizedBucketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
