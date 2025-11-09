import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';

class BaseWalletUpdateDto {
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  balance?: number;
}

export class UpdateWalletDto extends PartialType(BaseWalletUpdateDto) {}