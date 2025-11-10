import { PurchaseStatus } from '../entities/purchase.entity';

export class UpdatePurchaseDto {
  token?: string;
  expireAt?: Date;
  status?: PurchaseStatus;
}
