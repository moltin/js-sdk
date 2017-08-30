import { version } from '../package.json';

class Config {
  constructor(options) {
    const { application, client_id, client_secret, currency, host } = options;

    this.application = application;
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.host = host || 'api.moltin.com';
    this.protocol = 'https';
    this.version = 'v2';
    this.currency = currency;
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
