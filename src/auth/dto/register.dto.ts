import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, Matches, Length, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, { message: 'Document must be between 6 and 20 characters.' })
  document: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @Length(3, 100)
  names: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(5, 100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{10}$/, { message: 'Phone must be a 10-digit number.' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @Length(8, 50, { message: 'Password must be at least 8 characters long.' })
  password: string;

  @IsOptional()
  @IsString()
  @Length(4, 10)
  role?: string;
}