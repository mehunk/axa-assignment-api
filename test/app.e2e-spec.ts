import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { InsuranceQuotesService } from '@/insurance-quotes/insurance-quotes.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let insuranceQuoteService: InsuranceQuotesService;
  let createdInsuranceQuoteId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    insuranceQuoteService = moduleFixture.get<InsuranceQuotesService>(
      InsuranceQuotesService,
    );
    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('/vehicle-types (GET)', () => {
    return request(app.getHttpServer())
      .get('/vehicle-types')
      .expect(200)
      .expect([
        {
          id: 1,
          name: 'automobile',
          description: 'product for automobile',
          status: 1,
        },
        {
          id: 2,
          name: 'bike',
          description: 'product for bile',
          status: 1,
        },
      ]);
  });

  it('/vehicle-types/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/vehicle-types/1')
      .expect(200)
      .expect({
        id: 1,
        name: 'automobile',
        description: 'product for automobile',
        status: 1,
      });
  });

  it('/insurance-quotes (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/insurance-quotes')
      .send({
        customerName: 'Jim',
        customerPhone: '1',
        customerEmail: 'jim@163.com',
        customerAge: 37,
        vehicleModel: 'BMW',
        licensePlate: '123452',
        startDate: '2023-04-18',
        vehicleTypeId: 1,
        productId: 1,
      })
      .expect(201);

    createdInsuranceQuoteId = res.body.id;
  });

  afterAll(async () => {
    await insuranceQuoteService.remove({ id: createdInsuranceQuoteId });
    await app.close();
  });
});
