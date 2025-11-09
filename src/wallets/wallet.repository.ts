import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wallet } from './entities/wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Transaction } from 'sequelize';

@Injectable()
export class WalletRepository {
  constructor(
    @InjectModel(Wallet)
    private readonly wallet: typeof Wallet
  ) {}

  async createInitialWallet(createWalletDto: CreateWalletDto, transaction?: Transaction): Promise<Wallet> {
    const walletData = {
      userDocument: createWalletDto.userDocument,
      balance: 0.00
    }

    try {
      return this.wallet.create(walletData as any, { transaction: transaction });
    } catch (error) {
      throw new InternalServerErrorException('Could not create initial wallet.', error.message);
    }
  }
}