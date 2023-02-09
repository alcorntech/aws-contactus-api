'use strict';

import { ContactModel } from '../models/ContactModel';

export interface ICaptchaService {
  validate(params: ContactModel): Promise<boolean>;
}
