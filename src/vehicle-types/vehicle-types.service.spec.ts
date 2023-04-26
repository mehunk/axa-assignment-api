import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';

import { VehicleType } from './models/vehicle-types.model';
import { VehicleTypesService } from './vehicle-types.service';

describe('VehicleTypesService', () => {
  let service: VehicleTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleTypesService,
        {
          provide: getModelToken(VehicleType),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<VehicleTypesService>(VehicleTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
