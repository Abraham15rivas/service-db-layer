import { IsNotEmpty, IsNumber, IsPositive, Min, IsString, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class TopUpWalletDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{11}$/, { message: 'Phone must be a 11-digit number.' })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{5,15}$/, { message: 'Document must be a number between 5 and 15 digits.' })
  document: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Amount must be a number with up to 2 decimal places.' })
  @IsPositive({ message: 'Amount must be positive.' })
  @Min(1, { message: 'The minimum top-up amount is 1.' })
  @Type(() => Number)
  amount: number;
}