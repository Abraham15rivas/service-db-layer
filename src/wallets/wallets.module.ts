import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WalletModel } from './models/wallet.model';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { WalletRepository } from './wallet.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([WalletModel]),
    WalletsModule
  ],
  controllers: [WalletsController],
  providers: [WalletsService, WalletRepository],
  exports: [WalletRepository]
})
export class WalletsModule {}
