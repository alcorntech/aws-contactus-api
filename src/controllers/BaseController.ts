'use strict';

import { Response } from 'express';
import { inject, injectable } from 'inversify';
import 'source-map-support/register';
import { ILoggerService } from '../serviceInterfaces/ILoggerService';
import Constants from '../Constants';

@injectable()
export class BaseController {
  constructor(
    @inject(Constants.Interfaces.Logger) protected logger: ILoggerService
  ) {}

  protected handleError(apiError, error, response: Response) {
    this.logger.error(error);

    const retVal = {
      ...apiError,
    };

    response.status(apiError.HttpStatusCode).send(retVal);
  }
}
