'use strict';

import { injectable } from 'inversify';
import { IContactService } from '../serviceInterfaces/IContactService';
import { ContactModel } from '../models/ContactModel';
import { promises as fs } from 'fs';
import aws from 'aws-sdk';
import templateFile from '../templates/sms_contact.txt';

@injectable()
export class SmsService implements IContactService {
    private smsMessage: string;

    constructor() {
    }

    public async submit(data: ContactModel): Promise<boolean> {
        await Promise.all([
            this.setupAws(),
            this.populateSmsMessage(data)
        ]);

        const params = {
            Message: this.smsMessage,
            PhoneNumber: process.env.CONTACT_SMS_TO
        };

        await new aws.SNS({ apiVersion: '2010-03-31' })
            .publish(params)
            .promise();

        return true;
    }

    private async setupAws() {
        await aws.config.getCredentials(function(err) {
            if (err) {
                throw err;
            }
        });
    }

    private async populateSmsMessage(data) {
        const template = (await fs.readFile(templateFile)).toString();
        this.smsMessage = await this.populateTemplate(template, data);
    }

    private async populateTemplate(template: string, data: ContactModel) {
        return template.replace(/{{full_name}}/g, data.full_name)
            .replace(/{{email_address}}/g, data.email_address)
            .replace(/{{phone_number}}/g, data.phone_number)
            .replace(/{{zip_code}}/g, data.zip_code)
            .replace(/{{message}}/g, data.message)
            .replace(/{{ip_address}}/g, data.ip_address);
    }
}