import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Product } from './models/product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} productOption`;
  }

  findProducts(vehicleTypeId: number): Promise<Product[]> {
    return this.productModel.findAll({
      where: {
        vehicleTypeId,
      },
    });
  }

  findOneByVehicleTypeId(
    vehicleTypeId: number,
    productId: number,
  ): Promise<Product> {
    return this.productModel.findOne({
      where: {
        id: productId,
        vehicleTypeId,
      },
    });
  }
}
