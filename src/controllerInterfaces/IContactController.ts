'use strict';

import { Request, Response } from 'express';

export interface IContactController {
  submitContactForm(request: Request, response: Response): Promise<void>;
}
