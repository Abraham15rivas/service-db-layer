import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { EmailService } from './email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

const isDev = process.env.NODE_ENV !== 'production';
const templateDir = isDev
  ? join(process.cwd(), 'src', 'email', 'templates')
  : join(__dirname, 'templates');


@Module({
  imports: [
    MailerModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('mail.host'),
          secure: false,
          auth: {
            user: configService.get('mail.user'),
            pass: configService.get('mail.password')
          }
        },
        defaults: {
          from: `"No Reply" <${configService.get('mail.from')}>`
        },
        template: {
          dir: templateDir,
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}