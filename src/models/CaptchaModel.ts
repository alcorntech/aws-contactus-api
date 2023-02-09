'use strict';

export class CaptchaModel {
  token: string;

  ipAddress: string;

  constructor(token = '', ipAddress = '') {
    this.token = token;
    this.ipAddress = ipAddress;
  }
}
