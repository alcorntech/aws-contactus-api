import { injectable } from 'inversify';
import { IMapperBase } from "../mapperInterfaces/IMapperBase";
import { ContactModel } from '../models/ContactModel';
import { ContactDto  } from '../dtos/ContactDto';

@injectable()
export class ContactMapper implements IMapperBase<ContactModel, ContactDto> {
    constructor() 
    { 
    }

    public async modelToDto(model: ContactModel): Promise<ContactDto>{
        return new ContactDto(
            model.full_name,
            model.email_address,
            model.phone_number,
            model.zip_code,
            model.message,
            model.ip_address
        );
    }

    public async dtoToModel(dto: ContactDto): Promise<ContactModel> {
        return new ContactModel(
            dto.full_name,
            dto.email_address,
            dto.phone_number,
            dto.zip_code,
            dto.message,
            dto.ip_address
        );
    }
}