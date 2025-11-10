import { Controller, Get, Post, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ResponseDto } from '../shared/dto/response.dto';
import { TopUpWalletDto } from '../wallets/dto/topup-wallet.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('top-up')
  async topUp(@Body() topUpDto: TopUpWalletDto): Promise<ResponseDto> {
    const wallet = await this.usersService.topUpWallet(topUpDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Wallet top-up successful.',
      data: {
        document: wallet.userDocument,
        newBalance: wallet.balance
      }
    };
  }
}
