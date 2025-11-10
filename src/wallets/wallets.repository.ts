import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wallet } from './entities/wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Transaction } from 'sequelize';

@Injectable()
export class WalletsRepository {
  constructor(
    @InjectModel(Wallet)
    private readonly wallet: typeof Wallet
  ) {}

  async getBalanceWallet(userDocument: string) {
    return this.wallet.findOne({
      where: {
        userDocument: userDocument
      },
      attributes: ['id', 'balance']
    })
  }

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

  async updateBalanceInTransaction(document: string, amountChange: number, t: Transaction): Promise<Wallet | null> {
    const walletUpdate = await this.wallet.findOne({
      where: { userDocument: document },
      lock: t.LOCK.UPDATE,
      transaction: t
    });

    if (!walletUpdate) {
      throw new NotFoundException(`Wallet not found for document: ${document}`);
    }

    const currentBalance  = parseFloat(walletUpdate.balance as any);
    const rawNewBalance   = currentBalance + amountChange;

    const newBalance = Math.round(rawNewBalance * 100) / 100;

    if (newBalance < 0) {
      throw new BadRequestException('Operation aborted: Insufficient balance.');
    }

    walletUpdate.balance = newBalance;

    try {
      return await walletUpdate.save({ transaction: t });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Database error during balance update.');
    }
  }
}