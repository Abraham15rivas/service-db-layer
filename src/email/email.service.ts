import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmationEmail(sendEmailDto: SendEmailDto) {
    try {
      await this.mailerService.sendMail({
        to: sendEmailDto.recipientEmail,
        subject: '🔒 Tu Token de Confirmación de Compra',
        template: 'email-confirmation',
        context: {
          params: {
            token: sendEmailDto.token,
            sessionId: sendEmailDto.sessionId,
          },
        },
      });
      console.log(`Correo de confirmación enviado a: ${sendEmailDto.recipientEmail}`);

    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw new InternalServerErrorException('Error al enviar el correo de confirmación.');
    }
  }
}