import { Controller, Get, Post, Body, Param, HttpStatus, UseGuards } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { InitiatePurchaseDto } from './dto/initiate-purchase.dto';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  async create(@Body() initiatePurchaseDto: InitiatePurchaseDto) {
    const purchase = await this.purchasesService.create(initiatePurchaseDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Purchase created successful.',
      data: purchase
    };
  }

  @UseGuards(AuthGuard)
  @Get(':document')
  async findByDocument(@Param('document') document: string) {
    const purchase = await this.purchasesService.findByDocument(document);

    return {
      statusCode: HttpStatus.OK,
      message: 'Purchase retrieved successfully.',
      data: purchase
    };
  }
}
