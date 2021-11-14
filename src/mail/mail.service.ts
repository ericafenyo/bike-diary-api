import { Injectable } from '@nestjs/common';
import fs = require('fs');
import mustache = require('mustache');
import mjml = require('mjml');
import nodemailer = require('nodemailer');

/**
 *
 */
interface MailOptions {
  subject: string;
  template: string;
  locale: string;
  context: object;
  from: string;
  to: string;
}

const subjects = {
  accountVerificationCode: {
    en: 'Your account verification code',
    fr: 'Le code de vérification de votre compte',
  },
};

@Injectable()
export class MailService {
  async sendMail(options: MailOptions) {
    const { template, context, locale, from, to, subject } = options;
    const mail = await this.getMail(template, context, locale);

    // Send the email
    const transport = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILER_USERNAME,
        pass: process.env.MAILER_PASSWORD,
      },
    });

    const sentMessage = await transport.sendMail({
      from: from,
      to: to,
      subject: subject,
      html: mail,
    });

    console.log(sentMessage);
  }

  private async getMail(template: string, context: object, locale: string) {
    const templateContent = await this.readTemplateContent(template, locale);
    const boundTemplate = mustache.render(templateContent, context);

    const html = mjml(boundTemplate).html;
    return html;
  }

  private async readTemplateContent(templateName: string, locale: string) {
    return fs.promises
      .readdir(__dirname + '/templates')
      .then(() => {
        return fs.promises.readFile(
          __dirname + `/templates/${templateName}-${locale}.mjml`,
          { encoding: 'utf-8' },
        );
      })
      .catch(error => {
        console.log('An error occurred while reading mail templates', error);
      });
  }

  /**
   * Email a one-time-use account verification code
   * @param email the recipients email addresses
   * @param context an object containing
   * @param locale (Optional) a language property. Valid values: `en` and `fr`
   */
  async sendAccountVerificationCode(
    email: string,
    context: any,
    locale: string = 'en',
  ) {
    const options: MailOptions = {
      subject: subjects.accountVerificationCode[locale],
      template: 'send-account-verification-code',
      locale: locale,
      context: context,
      from: `"Bike Diary" <noreply@example.com>`,
      to: email,
    };

    await this.sendMail(options);
  }
}
