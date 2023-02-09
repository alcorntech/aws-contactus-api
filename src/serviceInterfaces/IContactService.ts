'use strict';

import { ContactModel } from '../models/ContactModel';

export interface IContactService {
  submit(params: ContactModel): Promise<boolean>;
}
