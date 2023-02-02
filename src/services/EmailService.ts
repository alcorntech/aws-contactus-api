'use strict';

import { injectable } from 'inversify';
import { IContactService } from '../serviceInterfaces/IContactService';
import { ContactModel } from '../models/ContactModel';
import aws from 'aws-sdk';
import { promises as fs } from 'fs';
import textTemplateFile from '../templates/email_contact.txt';
import htmlTemplateFile from '../templates/email_contact.html';

@injectable()
export class EmailService implements IContactService {
    private textBody: string;
    private htmlBody: string;

    constructor() {
    }

    public async submit(data: ContactModel): Promise<boolean> {
        await Promise.all([
            this.setupAws(),
            this.populateTextTemplate(data),
            this.populateHtmlTemplate(data)
        ]);

        const params = {
            Destination: {
                ToAddresses: [
                    process.env.CONTACT_EMAIL_TO
                ]
            },
            Message: { 
                Body: { 
                    Text: {
                        Charset: 'UTF-8',
                        Data: this.textBody
                    },
                    Html: {
                        Charset: 'UTF-8',
                        Data: this.htmlBody
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: process.env.CONTACT_EMAIL_SUBJECT
                }
            },
            Source: process.env.CONTACT_EMAIL_FROM
        };

        await new aws.SES({ apiVersion: '2010-12-01' })
            .sendEmail(params)
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

    private async populateHtmlTemplate(data) {
        const htmlTemplate = (await fs.readFile(htmlTemplateFile)).toString();
        this.htmlBody = await this.populateTemplate(htmlTemplate, data);
    }

    private async populateTextTemplate(data) {
        const textTemplate = (await fs.readFile(textTemplateFile)).toString();
        this.textBody = await this.populateTemplate(textTemplate, data);
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