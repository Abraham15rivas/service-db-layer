import { WalletEntity } from '../../wallets/entities/wallet.entity';
export class ClientEntity {
  document: string;
  names: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;

  wallet?: WalletEntity;

  constructor(partial: Partial<ClientEntity>) {
    Object.assign(this, partial);
  }
}