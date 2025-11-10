import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { WalletsService } from 'src/wallets/wallets.service';
import { Sequelize } from 'sequelize-typescript';
import { TopUpWalletDto } from '../wallets/dto/top-up-wallet.dto';
import { StartPaymentDto } from './dto/start-payment.dto';
import { PurchasesService } from 'src/purchases/purchases.service';
import { EmailService } from 'src/email/email.service';
import { CheckPaymentDto } from './dto/check-payment.dto';
import { PurchaseStatus } from '../purchases/entities/purchase.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly walletsService: WalletsService,
    private readonly purchasesService: PurchasesService,
    private readonly emailService: EmailService,
    private readonly usersRepository: UsersRepository,
    private readonly sequelize: Sequelize,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const t = await this.sequelize.transaction();

    try {
      const user = await this.usersRepository.createUser(createUserDto, t);

      await this.walletsService.create({ userDocument: user.document }, t);

      await t.commit();

      return user;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }

  async topUpWallet(topUpDto: TopUpWalletDto) {
    const user = this.usersRepository.findByDocumentAndPhone(topUpDto.document, topUpDto.phone);

    if (!user) {
      throw new NotFoundException(`User not found with document: ${topUpDto.document} and phone: ${topUpDto.phone}`);
    }

    return await this.walletsService.topUp(topUpDto);
  }

  async startPayment(document: string, startPayment: StartPaymentDto) {
    const purchase = await this.purchasesService.findByIdAndDocument(startPayment.purchaseId, document)

    try {
        const userEmail       = purchase && purchase['user.email']
        const token           = Math.floor(100000 + Math.random() * 900000).toString();
        const expirationTime  = new Date(Date.now() + 5 * 60000);

        const purchaseData = {
          token,
          expiresAt: expirationTime
        }

        await this.purchasesService.update(startPayment.purchaseId, purchaseData);

        const sesionId = (purchase ? purchase.id : 1)

        await this.emailService.sendToken(
          userEmail,
          token,
          sesionId
        )

        return {
          purchaseId: purchase?.id,
          document: purchase?.userDocument
        }
    } catch (error) {
      throw error;
    }
  }

  async checkPayment(checkPaymentDto: CheckPaymentDto) {
    const purchase = await this.purchasesService.findByIdAndToken(checkPaymentDto.purchaseId, checkPaymentDto.token)

    try {
      if (purchase) {
        const deductWalletData = {
          amount: purchase.amount,
          document: purchase.userDocument
        }

        const purchaseData = {
          status: PurchaseStatus.FINISHED
        }

        await this.walletsService.deduct(deductWalletData)
        await this.purchasesService.update(purchase.id, purchaseData);
      }

      return purchase
    } catch (error) {
      throw error;
    }
  }
}
