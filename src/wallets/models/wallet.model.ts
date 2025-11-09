import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ClientModel } from '../../users/models/client.model';

@Table({
  tableName: 'wallets',
  timestamps: true,
  modelName: 'Wallet'
})
export class WalletModel extends Model<WalletModel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
  })
  balance: number;

  @ForeignKey(() => ClientModel)
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    unique: true
  })
  clientDocument: string;

  @BelongsTo(() => ClientModel)
  client: ClientModel;
}