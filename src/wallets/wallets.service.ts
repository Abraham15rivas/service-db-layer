import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { TopUpWalletDto } from './dto/topup-wallet.dto';
import { WalletsRepository } from './wallets.repository';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';

@Injectable()
export class WalletsService {
	constructor(
    private readonly sequelize: Sequelize,
		private readonly walletsRepository: WalletsRepository,
	) {}

  async create(createWalletDto: CreateWalletDto, transaction?: Transaction) {
		return await this.walletsRepository.createInitialWallet(createWalletDto, transaction);
  }

  async topUp(topUpDto: TopUpWalletDto) {
    const t = await this.sequelize.transaction();

    try {
      const updatedWallet = await this.walletsRepository.updateBalanceInTransaction(
        topUpDto.document,
        topUpDto.amount,
        t
      );

      if (!updatedWallet) {
        throw new NotFoundException(`Wallet not found with document: ${topUpDto.document} and phone: ${topUpDto.phone}`);
      }

      await t.commit();

      return updatedWallet;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}
