import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { WalletsModule } from '../wallets/wallets.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    WalletsModule
  ],
  providers: [
    UsersRepository,
    UsersService
  ],
  exports: [
    UsersRepository,
    UsersService
  ]
})
export class UsersModule {}