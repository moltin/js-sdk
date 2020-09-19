import { version } from '../package.json'
import { LocalStorageFactory } from './local-storage'

export interface StorageFactory {
  set(key: string, value: any): void;
  get(key: string): any;
  delete(key: string): void;
}

export interface ConfigOptions {
  application?: string;
  client_id: string;
  client_secret?: string;
  language?: string;
  currency?: string;
  host?: string;
  custom_fetch?: Function;
  storage?: StorageFactory;
}

export class Config {
  application?: string;
  client_id: string;
  client_secret?: string;
  host: string;
  protocol: string;
  version: string;
  currency?: string;
  language?: string;
  auth: {
    expires: number;
    uri: string;
    fetch: Function;
  };
  sdk: {
    version: string;
    language: string;
  };
  storage: StorageFactory;

  constructor(options: ConfigOptions) {
    const {
      application,
      client_id,
      client_secret,
      currency,
      language,
      host,
      storage,
      custom_fetch
    } = options;

    this.application = application;
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.host = host ?? 'api.moltin.com';
    this.protocol = 'https';
    this.version = 'v2';
    this.currency = currency;
    this.language = language;
    this.auth = {
      expires: 3600,
      uri: 'oauth/access_token',
      fetch: custom_fetch ?? fetch
    };
    this.sdk = {
      version,
      language: 'JS'
    };
    this.storage = storage || new LocalStorageFactory();
  }
}

export default Config;
