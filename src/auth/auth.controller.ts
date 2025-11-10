import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResponseDto } from 'src/shared/dto/response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

@Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<ResponseDto> {
    const authResult = await this.authService.register(registerDto);

    const userCreated = {
      document: authResult.document,
      names: authResult.names,
      email: authResult.email,
      phone: authResult.phone
    }

    const response: ResponseDto = {
      statusCode: HttpStatus.CREATED,
      message: 'User registered successfully and wallet created.',
      data: userCreated
    }

    return response;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ResponseDto> {
    const authResult = await this.authService.login(loginDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful. Access token provided.',
      data: authResult
    };
  }
}
