import { injectable } from 'inversify';
import { IMapperBase } from '../mapperInterfaces/IMapperBase';
import { ContactModel } from '../models/ContactModel';
import { ContactDto } from '../dtos/ContactDto';

@injectable()
export class ContactMapper implements IMapperBase<ContactModel, ContactDto> {
  public async modelToDto(model: ContactModel): Promise<ContactDto> {
    return new Promise((resolve) => {
      resolve(
        new ContactDto(
          model.fullName,
          model.emailAddress,
          model.phoneNumber,
          model.zipCode,
          model.message,
          model.ipAddress
        )
      );
    });
  }

  public async dtoToModel(dto: ContactDto): Promise<ContactModel> {
    return new Promise((resolve) => {
      resolve(
        new ContactModel(
          dto.full_name,
          dto.email_address,
          dto.phone_number,
          dto.zip_code,
          dto.message,
          dto.ip_address
        )
      );
    });
  }
}
