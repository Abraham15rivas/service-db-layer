import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
  server: {
    port: process.env.SERVER_PORT,
    prefix: process.env.PREFIX,
    allowedOrigins: process.env.ALLOWED_ORIGINS
  },
  environment: process.env.NODE_ENV
}));
