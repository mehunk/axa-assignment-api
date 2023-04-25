import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Product } from './models/product.model';
import { ProductsService } from './products.service';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
