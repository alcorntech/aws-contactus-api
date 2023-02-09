'use strict';

import express from 'express';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import serverless from 'serverless-http';
import container from './inversify.config';
import Constants from './Constants';
import { ILoggerService } from './serviceInterfaces/ILoggerService';
import { IContactController } from './controllerInterfaces/IContactController';

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
app.set('json spaces', 2);

const logger = container.get<ILoggerService>(Constants.Interfaces.Logger);
const contactController = container.get<IContactController>(
  Constants.Interfaces.ContactController
);

app.use('/', (request: Request, _response: Response, next: NextFunction) => {
  logger.debug(request.url, request.method);
  next();
});

// Routes

// Send email
app.post('/contact', (request: Request, response: Response) => {
  contactController
    .submitContactForm(request, response)
    .catch((err: unknown) => {
      response
        .status(Constants.ApiErrors.Unexpected.HttpStatusCode)
        .json({ message: err });
    });
});

module.exports.handler = serverless(app);
