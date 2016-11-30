class Config {
  constructor(options) {
    this.clientId = options.publicId;
    this.clientSecret = options.secretKey;
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
      uri: 'oauth/access_token'
    };
    this.methods = ['GET', 'POST', 'PUT', 'DELETE'];
  }
}

export default Config;
