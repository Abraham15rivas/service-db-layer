import { Column, Model, Table, DataType, PrimaryKey, HasOne } from 'sequelize-typescript';
import { Wallet } from '../../wallets/entities/wallet.entity';

@Table({
  tableName: 'users',
  timestamps: true,
  modelName: 'User',
  paranoid: true
})
export class User extends Model<User> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    unique: true
  })
  declare document: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  declare names: string;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING(15), allowNull: false, unique: true })
  declare phone: string;

  @Column({ type: DataType.STRING(10), allowNull: false, defaultValue: 'user' })
  declare role: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  declare password: string;

  @HasOne(() => Wallet, { foreignKey: 'userDocument', sourceKey: 'document' })
  wallet: Wallet;
}