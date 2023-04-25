import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { VehicleTypesService } from './vehicle-types.service';
import { ProductsService } from '@/products/products.service';

@Controller('vehicle-types')
export class VehicleTypesController {
  constructor(
    private readonly productsService: VehicleTypesService,
    private readonly productOptionsService: ProductsService,
  ) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Get(':id/products')
  findOptions(@Param('id', ParseIntPipe) id: number) {
    return this.productOptionsService.findProducts(id);
  }
}
