import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CheckPaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  purchaseId: number;

  @IsNotEmpty()
  @IsString()
  token: string;
}