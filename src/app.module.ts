import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from 'config/env-schema.config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './shared/db/database.module';
import { WalletsModule } from './wallets/wallets.module';
import { AuthModule } from './auth/auth.module';
import { PurchasesModule } from './purchases/purchases.module';
import { EmailModule } from './email/email.module';
import appConfig from '../config/app.config';
import databaseConfig from '../config/database.config';
import jwtConfig from 'config/jwt.config';
import mailConfig from 'config/mail.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig, mailConfig],
      validationSchema: envSchema
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    WalletsModule,
    PurchasesModule,
    EmailModule
  ]
})
export class AppModule {}
