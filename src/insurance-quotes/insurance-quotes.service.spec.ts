import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';

import { InsuranceQuote } from './models/insurance-quote.model';
import { InsuranceQuotesService } from './insurance-quotes.service';

describe('InsuranceQuotesService', () => {
  let service: InsuranceQuotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InsuranceQuotesService,
        {
          provide: getModelToken(InsuranceQuote),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<InsuranceQuotesService>(InsuranceQuotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
