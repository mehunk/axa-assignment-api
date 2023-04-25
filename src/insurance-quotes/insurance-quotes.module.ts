import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { VehicleTypesModule } from '@/vehicle-types/vehicle-types.module';
import { ProductsModule } from '@/products/products.module';
import { InsuranceQuote } from './models/insurance-quote.model';
import { InsuranceQuotesService } from './insurance-quotes.service';
import { InsuranceQuotesController } from './insurance-quotes.controller';

@Module({
  imports: [
    VehicleTypesModule,
    ProductsModule,
    SequelizeModule.forFeature([InsuranceQuote]),
  ],
  controllers: [InsuranceQuotesController],
  providers: [InsuranceQuotesService],
})
export class InsuranceQuotesModule {}
