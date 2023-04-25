import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ProductsModule } from '@/products/products.module';
import { VehicleType } from './models/vehicle-types.model';
import { VehicleTypesService } from './vehicle-types.service';
import { VehicleTypesController } from './vehicle-types.controller';

@Module({
  imports: [ProductsModule, SequelizeModule.forFeature([VehicleType])],
  controllers: [VehicleTypesController],
  providers: [VehicleTypesService],
  exports: [VehicleTypesService],
})
export class VehicleTypesModule {}
