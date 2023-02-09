'use strict';

import { CaptchaModel } from '../models/CaptchaModel';

export interface ICaptchaService {
  validate(params: CaptchaModel): Promise<boolean>;
}
