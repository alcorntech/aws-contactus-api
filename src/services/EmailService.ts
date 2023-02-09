'use strict';

import { injectable } from 'inversify';
import { IContactService } from '../serviceInterfaces/IContactService';
import { ContactModel } from '../models/ContactModel';
import {
  SendEmailCommand,
  SendEmailCommandInput,
  SESClient,
} from '@aws-sdk/client-ses';
import { promises as fs } from 'fs';
import textTemplateFile from '../templates/email_contact.txt';
import htmlTemplateFile from '../templates/email_contact.html';

@injectable()
export class EmailService implements IContactService {
  private htmlTemplate: string = null;
  private textTemplate: string = null;

  public async submit(data: ContactModel): Promise<boolean> {
    if (!this.htmlTemplate && !this.textTemplate) {
      const templates = await Promise.all([
        fs.readFile(htmlTemplateFile),
        fs.readFile(textTemplateFile),
      ]);

      this.htmlTemplate = templates[0].toString();
      this.textTemplate = templates[1].toString();
    }

    const params: SendEmailCommandInput = {
      Destination: {
        ToAddresses: [process.env.CONTACT_EMAIL_TO],
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: this.populateTemplate(this.textTemplate, data),
          },
          Html: {
            Charset: 'UTF-8',
            Data: this.populateTemplate(this.htmlTemplate, data),
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: process.env.CONTACT_EMAIL_SUBJECT,
        },
      },
      Source: process.env.CONTACT_EMAIL_FROM,
    };

    const sesClient = new SESClient({ region: process.env.SDK_REGION_AWS });
    const sendCommand: SendEmailCommand = new SendEmailCommand(params);
    await sesClient.send(sendCommand);

    return true;
  }

  private populateTemplate(template: string, data: ContactModel) {
    return template
      .replace(/{{full_name}}/g, data.fullName)
      .replace(/{{email_address}}/g, data.emailAddress)
      .replace(/{{phone_number}}/g, data.phoneNumber)
      .replace(/{{zip_code}}/g, data.zipCode)
      .replace(/{{message}}/g, data.message)
      .replace(/{{ip_address}}/g, data.ipAddress);
  }
}
