import { pick } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
} from '@nestjs/common';

import { CreateSaveInsuranceQuoteDto } from './dto/create-insurance-quote.dto';
import { VehicleTypesService } from '@/vehicle-types/vehicle-types.service';
import { ProductsService } from '@/products/products.service';
import { InsuranceQuotesService } from './insurance-quotes.service';
import { CreateInsuranceQuoteDto } from './dto/create-insurance-quote.dto';
import { UpdateInsuranceQuoteDto } from './dto/update-insurance-quote.dto';

@Controller('insurance-quotes')
export class InsuranceQuotesController {
  constructor(
    private readonly insuranceQuotesService: InsuranceQuotesService,
    private readonly vehicleTypesService: VehicleTypesService,
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  async create(@Body() createInsuranceQuoteDto: CreateInsuranceQuoteDto) {
    const vehicleType = await this.vehicleTypesService.findOne(
      createInsuranceQuoteDto.productId,
    );
    if (!vehicleType) {
      throw new HttpException('Vehicle type does not exist', 404);
    }

    const product = await this.productsService.findOneByVehicleTypeId(
      createInsuranceQuoteDto.vehicleTypeId,
      createInsuranceQuoteDto.productId,
    );
    if (!product) {
      throw new HttpException('Product does not exist', 404);
    }

    const createSaveInsuranceQuoteDto: CreateSaveInsuranceQuoteDto = {
      ...createInsuranceQuoteDto,
      policyNumber: uuidv4(),
      endDate: dayjs(createInsuranceQuoteDto.startDate)
        .add(product.days, 'day')
        .format('YYYY-MM-DD'),
    };

    return this.insuranceQuotesService.create(createSaveInsuranceQuoteDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.insuranceQuotesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInsuranceQuoteDto: UpdateInsuranceQuoteDto,
  ) {
    return this.insuranceQuotesService.update(+id, updateInsuranceQuoteDto);
  }
}
