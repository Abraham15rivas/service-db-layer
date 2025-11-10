import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { WalletsModule } from '../wallets/wallets.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PurchasesModule } from 'src/purchases/purchases.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    WalletsModule,
    PurchasesModule,
    EmailModule
  ],
  providers: [
    UsersRepository,
    UsersService
  ],
  exports: [
    UsersRepository,
    UsersService
  ],
  controllers: [UsersController]
})
export class UsersModule {}