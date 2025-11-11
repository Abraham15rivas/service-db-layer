import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs  from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async register({ document, names, email, phone, password }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new ConflictException('User with this email already exists.');
    }

    return await this.usersService.create({
      document,
      names,
      email,
      phone,
      password: await bcryptjs.hash(password, 10)
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Email incorrect.');
    }

    const isPasswordValid = await bcryptjs.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Password incorrect.');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      document: user.document
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      user: {
        email: user.email,
        document: user.document,
        names: user.names,
        phone: user.phone
      }
    }
  }
}
