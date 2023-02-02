import { IMapperBase } from "./IMapperBase";
import { ContactDto } from "../dtos/ContactDto";
import { ContactModel } from "../models/ContactModel";

export interface IContactMapper extends IMapperBase<ContactModel, ContactDto> {
}