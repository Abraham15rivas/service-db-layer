import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from './models/client.model';
import { WalletModel } from '../wallets/models/wallet.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(ClientModel) private readonly clientModel: typeof ClientModel,
  ) {}

  /**
   *
   * @param criteria Objeto con los criterios de búsqueda.
   */
  async findClientByCriteria(criteria: any): Promise<ClientModel | null> {
    return this.clientModel.findOne({
        where: criteria,
        include: [WalletModel]
    });
  }

  async createClient(createDto: CreateUserDto): Promise<ClientModel> {

    try {
      return this.clientModel.create(createDto as any);
    } catch (error) {
      throw error;
    }
  }
}