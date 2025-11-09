import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WalletModel } from './models/wallet.model';
import { Sequelize } from 'sequelize-typescript';
import { Transaction, LOCK } from 'sequelize';

@Injectable()
export class WalletRepository {
  constructor(
    @InjectModel(WalletModel)
    private readonly walletModel: typeof WalletModel,
    private readonly sequelize: Sequelize,
  ) {}

    async createInitialWallet(clientDocument: string): Promise<WalletModel> {
        const walletData = {
            clientDocument: clientDocument,
            balance: 0.00
        };

        try {
            return this.walletModel.create(walletData as any);
        } catch (error) {
            throw new InternalServerErrorException('Could not create initial wallet.', error.message);
        }
    }

  async findWalletByDocument(document: string): Promise<WalletModel | null> {
    return this.walletModel.findOne({ where: { clientDocument: document } });
  }

  async updateBalance(
    clientDocument: string,
    amount: number,
    transaction: Transaction
  ): Promise<WalletModel> {

    const wallet = await this.walletModel.findOne({
      where: { clientDocument: clientDocument },
      lock: LOCK.UPDATE,
      transaction: transaction,
    });

    if (!wallet) {
      throw new InternalServerErrorException('Wallet not found during critical update.');
    }

    const newBalance = parseFloat(wallet.balance as any) + amount;
    await wallet.update({ balance: newBalance }, { transaction: transaction });

    return wallet;
  }
}