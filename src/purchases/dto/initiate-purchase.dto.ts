import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class InitiatePurchaseDto {
  @IsString()
  @IsNotEmpty()
  userDocument: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  product: string;
}