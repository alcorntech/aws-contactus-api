'use strict';

import 'reflect-metadata';

import { Container } from 'inversify';
import Constants from './Constants';

import { ILoggerService } from './serviceInterfaces/ILoggerService';
import { IContactService } from './serviceInterfaces/IContactService';
import { IContactController } from './controllerInterfaces/IContactController';
import { IContactMapper } from './mapperInterfaces/IContactMapper';

import { Logger } from './services/LoggerService';
import { EmailService } from './services/EmailService';
import { SmsService } from './services/SmsService';
import { ContactController } from './controllers/ContactController';
import { ContactMapper } from './mappers/ContactMapper';

const container: Container = new Container();

container.bind<IContactController>(Constants.Interfaces.ContactController).to(ContactController).inSingletonScope();

container.bind<IContactService>(Constants.Interfaces.EmailService).to(EmailService).inSingletonScope();
container.bind<IContactService>(Constants.Interfaces.SmsService).to(SmsService).inSingletonScope();

container.bind<IContactMapper>(Constants.Interfaces.ContactMapper).to(ContactMapper).inSingletonScope();

container.bind<ILoggerService>(Constants.Interfaces.Logger).to(Logger).inSingletonScope();

export default container;