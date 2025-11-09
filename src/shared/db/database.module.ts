import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseSequelizeConfigService } from './database.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: DatabaseSequelizeConfigService
    })
  ]
})
export class DatabaseModule {}