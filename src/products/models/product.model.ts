import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { VehicleType } from '@/vehicle-types/models/vehicle-types.model';

@Table({ tableName: 'products' })
export class Product extends Model {
  @Column
  name: string;

  @Column
  description: string;

  @Column({ defaultValue: 1 })
  status: number;

  @Column
  deductible: number;

  @Column
  policyLimit: number;

  @Column
  days: number;

  @Column
  premium: number;

  @ForeignKey(() => VehicleType)
  vehicleTypeId: number;

  @BelongsTo(() => VehicleType)
  vehicleType: VehicleType;
}
