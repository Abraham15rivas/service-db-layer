import * as Joi from 'joi'

export const envSchema = Joi.object({
  NODE_ENV: Joi.string().default('development'),
  PREFIX: Joi.string(),
  ALLOWED_ORIGINS: Joi.string().required(),
  SERVER_PORT: Joi.number().required(),
  DB_CONNECTION: Joi.string(),
  DB_HOST: Joi.string(),
  DB_PORT: Joi.number().required().default(3306),
  DB_DATABASE: Joi.string(),
  DB_USERNAME: Joi.string(),
  DB_PASSWORD: Joi.string(),
  DB_SSL: Joi.boolean().default(false),
  DB_SYNCHRONIZE: Joi.boolean().default(false),
  DB_LOGGING: Joi.boolean().default(false),
  DB_AUTO_LOAD_MODELS: Joi.boolean().required().default(true),
})