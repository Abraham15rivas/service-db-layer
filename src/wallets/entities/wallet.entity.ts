import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

@Table({
  tableName: 'wallets',
  timestamps: true,
  modelName: 'Wallet',
  paranoid: true,
})
export class Wallet extends Model<Wallet> {
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
  declare balance: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    unique: true
  })
  declare userDocument: string;

  @BelongsTo(() => User)
  user: User;
}