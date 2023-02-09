'use strict';

import { injectable } from 'inversify';
import { IContactService } from '../serviceInterfaces/IContactService';
import { ContactModel } from '../models/ContactModel';
import { promises as fs } from 'fs';
import {
  PublishCommand,
  PublishCommandInput,
  SNSClient,
} from '@aws-sdk/client-sns';
import templateFile from '../templates/sms_contact.txt';

@injectable()
export class SmsService implements IContactService {
  private smsTemplate: string = null;

  public async submit(data: ContactModel): Promise<boolean> {
    if (!this.smsTemplate) {
      this.smsTemplate = (await fs.readFile(templateFile)).toString();
    }

    const params: PublishCommandInput = {
      Message: this.populateTemplate(this.smsTemplate, data),
      PhoneNumber: process.env.CONTACT_SMS_TO,
    };

    const snsClient: SNSClient = new SNSClient({
      region: process.env.SDK_REGION_AWS,
    });
    const publishCommand: PublishCommand = new PublishCommand(params);
    await snsClient.send(publishCommand);

    return true;
  }

  private populateTemplate(template: string, data: ContactModel): string {
    return template
      .replace(/{{full_name}}/g, data.fullName)
      .replace(/{{email_address}}/g, data.emailAddress)
      .replace(/{{phone_number}}/g, data.phoneNumber)
      .replace(/{{zip_code}}/g, data.zipCode)
      .replace(/{{message}}/g, data.message)
      .replace(/{{ip_address}}/g, data.ipAddress);
  }
}
