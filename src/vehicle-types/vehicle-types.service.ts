import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { VehicleType } from './models/vehicle-types.model';

@Injectable()
export class VehicleTypesService {
  constructor(
    @InjectModel(VehicleType)
    private vehicleTypeModel: typeof VehicleType,
  ) {}

  findAll(): Promise<VehicleType[]> {
    return this.vehicleTypeModel.findAll();
  }

  findOne(id: number): Promise<VehicleType> {
    return this.vehicleTypeModel.findByPk(id);
  }
}
