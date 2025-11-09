import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wallet } from './entities/wallet.entity';
import { WalletsService } from './wallets.service';
import { WalletRepository } from './wallet.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([Wallet]),
    WalletsModule
  ],
  providers: [
    WalletsService,
    WalletRepository
  ],
  exports: [
    WalletsService,
    WalletRepository
  ]
})
export class WalletsModule {}
