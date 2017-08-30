import { version } from '../package.json';

class Config {
  constructor(options) {
    this.application = options.application;
    this.client_id = options.client_id;
    this.client_secret = options.client_secret;
    this.host = 'api.moltin.com';
    this.protocol = 'https';
    this.version = 'v2';
    this.currency = options.currency;
    this.auth = {
      expires: 3600,
      uri: 'oauth/access_token',
    };
    this.sdk = {
      version,
      language: 'JS',
    };
  }
}

export default Config;
