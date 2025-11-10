import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { Purchase } from './entities/purchase.entity';
import { PurchasesRepository } from './purchases.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([Purchase]),
  ],
  controllers: [PurchasesController],
  providers: [
    PurchasesService,
    PurchasesRepository
  ],
  exports: [
    PurchasesService,
    PurchasesRepository
  ]
})
export class PurchasesModule {}
