import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from 'config/env-schema.config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './shared/db/database.module';
import appConfig from '../config/app.config';
import databaseConfig from '../config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/${process.env.NODE_ENV || 'development'}.env`,
      load: [appConfig, databaseConfig],
      validationSchema: envSchema
    }),
    DatabaseModule,
    UsersModule
  ]
})
export class AppModule {}
