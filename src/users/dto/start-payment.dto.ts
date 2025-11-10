import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class StartPaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  purchaseId: number;
}