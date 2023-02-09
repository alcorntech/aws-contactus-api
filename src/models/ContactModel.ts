'use strict';

export class ContactModel {
  fullName: string;

  emailAddress: string;

  phoneNumber: string;

  zipCode: string;

  message: string;

  ipAddress: string;

  constructor(
    fullName = '',
    emailAddress = '',
    phoneNumber = '',
    zipCode = '',
    message = '',
    ipAddress = ''
  ) {
    this.fullName = fullName;
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber;
    this.zipCode = zipCode;
    this.message = message;
    this.ipAddress = ipAddress;
  }
}
