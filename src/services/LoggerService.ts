'use strict';

import { ILoggerService } from '../serviceInterfaces/ILoggerService';
import { injectable } from 'inversify';

@injectable()
export class Logger implements ILoggerService {
    public debug(...data: any[]): void {
        console.debug(data);
    }

    public info(...data: any[]): void {
        console.info(data);
    }

    public warn(...data: any[]): void {
        console.warn(data);
    }

    public error(...data: any[]): void {
        console.error(data);
    }
}