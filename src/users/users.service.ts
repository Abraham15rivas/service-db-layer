import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { WalletsService } from 'src/wallets/wallets.service';
import { Sequelize } from 'sequelize-typescript';
import { TopUpWalletDto } from '../wallets/dto/topup-wallet.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly walletsService: WalletsService,
    private readonly usersRepository: UsersRepository,
    private readonly sequelize: Sequelize,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const t = await this.sequelize.transaction();

    try {
      const user = await this.usersRepository.createUser(createUserDto, t);

      await this.walletsService.create({ userDocument: user.document }, t);

      await t.commit();

      return user;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }

  async topUpWallet(topUpDto: TopUpWalletDto) {
    const user = this.usersRepository.findByDocumentAndPhone(topUpDto.document, topUpDto.phone);

    if (!user) {
      throw new NotFoundException(`User not found with document: ${topUpDto.document} and phone: ${topUpDto.phone}`);
    }

    return await this.walletsService.topUp(topUpDto);
  }
}
