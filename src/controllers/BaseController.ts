'use strict';

import { Response } from 'express';
import { inject, injectable } from 'inversify';
import 'source-map-support/register';
import { ILoggerService } from '../serviceInterfaces/ILoggerService';
import Constants from '../Constants';

@injectable()
export class BaseController
{
  constructor(
    @inject(Constants.Interfaces.Logger) protected logger: ILoggerService
  ) {
  }

  protected handleError(apiError, error, response: Response) {
    this.logger.error(error);

    let retVal = {
      ...apiError,
      success: false
    };

    response.status(apiError.HttpStatusCode).send(retVal);
  }
}