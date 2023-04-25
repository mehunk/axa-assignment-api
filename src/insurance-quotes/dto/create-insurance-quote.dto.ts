import { IsEmail, IsNotEmpty, IsInt, MaxLength } from 'class-validator';
export class CreateInsuranceQuoteDto {
  @IsNotEmpty()
  @MaxLength(20)
  customerName: string;

  @IsNotEmpty()
  @MaxLength(20)
  customerPhone: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  customerEmail: string;

  @IsNotEmpty()
  customerAge: number;

  @IsNotEmpty()
  @MaxLength(50)
  vehicleModel: string;

  @IsNotEmpty()
  @MaxLength(20)
  licensePlate: string;

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  @IsInt()
  vehicleTypeId: number;

  @IsNotEmpty()
  @IsInt()
  productId: number;
}

export class CreateSaveInsuranceQuoteDto extends CreateInsuranceQuoteDto {
  @IsNotEmpty()
  endDate: string;

  @IsNotEmpty()
  policyNumber: string;
}
