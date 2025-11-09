import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletRepository } from './wallet.repository';
import { Transaction } from 'sequelize';

@Injectable()
export class WalletsService {
	constructor(
		private readonly walletRepository: WalletRepository
	) {}

  async create(createWalletDto: CreateWalletDto, transaction?: Transaction) {
		return await this.walletRepository.createInitialWallet(createWalletDto, transaction);
  }
}
