import { PartialType } from '@nestjs/mapped-types';
import { CreateInsuranceQuoteDto } from './create-insurance-quote.dto';

export class UpdateInsuranceQuoteDto extends PartialType(CreateInsuranceQuoteDto) {}
