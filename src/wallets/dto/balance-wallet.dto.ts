import { IsNotEmpty, IsString } from 'class-validator';

export class BalanceWalletDto {
  @IsNotEmpty({ message: 'The document is required.' })
  @IsString()
  document: string;

  @IsNotEmpty({ message: 'The phone number is required.' })
  @IsString()
  phone: string;
}