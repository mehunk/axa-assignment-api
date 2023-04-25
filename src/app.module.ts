import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { VehicleTypesModule } from '@/vehicle-types/vehicle-types.module';
import { ProductsModule } from '@/products/products.module';
import { InsuranceQuotesModule } from './insurance-quotes/insurance-quotes.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      // Solve the problem when deploying to Vercel
      dialectModule: require('mysql2'),
      host: process.env.DATABASE_HOST,
      port: process.env.PORT ? parseInt(process.env.PORT) : 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      dialectOptions: {
        ssl: {
          require: true,
        },
      },
      autoLoadModels: true,
      synchronize: true,
      define: {
        timestamps: false,
        underscored: true,
      },
    }),
    VehicleTypesModule,
    ProductsModule,
    InsuranceQuotesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
