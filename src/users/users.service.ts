import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { WalletsService } from 'src/wallets/wallets.service';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly walletService: WalletsService,
    private readonly sequelize: Sequelize,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const t = await this.sequelize.transaction();

    try {
      const user = await this.usersRepository.createUser(createUserDto, t);

      await this.walletService.create({ userDocument: user.document }, t);

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
}
