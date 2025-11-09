import { IsString, IsNotEmpty, IsEmail, Matches, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  document: string;

  @IsString()
  @IsNotEmpty()
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
}