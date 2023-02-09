import { IMapperBase } from './IMapperBase';
import { ContactDto } from '../dtos/ContactDto';
import { ContactModel } from '../models/ContactModel';

export type IContactMapper = IMapperBase<ContactModel, ContactDto>;
