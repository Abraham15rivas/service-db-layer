import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wallet } from './entities/wallet.entity';
import { WalletsService } from './wallets.service';
import { WalletsRepository } from './wallets.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([Wallet])
  ],
  providers: [
    WalletsService,
    WalletsRepository
  ],
  exports: [
    WalletsService,
    WalletsRepository
  ]
})
export class WalletsModule {}
