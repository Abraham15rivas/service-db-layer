import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(5, 100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @Length(8, 50, { message: 'Password must be at least 8 characters long.' })
  password: string;
}
