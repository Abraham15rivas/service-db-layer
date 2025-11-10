import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

export enum PurchaseStatus {
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
  CANCELED = 'CANCELED'
}

@Table({
  tableName: 'purchases',
  timestamps: true,
  paranoid: true,
})
export class Purchase extends Model<Purchase> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(6),
    allowNull: true,
  })
  declare token: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare amount: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare product: string;

  @Column({
    type: DataType.ENUM(...Object.values(PurchaseStatus)),
    allowNull: false,
    defaultValue: PurchaseStatus.ACTIVE
  })
  declare status: PurchaseStatus;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare expiresAt: Date;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(20) })
  declare userDocument: string;

  @BelongsTo(() => User)
  user: User;
}