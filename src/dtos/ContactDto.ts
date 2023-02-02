'use strict';

export class ContactDto {
    full_name: string;

    email_address: string;

    phone_number: string;

    zip_code: string;

    message: string;

    ip_address: string;

    constructor(
        full_name: string = '',
        email_address: string = '',
        phone_number: string = '',
        zip_code: string = '',
        message: string = '',
        ip_address: string = '') {
            this.full_name = full_name;
            this.email_address = email_address;
            this.phone_number = phone_number;
            this.zip_code = zip_code;
            this.message = message;
            this.ip_address = ip_address;
        }
}