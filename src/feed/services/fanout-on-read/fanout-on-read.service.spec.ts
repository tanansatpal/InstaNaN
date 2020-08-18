import { Test, TestingModule } from '@nestjs/testing';
import { FanoutOnReadService } from './fanout-on-read.service';

describe('FanoutOnReadService', () => {
  let service: FanoutOnReadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FanoutOnReadService],
    }).compile();

    service = module.get<FanoutOnReadService>(FanoutOnReadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
