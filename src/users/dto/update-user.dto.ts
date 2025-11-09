import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsEmail, IsOptional, Matches, Length } from 'class-validator';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  @Length(3, 100)
  names?: string;

  @IsEmail()
  @IsOptional()
  @Length(5, 100)
  email?: string;

  @IsString()
  @IsOptional()
  @Matches(/^\d{10}$/, { message: 'Phone must be a 10-digit number.' })
  phone?: string;
}