import { version } from '../package.json'
import LocalStorageFactory from './factories/local-storage'
import SecureCookiesStorageFactory from './factories/secure-cookies-storage'

class Config {
  constructor(options) {
    const {
      name,
      application,
      client_id,
      client_secret,
      currency,
      language,
      host,
      storage,
      storage_type,
      custom_fetch,
      custom_authenticator,
      headers,
      disableCart,
      reauth,
      protocol,
      store_id,
      retryDelay,
      retryJitter,
      fetchMaxAttempts,
      throttleRequests,
      throttleLimit,
      throttleInterval,
      throttleStrict,
      httpKeepAlive,
      httpKeepAliveInterval
    } = options

    this.name = name
    this.application = application
    this.client_id = client_id
    this.client_secret = client_secret
    this.store_id = store_id
    this.host = host || 'api.moltin.com'
    this.protocol = protocol || 'https'
    this.version = 'v2'
    this.currency = currency
    this.language = language
    this.auth = {
      expires: 3600,
      uri: 'oauth/access_token',
      fetch: custom_fetch || fetch
    }
    this.sdk = {
      version,
      language: 'JS'
    }

    this.storage =
      storage ||
      (storage_type === 'cookies'
        ? new SecureCookiesStorageFactory()
        : new LocalStorageFactory())
    this.custom_authenticator = custom_authenticator
    this.headers = headers || {}
    this.disableCart = disableCart || false
    this.reauth = reauth || true
    this.retryDelay = retryDelay || 1000
    this.retryJitter = retryJitter || 500
    this.fetchMaxAttempts =
      fetchMaxAttempts !== undefined && fetchMaxAttempts !== null
        ? fetchMaxAttempts
        : 4

    this.throttleRequests = throttleRequests || false
    this.throttleLimit = throttleLimit || 6
    this.throttleInterval = throttleInterval || 250
    this.throttleStrict = throttleStrict || false
    this.httpKeepAlive = httpKeepAlive || false
    this.httpKeepAliveInterval = httpKeepAliveInterval || 10000
  }
}

export default Config
