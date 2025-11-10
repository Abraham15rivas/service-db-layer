import { Controller, Post, Body, Patch, UseGuards, HttpStatus, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ResponseDto } from '../shared/dto/response.dto';
import { TopUpWalletDto } from '../wallets/dto/top-up-wallet.dto';
import { StartPaymentDto } from './dto/start-payment.dto';
import { CheckPaymentDto } from './dto/check-payment.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService
) {}

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

  @Patch(':document/start-payment')
  async startPayment(@Param('document') document: string, @Body() startPaymentDto: StartPaymentDto): Promise<ResponseDto> {
    const startPayment = await this.usersService.startPayment(document, startPaymentDto)

    return {
      statusCode: HttpStatus.CREATED,
      message: 'A confirmation token has been sent to your email. Please use the Purchase ID and Token to confirm the payment.',
      data: startPayment
    };
  }

  @Patch('check-payment')
  async checkPayment(@Body() checkPaymentDto: CheckPaymentDto): Promise<ResponseDto> {
    const confirmedPurchase = await this.usersService.checkPayment(checkPaymentDto)

    return {
      statusCode: HttpStatus.CREATED,
      message: `Payment confirmed successfully. They were discounted ${confirmedPurchase?.amount} from your wallet.`,
      data: confirmedPurchase
    };
  }
}
