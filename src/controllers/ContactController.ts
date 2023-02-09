'use strict';

import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import 'source-map-support/register';
import { ILoggerService } from '../serviceInterfaces/ILoggerService';
import { BaseController } from './BaseController';
import Constants from '../Constants';
import { IContactController } from '../controllerInterfaces/IContactController';
import { IContactService } from '../serviceInterfaces/IContactService';
import { IContactMapper } from '../mapperInterfaces/IContactMapper';
import { ICaptchaService } from '../serviceInterfaces/ICaptchaService';

@injectable()
export class ContactController
  extends BaseController
  implements IContactController
{
  constructor(
    @inject(Constants.Interfaces.EmailService)
    private emailService: IContactService,
    @inject(Constants.Interfaces.SmsService)
    private smsService: IContactService,
    @inject(Constants.Interfaces.CaptchaService)
    private captchaService: ICaptchaService,
    @inject(Constants.Interfaces.ContactMapper)
    private contactMapper: IContactMapper,
    @inject(Constants.Interfaces.Logger) logger: ILoggerService
  ) {
    super(logger);
  }

  public async submitContactForm(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const model = await this.contactMapper.dtoToModel({
        full_name: request.body.full_name,
        email_address: request.body.email_address,
        phone_number: request.body.phone_number,
        zip_code: request.body.zip_code,
        message: request.body.message,
        ip_address: request.ip,
        captcha_token: request.body.captcha_token,
      });

      // Validate captcha (if applicable)
      if (process.env.GOOGLE_RECAPTCHA_SECRET) {
        const isValid = await this.captchaService.validate(model);

        if (!isValid) {
          throw Constants.ApiErrors.Forbidden;
        }
      }

      // Send notifications
      await Promise.all([
        this.emailService.submit(model),
        this.smsService.submit(model),
      ]);

      response.send({
        success: true,
      });
    } catch (error) {
      this.handleError(Constants.ApiErrors.Unexpected, error, response);
    }
  }
}
