import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Transaction } from 'sequelize';


@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User) private readonly user: typeof User
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.user.findOne({
      where: {
        email
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt']
      },
      raw: true
    });
  }

  async createUser(createDto: CreateUserDto, transaction?: Transaction): Promise<User> {
    try {
      return this.user.create(createDto as any,  { transaction: transaction });
    } catch (error) {
      throw error;
    }
  }
}