import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  async sendToken(recipientEmail: string, token: string, sessionId: number): Promise<void> {
    this.logger.log(`
      ======================================================
      ✅ EMAIL SENT SUCCESSFULLY (SIMULATION) ✅
      To: ${recipientEmail}
      Subject: Your Purchase Confirmation Token

      Hello,

      Your purchase request has been initiated.
      Please use the following details to confirm your payment:

      - Confirmation Token: **${token}**
      - Purchase ID (Session ID): **${sessionId}**

      This token is valid for 5 minutes.
      ======================================================
    `);

    return;
  }
}