import { Test } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

import { VehicleTypesController } from './vehicle-types.controller';
import { VehicleTypesService } from './vehicle-types.service';

const moduleMocker = new ModuleMocker(global);

describe('VehicleTypesController', () => {
  let controller: VehicleTypesController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [VehicleTypesController],
    })
      .useMocker((token) => {
        const results = [
          {
            id: 1,
            name: 'Product 1',
            description: 'Product 1 description',
            status: 1,
          },
        ];
        if (token === VehicleTypesService) {
          return { findAll: jest.fn().mockResolvedValue(results) };
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
});
