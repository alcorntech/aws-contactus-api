'use strict';

import { ILoggerService } from '../serviceInterfaces/ILoggerService';
import { injectable } from 'inversify';

@injectable()
export class Logger implements ILoggerService {
  public debug(...data: unknown[]): void {
    console.debug(data);
  }

  public info(...data: unknown[]): void {
    console.info(data);
  }

  public warn(...data: unknown[]): void {
    console.warn(data);
  }

  public error(...data: unknown[]): void {
    console.error(data);
  }
}
