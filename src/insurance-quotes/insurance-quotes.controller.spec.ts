import { Test } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

import { VehicleTypesService } from '@/vehicle-types/vehicle-types.service';
import { ProductsService } from '@/products/products.service';
import { InsuranceQuotesService } from '@/insurance-quotes/insurance-quotes.service';
import { InsuranceQuotesController } from './insurance-quotes.controller';

const vehicleType = {
  id: 1,
  name: 'Product 1',
  description: 'Product 1 description',
  status: 1,
};
const product = {
  id: 1,
  name: 'Product Option 1',
  description: 'Product Option 1 description',
  status: 1,
  vehicleTypeId: 1,
  deductible: 100,
  days: 30,
  policyLimit: 1000,
  premium: 100,
};
const insuranceQuote = {
  vehicleTypeId: 1,
  productId: 1,
  customerName: 'Customer 1',
  customerEmail: 'customer@hotmail.com',
  customerAge: 30,
  customerPhone: '1234567890',
  vehicleModel: 'Model 1',
  licensePlate: 'ABC123',
  startDate: '2021-01-01',
};

const moduleMocker = new ModuleMocker(global);
describe('InsuranceQuotesController', () => {
  let controller: InsuranceQuotesController;
  const findVehicleType = jest.fn();
  const findProduct = jest.fn();
  const createInsuranceQuote = jest.fn();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [InsuranceQuotesController],
    })
      .useMocker((token) => {
        if (token === VehicleTypesService) {
          return {
            findOne: findVehicleType,
          };
        }
        if (token === ProductsService) {
          return {
            findOneByVehicleTypeId: findProduct,
          };
        }
        if (token === InsuranceQuotesService) {
          return {
            create: createInsuranceQuote,
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

    controller = moduleRef.get(InsuranceQuotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an insurance quote', async () => {
    findVehicleType.mockResolvedValueOnce(vehicleType);
    findProduct.mockResolvedValueOnce(product);
    createInsuranceQuote.mockResolvedValueOnce({
      id: 1,
      ...insuranceQuote,
      policyNumber: '3f3826a1-aed7-4041-91fd-f7f138b17439',
      endDate: '2021-01-31',
    });

    const createdInsuranceQuote = await controller.create(insuranceQuote);

    expect(createdInsuranceQuote).toEqual({
      id: 1,
      ...insuranceQuote,
      policyNumber: '3f3826a1-aed7-4041-91fd-f7f138b17439',
      endDate: '2021-01-31',
    });
  });

  it('should throw an error when vehicle type does not exist', async () => {
    findVehicleType.mockResolvedValueOnce(null);
    try {
      await controller.create(insuranceQuote);
    } catch (error) {
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('Vehicle type does not exist');
    }
  });

  it('should throw an error when product does not exist', async () => {
    findVehicleType.mockResolvedValueOnce(vehicleType);
    findProduct.mockResolvedValueOnce(null);
    try {
      await controller.create(insuranceQuote);
    } catch (error) {
      expect(error.status).toEqual(404);
      expect(error.message).toEqual('Product does not exist');
    }
  });
});
