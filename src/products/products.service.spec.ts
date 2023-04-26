import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';

import { Product } from './models/product.model';
import { ProductsService } from './products.service';

describe('ProductService', () => {
  let service: ProductsService;
  const findOne = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product),
          useValue: {
            findOne,
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error if product does not exist', async () => {
    const vehicleTypeId = 1;
    const productId = 1;
    findOne.mockReturnValue(null);
    await expect(
      service.findOneByVehicleTypeId(vehicleTypeId, productId),
    ).rejects.toThrowError();
  });
});
