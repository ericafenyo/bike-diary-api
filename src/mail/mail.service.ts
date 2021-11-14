import { Injectable } from '@nestjs/common';
import fs from 'fs';
import mustache = require('mustache');
import mjml = require('mjml');

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
    en: '',
    fr: '',
  },
};

@Injectable()
export class MailService {
  async sendMail(options: MailOptions) {
    const { template, context, locale } = options;
    const mail = await this.getMail(template, context, locale);

    // Send the email
    
  }

  async getMail(template: string, context: object, locale: string) {
    const templateContent = this.readTemplateContent(template, locale);
    const boundTemplate = mustache.render(templateContent, context);

    return mjml(boundTemplate).html;
  }

  private readTemplateContent(templateName: string, locale: string) {
    return fs.promises.readdir(__dirname + '/templates').then(res => {
      return fs.promises.readFile(
        __dirname + `/templates/${templateName}-${locale}.mjml`,
        { encoding: 'utf-8' },
      );
    });
  }

  async sendAccountVerificationCode(
    email: string,
    context: any,
    locale: string = 'en',
  ) {
    const options: MailOptions = {
      subject: subjects.accountVerificationCode[locale],
      template: 'send-account_verification-code',
      locale: locale,
      context: context,
      from: `"Bike Diary" <noreply@example.com>`,
      to: email,
    };

    await this.sendMail(options);
  }
}
