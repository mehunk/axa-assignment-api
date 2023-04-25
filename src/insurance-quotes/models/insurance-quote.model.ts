import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';

import { VehicleType } from '@/vehicle-types/models/vehicle-types.model';
import { Product } from '@/products/models/product.model';

@Table({ tableName: 'insurance_quotes' })
export class InsuranceQuote extends Model {
  @Column({
    validate: {
      isUUID: 4,
    },
  })
  policyNumber: string;

  @Column({
    validate: {
      len: [1, 20],
    },
  })
  customerName: string;

  @Column({
    validate: {
      len: [1, 20],
    },
  })
  customerPhone: string;

  @Column({
    validate: {
      isEmail: true,
      len: [1, 50],
    },
  })
  customerEmail: string;

  @Column({
    validate: {
      isInt: true,
      min: 18,
      max: 100,
    },
  })
  customerAge: number;

  @Column({
    validate: {
      isDate: true,
    },
  })
  startDate: string;

  @Column({
    validate: {
      len: [1, 50],
    },
  })
  vehicleModel: string;

  @Column({
    validate: {
      len: [1, 20],
    },
  })
  licensePlate: string;

  @Column({
    validate: {
      isDate: true,
    },
  })
  endDate: string;

  @Column({ defaultValue: false })
  paid: boolean;

  @Column({
    validate: {
      isDate: true,
    },
  })
  paidAt: Date;

  @ForeignKey(() => VehicleType)
  @Column
  vehicleTypeId: number;

  @ForeignKey(() => Product)
  @Column
  productId: number;
}
