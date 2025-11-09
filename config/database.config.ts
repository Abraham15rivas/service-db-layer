import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    mysql: {
      name: process.env.DB_CONNECTION_NAME,
      connection: process.env.DB_CONNECTION,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DB_SSL,
      synchronize: process.env.DB_SYNCHRONIZE,
      logging: process.env.DB_LOGGING,
      autoLoadModels: process.env.DB_AUTO_LOAD_MODELS
    }
}));
