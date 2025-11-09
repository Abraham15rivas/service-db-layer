import { ClientEntity } from '../../users/entities/user.entity';

export class WalletEntity {
  id: number;
  balance: number;
  clientDocument: string;
  createdAt: Date;
  updatedAt: Date;

  client?: ClientEntity;

  constructor(partial: Partial<WalletEntity>) {
    Object.assign(this, partial);
  }
}