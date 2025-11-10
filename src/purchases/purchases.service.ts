import { Injectable } from '@nestjs/common';
import { InitiatePurchaseDto } from './dto/initiate-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PurchasesRepository } from './purchases.repository';

@Injectable()
export class PurchasesService {
  constructor(private readonly purchasesRepository: PurchasesRepository) {}

  async create(initiatePurchaseDto: InitiatePurchaseDto) {
    return await this.purchasesRepository.createPurchase(initiatePurchaseDto);
  }

  async update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return await this.purchasesRepository.update(id, updatePurchaseDto);
  }

  async findByDocument(userDocument: string) {
    return await this.purchasesRepository.findPurchaseByDocument(userDocument);
  }

  async findByIdAndDocument(id: number, userDocument: string) {
    return await this.purchasesRepository.findOneByIdAndDocument(id, userDocument);
  }

  async findByIdAndToken (id: number, token: string) {
    return await this.purchasesRepository.findPurchaseByIdAndToken(id, token);
  }
}
