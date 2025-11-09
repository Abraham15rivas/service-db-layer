import { Column, Model, Table, DataType, PrimaryKey, HasOne } from 'sequelize-typescript';
import { WalletModel } from '../../wallets/models/wallet.model';

@Table({
  tableName: 'clients',
  timestamps: true,
  modelName: 'Client',
})
export class ClientModel extends Model<ClientModel> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    unique: true,
  })
  document: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  names: string;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING(15), allowNull: false, unique: true })
  phone: string;

  @HasOne(() => WalletModel, { foreignKey: 'clientDocument', sourceKey: 'document' })
  wallet: WalletModel;
}