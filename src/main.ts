import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { AppModule } from './app.module';
import configureCors from '../config/cors.config';
import getServerIp from '../config/server.config';

async function bootstrap() {
  const logger = new Logger('Bootstrap')

  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose']
    })

    const configService = app.get(ConfigService)
    const environment   = configService.get('app.environment')

    const { port, prefix, allowedOrigins } = configService.get('app.server')

    app.setGlobalPrefix(prefix)
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true
        })
    )

    configureCors(app, allowedOrigins, environment)

    const serverIp = getServerIp(environment)
    await app.listen(port)

    const protocol  = `http${app.getHttpAdapter().getHttpServer().secure ? 's' : ''}`
    const serverUrl = `${protocol}://${serverIp}:${port}/${prefix}`

    logger.log(`Servidor ejecutándose en el puerto ${port}`)
    logger.log(`Aplicación disponible en: ${serverUrl}`)
  } catch (error) {
    logger.error(`Error al iniciar la aplicación: ${error.message}`, error.stack)
    process.exit(1)
  }
}

bootstrap().catch(err => {
  console.error('Error durante el arranque:', err)
  process.exit(1)
})