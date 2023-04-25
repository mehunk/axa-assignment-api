import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { InsuranceQuote } from './models/insurance-quote.model';
import { CreateSaveInsuranceQuoteDto } from './dto/create-insurance-quote.dto';
import { UpdateInsuranceQuoteDto } from './dto/update-insurance-quote.dto';
import { WhereOptions } from 'sequelize/types/model';

@Injectable()
export class InsuranceQuotesService {
  constructor(
    @InjectModel(InsuranceQuote)
    private insuranceQuoteModel: typeof InsuranceQuote,
  ) {}

  create(
    createSaveInsuranceQuoteDto: CreateSaveInsuranceQuoteDto,
  ): Promise<InsuranceQuote> {
    return this.insuranceQuoteModel.create({
      ...createSaveInsuranceQuoteDto,
    });
  }

  findOne(id: number) {
    return this.insuranceQuoteModel.findByPk(id);
  }

  update(id: number, updateInsuranceQuoteDto: UpdateInsuranceQuoteDto) {
    return `This action updates a #${id} insuranceQuote`;
  }

  remove(where: WhereOptions) {
    return this.insuranceQuoteModel.destroy({
      where,
    });
  }
}
