import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

@Injectable()
export class DatabaseSequelizeConfigService {
  constructor(private configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    const config  = this.configService.get('database.mysql')
    const logging = (config.logging == 'true')

    const sequelizeOptions: SequelizeModuleOptions = {
      dialect: config.connection as Dialect,
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      synchronize: config.synchronize,
      autoLoadModels: config.autoLoadModels,
      logging: logging
    }

    return sequelizeOptions
  }
}