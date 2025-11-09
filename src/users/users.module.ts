import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientModel } from './models/client.model';
import { UsersRepository } from './users.repository';
import { WalletsModule } from '../wallets/wallets.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ClientModel]),
    WalletsModule
  ],
  controllers: [],
  providers: [
    UsersRepository
  ],
  exports: [UsersRepository]
})
export class UsersModule {}