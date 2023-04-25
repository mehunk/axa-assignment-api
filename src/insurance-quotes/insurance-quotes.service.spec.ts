import { Test, TestingModule } from '@nestjs/testing';
import { InsuranceQuotesService } from './insurance-quotes.service';

describe('InsuranceQuotesService', () => {
  let service: InsuranceQuotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsuranceQuotesService],
    }).compile();

    service = module.get<InsuranceQuotesService>(InsuranceQuotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
