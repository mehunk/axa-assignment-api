import { Column, Model, Table, HasMany } from 'sequelize-typescript';

import { Product } from '@/products/models/product.model';

@Table({ tableName: 'vehicle_types' })
export class VehicleType extends Model {
  @Column
  name: string;

  @Column
  description: string;

  @Column({ defaultValue: 1 })
  status: number;

  @HasMany(() => Product)
  products: Product[];
}
