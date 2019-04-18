import { version } from '../package.json'
import LocalStorageFactory from './factories/local-storage'

class Config {
  constructor(options) {
    const {
      application,
      client_id,
      client_secret,
      currency,
      host,
      storage,
      custom_fetch
    } = options

    this.application = application
    this.client_id = client_id
    this.client_secret = client_secret
    this.host = host || 'api.moltin.com'
    this.protocol = 'https'
    this.version = 'v2'
    this.currency = currency
    this.auth = {
      expires: 3600,
      uri: 'oauth/access_token',
      fetch: custom_fetch || fetch
    }
    this.sdk = {
      version,
      language: 'JS'
    }
    this.storage = storage || new LocalStorageFactory()
  }
}

export default Config
