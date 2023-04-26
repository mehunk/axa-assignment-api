import { Test } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

import { VehicleTypesController } from './vehicle-types.controller';
import { VehicleTypesService } from './vehicle-types.service';
import { ProductsService } from '@/products/products.service';

const moduleMocker = new ModuleMocker(global);
const vehicleTypes = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Product 1 description',
    status: 1,
  },
];
const products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Product 1 description',
    status: 1,
    deductible: 100,
    premium: 100,
    policyLimit: 100,
    vehicleTypeId: 1,
  },
];

describe('VehicleTypesController', () => {
  let controller: VehicleTypesController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [VehicleTypesController],
    })
      .useMocker((token) => {
        if (token === VehicleTypesService) {
          return {
            findAll: jest.fn().mockResolvedValue(vehicleTypes),
            findOne: jest.fn().mockResolvedValue(vehicleTypes[0]),
          };
        }
        if (token === ProductsService) {
          return {
            findProducts: jest.fn().mockResolvedValue(products),
            findOneByVehicleTypeId: jest.fn().mockResolvedValue(products[0]),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = moduleRef.get(VehicleTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of vehicle-types', async () => {
    const products = await controller.findAll();
    expect(products).toEqual([
      {
        id: 1,
        name: 'Product 1',
        description: 'Product 1 description',
        status: 1,
      },
    ]);
  });

  it('should return a vehicle-type', async () => {
    const product = await controller.findOne(1);
    expect(product).toEqual({
      id: 1,
      name: 'Product 1',
      description: 'Product 1 description',
      status: 1,
    });
  });

  it('should return an array of products', async () => {
    const products = await controller.findProducts(1);
    expect(products).toEqual([
      {
        id: 1,
        name: 'Product 1',
        description: 'Product 1 description',
        status: 1,
        deductible: 100,
        premium: 100,
        policyLimit: 100,
        vehicleTypeId: 1,
      },
    ]);
  });
});
