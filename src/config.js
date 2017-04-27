const pkg = require('../package.json');

class Config {
  constructor(options) {
    this.client_id = options.client_id;
    this.client_secret = options.client_secret;
    this.host = 'api.moltin.com';
    this.port = '443';
    this.protocol = 'https';
    this.version = 'v2';
    this.debug = false;
    this.currency = options.currency;
    this.language = false;
    this.timeout = 60000;
    this.auth = {
      expires: 3600,
      uri: 'oauth/access_token',
    };
    this.methods = ['GET', 'POST', 'PUT', 'DELETE'];
    this.sdk = {
      version: pkg.version,
      language: 'JS',
    };
  }
}

export default Config;
