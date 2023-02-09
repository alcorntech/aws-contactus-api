'use strict';

import { injectable } from 'inversify';
import { ContactModel } from '../models/ContactModel';
import { ICaptchaService } from '../serviceInterfaces/ICaptchaService';

@injectable()
export class RecaptchaService implements ICaptchaService {
  public async validate(params: ContactModel): Promise<boolean> {
    const response: Response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_SECRET}&response=${params.captchaToken}&remoteip=${params.ipAddress}`,
      {
        method: 'POST',
      }
    );

    const responseJson = await response.json();

    if (!responseJson.success) {
      return false;
    } else if (responseJson.score < process.env.GOOGLE_RECAPTCHA_SCORE_MIN) {
      return false;
    }

    return true;
  }
}
