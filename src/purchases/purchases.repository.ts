import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Purchase } from './entities/purchase.entity';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { User } from '../users/entities/user.entity'

@Injectable()
export class PurchasesRepository {
  constructor(
    @InjectModel(Purchase)
    private readonly purchase: typeof Purchase
  ) {}

  async createPurchase(purchaseData: Partial<Purchase>): Promise<Purchase> {
    try {
      return this.purchase.create(purchaseData as any);
    } catch (error) {
      throw new InternalServerErrorException('Could not create purchase.', error.message);
    }
  }

  async findPurchaseByDocument(userDocument: string): Promise<Purchase[] | []> {
    const purchases = await this.purchase.findAll({
      where: { userDocument },
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      raw: true
    });

    if (!purchases) {
      throw new NotFoundException(`No purchases found for document: ${userDocument}`);
    }

    return purchases;
  }

  async findOneByIdAndDocument(id: number, userDocument: string): Promise<Purchase | null> {
    const purchase = await this.purchase.findOne({
      where: {
        id,
        userDocument,
        status: 'ACTIVE'
      },
      include: [{
        model: User,
        attributes: ['email']
      }],
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      raw: true
    });

    if (!purchase) {
      throw new NotFoundException(`No purchase found for document: ${userDocument} and Id: ${id}`);
    }

    return purchase;
  }

  async findPurchaseByIdAndToken(id: number, token:string): Promise<Purchase | null> {
    const purchase = await this.purchase.findOne({
      where: {
        id,
        token,
        status: 'ACTIVE'
      },
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      raw: true
    });

    if (!purchase) {
      throw new NotFoundException(`Purchase not found with id: ${id} and token: ${token}`);
    }

    const isTokenActive = new Date() < new Date(purchase.expiresAt);

    if (!isTokenActive) {
      throw new NotFoundException(`Purchase not found with id: ${id} and token: ${token}, expired token`);
    }

    return purchase;
  }

  async update(purchaseId: number, updateData: UpdatePurchaseDto): Promise<[affectedCount: number]> {
    return this.purchase.update(
      updateData,
      {
        where: { id: purchaseId }
      }
    );
  }
}